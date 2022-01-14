const Course = require('../models/Course');
const { mongooseToObject } = require('../../ulti/mongoose');
const { response } = require('express');

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

  // GET /courses/:id/edit
  edit(req, res, next) {
    console.log('id ' + req.params.id);
    Course.findById(req.params.id)
      .then((course) => {
        console.log(course);
        res.render('./courses/edit', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // PUT /courses/:id
  update(req, res, next) {
    console.log('id ' + req.params.id);
    const course = req.body;
    course.image = `https://img.youtube.com/vi/${req.body.videoID}/hqdefault.jpg`;
    Course.updateOne({ _id: req.params.id }, course)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // PATCH /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // DELETE /courses/:id
  delete(req, res, next) {
    console.log('id ' + req.params.id);
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // DELETE /courses/:id/remove
  remove(req, res, next) {
    console.log('id ' + req.params.id);
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
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

  // POST /courses/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'action is not avaiable!' });
    }
  }
}

module.exports = new CoursesController();
