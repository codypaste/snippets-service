const { GroupModel } = require('../models/GroupModel');

const create = async payload => new GroupModel(payload).save();

const getSingle = async groupID => GroupModel.findById(groupID);

const deleteSingle = async groupID => GroupModel.find({ id: groupID }).remove().exec();

const updateById = async (groupID, updatedGroup) =>
  GroupModel.findByIdAndUpdate(
    groupID,
    updatedGroup,
    { new: true },
  );

module.exports = {
  create,
  getSingle,
  deleteSingle,
  updateById,
};
