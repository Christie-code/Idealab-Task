const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = require('./routes/users');
const roleRouter = require('./routes/roles');
const permissionRouter = require('./routes/permissions');
const permissionRoleRouter = require('./routes/permissions_role');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/users', router);
app.use('/roles', roleRouter);
app.use('/permissions', permissionRouter);
app.use('/permissions-role', permissionRoleRouter);

/* Error handler middleware */
app.use('/', (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

/* GET users. */
router.get('/', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.getMultiple(req.query.page));
    } catch (err) {
      console.error(`Error while getting users `, err.message);
      next(err);
    }
  });
  
  module.exports = router;