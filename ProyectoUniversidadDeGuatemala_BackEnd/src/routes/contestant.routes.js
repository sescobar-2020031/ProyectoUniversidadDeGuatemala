'use strict'

const express = require('express');
const api = express.Router();

const contestantController = require('../controllers/contestant.controller');

api.get('/testContestant', contestantController.testContestant);
api.post('/saveContestant', contestantController.saveContestant);
api.get('/getContestants', contestantController.getContestants);
api.get('/getContestantsCareerAtoZ', contestantController.getContestantsCareerAtoZ);
api.get('/getContestantsCareerZtoA', contestantController.getContestantsCareerZtoA);
api.get('/getContestantsAgeUpward', contestantController.getContestantsAgeUpward);
api.get('/getContestantsAgeDescendant', contestantController.getContestantsAgeDescendant);
api.get('/getContestantsPoetryGenreAtoZ', contestantController.getContestantsPoetryGenreAtoZ);
api.get('/getContestantsPoetryGenreZtoA', contestantController.getContestantsPoetryGenreZtoA);
api.get('/getContestantsDeclamationDateUpward', contestantController.getContestantsDeclamationDateUpward);
api.get('/getContestantsDeclamationDateDescendant', contestantController.getContestantsDeclamationDateDescendant);
api.get('/getContestantsFullNameAtoZ', contestantController.getContestantsFullNameAtoZ);
api.get('/getContestantsFullNameZtoA', contestantController.getContestantsFullNameZtoA);
api.get('/getContestant/:id', contestantController.getContestant);

module.exports = api;