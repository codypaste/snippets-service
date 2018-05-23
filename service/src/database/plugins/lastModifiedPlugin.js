const lastModifiedPlugin = (schema) => {

  const currentTimestamp = () => Date.now();

  const updateLastModified = function (next) {
    if (!this.lastModifiedTimestamp) {
      this.lastModifiedTimestamp = currentTimestamp();
    }
    this.update({ lastModifiedTimestamp: currentTimestamp() });
    next();
  };

  schema
    .pre('save', updateLastModified)
    .pre('findByIdAndUpdate', updateLastModified)
    .pre('findOneAndUpdate', updateLastModified)
    .pre('update', updateLastModified);

};

module.exports = { lastModifiedPlugin };
