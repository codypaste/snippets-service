const { GroupModel } = require('../models/GroupModel');
const { SnippetModel } = require('../models/SnippetModel');

const create = async payload => new SnippetModel(payload).save();

const getSingle = async groupID => SnippetModel.findById(groupID);

const deleteSingle = async groupID => SnippetModel.find({ id: groupID }).remove().exec();

module.exports = {
  create,
  getSingle,
  deleteSingle,
};
