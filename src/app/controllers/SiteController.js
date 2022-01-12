const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class SiteController {
  // GET /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('home', { courses: multipleMongooseToObject(courses) });
      })
      .catch(next);

    //res.render('home');
  }

  // GET /
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
