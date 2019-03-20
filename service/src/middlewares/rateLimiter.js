const redis = require('redis');
const bluebird = require('bluebird');
const config = require('config');
const crypto = require('crypto');

const errors = require('../errors');

const timeWindow = parseInt(config.get('rateLimiter.timeWindowInSeconds'), 10);
const quota = parseInt(config.get('rateLimiter.quotaInTimeWindow'), 10);
const redisEndpoint = config.get('rateLimiter.redisEndpoint');

bluebird.promisifyAll(redis);

let client;

const prepareHeaders = (limitPerWindow, remaining, resetAt) => {
  const d = new Date();
  const seconds = Math.round(d.getTime() / 1000);
  return {
    'RateLimit-Limit': limitPerWindow,
    'RateLimit-Remaining': remaining,
    'RateLimit-Reset': seconds + resetAt,
  };
};

const incrementForIPHash = async (ipHash) => {
  const exists = await client.existsAsync(ipHash);
  if (!exists) {
    await client.setAsync(ipHash, 0, 'EX', timeWindow);
  }
  const afterIncrement = await client.incrAsync(ipHash);
  const ttl = await client.ttlAsync(ipHash);

  let limit = quota - afterIncrement;
  if (limit < 0) {
    limit = 0;
  }

  return prepareHeaders(quota, limit, ttl);
};

const initRedisClient = async () => {
  client = await redis.createClient({
    host: redisEndpoint,
  });
};

const rateLimiter = async (ctx, next) => {
  if (!client) {
    await initRedisClient();
  }

  const { ip } =  ctx.request;
  const ipHash = crypto.createHash('sha256').update(ip, 'utf8').digest('hex');
  const headers = await incrementForIPHash(ipHash);

  ctx.set('RateLimit-Limit', headers['RateLimit-Limit']);
  ctx.set('RateLimit-Remaining', headers['RateLimit-Remaining']);
  ctx.set('RateLimit-Reset', headers['RateLimit-Reset']);

  if (headers['RateLimit-Remaining'] === 0) {
    throw errors.quotaReached(
      ctx.request.ip,
      quota,
      timeWindow,
      headers['RateLimit-Remaining'],
      headers['RateLimit-Reset'],
    );
  }

  await next();
};

module.exports = rateLimiter;
