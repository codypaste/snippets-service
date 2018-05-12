const mongoose = require('mongoose');

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
  description: {
    type: String,
  },
  syntax: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
});

const collectionName = 'Snippets';
module.exports = {
  SnippetModel: mongoose.model(collectionName, SnippetModel),
  collectionName,
};
