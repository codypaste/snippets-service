const { GroupModel } = require('../models/GroupModel');
const { SnippetModel } = require('../models/SnippetModel');

const create = async payload => new SnippetModel(payload).save();

const getSingle = async groupID => SnippetModel.findById(groupID);

const deleteSingle = async groupID => SnippetModel.find({ id: groupID }).remove().exec();

const findByGroup = async groupID =>
  SnippetModel
    .find({ group: groupID })
    .sort({ creationDate: -1 });

module.exports = {
  create,
  getSingle,
  deleteSingle,
  findByGroup,
};
