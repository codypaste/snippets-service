const { SnippetModel } = require('../models/SnippetModel');

const create = async payload => new SnippetModel(payload).save();

const getSingle = async snippetID => SnippetModel.findById(snippetID);

const deleteSingle = async snippetID => SnippetModel.find({ id: snippetID }).remove().exec();

const findByGroup = async groupID =>
  SnippetModel
    .find({ group: groupID })
    .sort({ creationDate: -1 });

const updateById = async (snippetID, updatedSnippet) =>
  SnippetModel.findByIdAndUpdate(
    snippetID,
    updatedSnippet,
    { new: true },
  );

module.exports = {
  create,
  getSingle,
  deleteSingle,
  findByGroup,
  updateById,
};
