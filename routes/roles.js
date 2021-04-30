const express = require('express');
const router = express.Router();
const service = require('../services/roles');

/* GET all users */
router.get('/', async function(req, res, next) {
  try {
    res.json(await service.getRoles(req.query.page));
  } catch (err) {
    console.error(`Error while getting roles `, err.message);
    next(err);
  }
});

/* POST new role */
router.post('/', async function(req, res, next) {
    try {
      res.json(await service.create(req.body));
    } catch (err) {
      console.error(`Error while creating roles`, err.message);
      next(err);
    }
  });

/* PUT role*/
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await service.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating role`, err.message);
      next(err);
    }
  });

  /* DELETE role*/
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await service.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting roles`, err.message);
      next(err);
    }
  });

  
module.exports = router;