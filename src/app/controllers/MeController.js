const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
  // GET /stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sortabe(req),
      Course.countDocumentsDeleted({}),
    ])
      .then(([courses, deleteCount]) => {
        res.render('./me/stored-courses', {
          deleteCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // GET /trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render('./me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // GET /stored/news
  storedNews(req, res, next) {
    res.render('./me/stored-news');
  }
}

module.exports = new MeController();
