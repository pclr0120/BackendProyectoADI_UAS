const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'AdiUas'
});

let userModel = {};

userModel.getUsers = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM usuarios ORDER BY IDUsuario',
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
         
          callback(null, rows);
        }
      }
    )
  }
};

userModel.insertUserPermisos = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO PermisosUser SET ?', userData,
        (err, result) => {
          if (err) {
            throw err;
          } else {
            callback(null, {'insertId': result.insertId})
          }
        }
      )
    }
  
  } catch (error) {
    
  }
};


userModel.insertUser = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO usuarios SET ?', userData,
        (err, result) => {
          if (err) {
            throw err;
          } else {
            callback(null, {'insertId': result.insertId})
          }
        }
      )
    }
  
  } catch (error) {
    
  }
};


userModel.updateUser = (userData, callback) => {
  console.log('jajaj',userData)
  if (connection) {
    const sql = `
      UPDATE usuario SET

      pass = ${connection.escape(userData.pass)},
      Estatus= ${connection.escape(userData.Estatus)},
      Rol= ${connection.escape(userData.Rol)}
     
      WHERE Id = ${userData.Id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "success"
        })
      }
    });
  }
};

userModel.deleteUser = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM usuarios WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM usuarios WHERE Id=` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "deleted"
            });
          }
        });
      } else {
        callback(null, {
          "msg": "not Exists"
        });
      }
    });
  }
}
userModel.getUsuario = (id,callback) => {
  if (connection) {
    connection.query('SELECT *from usuarios WHERE IDUsuario='+ connection.escape(id),
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
         
          callback(null, rows);
        }
      }
    )
  }
};

userModel.getLog = (user,callback) => {
  if (connection) {
  
    connection.query('SELECT *from usuarios WHERE IDUsuario='+ connection.escape(user),
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
         console.log(rows)
          callback(null, rows);
        }
      }
    )
  }
};
module.exports = userModel;
