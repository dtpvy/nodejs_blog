const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoID: { type: String, require: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    timestamps: true,
  },
);

Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const type = ['desc', 'asc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: type ? req.query.type : 'desc',
    });
  }
  return this;
};

mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);
