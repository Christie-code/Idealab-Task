const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPermissions(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM permissions
    LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(permissions){
    const result = await db.query(
      `INSERT INTO permissions
      (name, description) 
      VALUES
      (?, ?)`,
      [
        permissions.name, permissions.description
      ]
    );
  
    let message = 'Error in creating permissions';
  
    if (result.affectedRows) {
      message = 'Permissions created successfully ' + result.id;
    }
  
    return {message};
  }
  
  async function update(id, permissions){
    const result = await db.query(
      `UPDATE permissions 
      SET name=?, description=?
      WHERE id=?`, 
      [
        permissions.name, permissions.description, id
      ]
    );
  
    let message = 'Error in updating permissions ' + result.id;
  
    if (result.affectedRows) {
      message = 'Permissions updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM permissions WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting permissions';
  
    if (result.affectedRows) {
      message = 'Permissions deleted successfully';
    }
  
    return {message};
  }

  
  module.exports = {
    getPermissions,
    create,
    update,
    remove
  }


  