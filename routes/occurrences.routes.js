const express = require('express');
const router = express.Router();

// import controllers middleware
const occurrencesController = require('../controllers/occurrences.controller');
const badgesController = require('../controllers/badges.controller.js');
const auth = require('../controllers/auth.controller');
const commentsRouter = require('../routes/comments.routes.js');

router.use('/:occurrenceId/comments', commentsRouter)

router.route('/')
    .get(occurrencesController.findAll)
    .post(auth.verifyToken, occurrencesController.create, badgesController.verifyOccurrence);

router.route('/:occurrenceId')
    .get(occurrencesController.findByID)
    .put(auth.verifyToken, occurrencesController.edit)
    .patch(auth.verifyToken, occurrencesController.editStatus)
    .delete(auth.verifyToken, occurrencesController.delete);

//export this router
module.exports = router;