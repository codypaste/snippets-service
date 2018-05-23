const mongoose = require('mongoose');

const { lastModifiedPlugin } = require('../plugins/lastModifiedPlugin');

const groupsCollectionName = require('./GroupModel').collectionName;

const Schema = mongoose.Schema;

const SnippetModel = new Schema({
  snippet: {
    type: String,
    required: [true, 'Missing snippet'],
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: groupsCollectionName,
  },
  // It will be either logged user Id or not logged user default name
  author: {
    type: String,
  },
  // snippetName will also be snippet's default filename
  snippetName: {
    type: String,
    required: [true, 'Missing snippet\'s name'],
  },
  syntax: {
    type: String,
  },
  lastModifiedTimestamp: String,
}, { timestamps: { updatedAt: false, createdAt: true } });

SnippetModel.plugin(lastModifiedPlugin);

const collectionName = 'Snippets';
module.exports = {
  SnippetModel: mongoose.model(collectionName, SnippetModel),
  collectionName,
};
