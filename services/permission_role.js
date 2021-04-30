const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT roles.id as role_id, roles.name as role_name, roles.description as role_desc, permissions.id as permissions_id, permissions.name as permission_name, permissions.description as permission_description
    FROM permission_roles 
    INNER JOIN permissions ON permissions.id = permission_roles.permission_id
    INNER JOIN roles ON permission_roles.role_id = roles.id
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
      `INSERT INTO permission_roles
      (role_id, permission_id) 
      VALUES
      (?, ?)`,
      [
        permissions.role_id, permissions.permission_id
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
      `UPDATE permission_roles 
      SET role_id=?, permission_id=?
      WHERE id=?`, 
      [
        permissions.role_id, permissions.permission_id, id
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
      `DELETE FROM permission_roles WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting permissions';
  
    if (result.affectedRows) {
      message = 'Permissions deleted successfully';
    }
  
    return {message};
  }

  
  module.exports = {
    get,
    create,
    update,
    remove
  }