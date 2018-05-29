const bcrypt = require('bcryptjs');

const encryptPlugin = function (schema, options) {

  const encryptPassword = function (next) {
    const group = this;

    if (!group.isModified('password')) { return next(); }

    return bcrypt.genSalt(options.SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(group.password, salt, (error, hash) => {
        if (error) return next(err);

        group.password = hash;
        return next();
      });
    });
  };

  schema
    .pre('save', encryptPassword);
};

module.exports = { encryptPlugin };
