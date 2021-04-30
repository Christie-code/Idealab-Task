const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRoles(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM roles
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

async function create(role){
    const result = await db.query(
      `INSERT INTO roles
      (name, description) 
      VALUES
      (?, ?)`,
      [
        role.name, role.description
      ]
    );
  
    let message = 'Error in creating role';
  
    if (result.affectedRows) {
      message = 'Role created successfully ' + result.id;
    }
  
    return {message};
  }
  
  async function update(id, role){
    const result = await db.query(
      `UPDATE roles 
      SET name=?, description=?
      WHERE id=?`, 
      [
        role.name, role.description, id
      ]
    );
  
    let message = 'Error in updating role ' + result.id;
  
    if (result.affectedRows) {
      message = 'Role updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM roles WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting role';
  
    if (result.affectedRows) {
      message = 'Role deleted successfully';
    }
  
    return {message};
  }

  
  module.exports = {
    getRoles,
    create,
    update,
    remove
  }

  