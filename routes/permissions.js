const express = require('express');
const router = express.Router();
const service = require('../services/permissions');

/* GET all permissions */
router.get('/', async function(req, res, next) {
  try {
    res.json(await service.getPermissions(req.query.page));
  } catch (err) {
    console.error(`Error while getting permissions `, err.message);
    next(err);
  }
});

/* POST new permissions */
router.post('/', async function(req, res, next) {
    try {
      res.json(await service.create(req.body));
    } catch (err) {
      console.error(`Error while creating permissions`, err.message);
      next(err);
    }
  });

/* PUT permissions*/
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await service.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating permissions`, err.message);
      next(err);
    }
  });

  /* DELETE permissions*/
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await service.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting permissions`, err.message);
      next(err);
    }
  });

  
module.exports = router;