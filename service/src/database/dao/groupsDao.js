const { GroupModel } = require('../models/GroupModel');

const create = async payload => new GroupModel(payload).save();

const getSingle = async groupID => GroupModel.findById(groupID);

const deleteSingle = async groupID => GroupModel.find({ id: groupID }).remove().exec();

module.exports = {
  create,
  getSingle,
  deleteSingle,
};
