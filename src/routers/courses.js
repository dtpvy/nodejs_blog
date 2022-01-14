const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-form-action', coursesController.handleFormAction);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/remove', coursesController.remove);
router.get('/:id/edit', coursesController.edit);
router.get('/:id/delete', coursesController.show);
router.delete('/:id', coursesController.delete);
router.put('/:id', coursesController.update);
router.get('/:slug', coursesController.show);

module.exports = router;
