const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllUsersWithRolesAndPermissions(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT users.name, users.email, roles.name as role, roles.description as role_description, permissions.name as permission, permissions.description as permission_description
    FROM users
    INNER JOIN permission_roles ON permission_roles.role_id = users.role_id
    INNER JOIN roles ON permission_roles.role_id = roles.id
    INNER JOIN permissions ON permission_roles.permission_id = permissions.id
    ORDER BY users.updated_at LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function createUser(user){
    const result = await db.query(
      `INSERT INTO users 
      (name, email, role_id) 
      VALUES
      (?, ?, ?)`,
      [
        user.name, user.email, user.role_id
      ]
    );
  
    let message = 'Error in user';
  
    if (result.affectedRows) {
      message = user.name + ' created successfully';
    }
  
    return {message};
  }
  
  async function updateUser(id, user){
    const result = await db.query(
      `UPDATE users 
      SET name=?, email=?, role_id=?
      WHERE id=?`, 
      [
        user.name, user.email, user.role_id, id
      ]
    );
  
    let message = 'Error in updating user';
  
    if (result.affectedRows) {
      message = user.name + ' updated successfully';
    }
  
    return {message};
  }

  async function removeUser(id){
    const result = await db.query(
      `DELETE FROM users WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting user';
  
    if (result.affectedRows) {
      message = 'User deleted successfully';
    }
  
    return {message};
  }

  
  module.exports = {
    getAllUsersWithRolesAndPermissions,
    createUser,
    updateUser,
    removeUser
  }