const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  image: { type: String },
  slug: { type: String, slug: 'name', unique: true },
  videoID: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
