const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupModel = new Schema({
  title: {
    type: String,
    required: [true, 'Missing group\'s title'],
  },
  description: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: new Date(),
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
});

const collectionName = 'Groups';
module.exports = {
  GroupModel: mongoose.model(collectionName, GroupModel),
  collectionName,
};
