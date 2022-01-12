const Course = require('../models/Course');
const { mongooseToObject } = require('../../ulti/mongoose');

class CoursesController {
  // GET /courses/:slug
  show(req, res, next) {
    console.log(req.params.slug);
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('./courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // GET /courses/create
  create(req, res, next) {
    res.render('./courses/create');
  }

  // POST /courses/store
  store(req, res, next) {
    const data = req.body;
    data.image = `https://img.youtube.com/vi/${req.body.videoID}/hqdefault.jpg`;
    const course = new Course(data);
    course
      .save()
      .then(() => res.redirect('home'))
      .catch(next);
  }
}

module.exports = new CoursesController();
