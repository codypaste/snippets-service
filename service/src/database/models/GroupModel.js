const mongoose = require('mongoose');

const { lastModifiedPlugin } = require('../plugins/lastModifiedPlugin');

const Schema = mongoose.Schema;

const GroupModel = new Schema({
  title: {
    type: String,
    required: [true, 'Missing group\'s title'],
  },
  description: {
    type: String,
  },
  // It will be either logged user Id or not logged user default name
  author: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  sharedTo: [{
    type: Schema.Types.ObjectId,
  }],
  expirationDatetime: {
    type: Date,
    default: null,
  },
  lastModifiedTimestamp: String,
}, { timestamps: { updatedAt: false, createdAt: true } });

GroupModel.plugin(lastModifiedPlugin);

const collectionName = 'Groups';
module.exports = {
  GroupModel: mongoose.model(collectionName, GroupModel),
  collectionName,
};
