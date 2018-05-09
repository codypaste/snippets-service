module.exports = () => {
  const createNew = async payload => `Snippet: ${payload}`;

  const getSingle = async id => `Snippet with id ${id}`;

  const deleteSingle = async id => `Snippet with id ${id}`;

  return {
    createNew,
    getSingle,
    deleteSingle,
  };
};
