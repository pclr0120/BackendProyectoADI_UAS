const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'AdiUas'
});

let userModel = {};
userModel.deleteUser = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM CicloEscolar WHERE IdCicloEscolar = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM CicloEscolar WHERE IdCicloEscolar=` + connection.escape(id);
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
userModel.updateCiclo = (userData, callback) => {

  if (connection) {
    const sql = `
      UPDATE CicloEscolar SET

      Semestre = ${connection.escape(userData.Semestre)},
      FechaInicio= ${connection.escape(userData.FechaInicio)},
      FechaCierre= ${connection.escape(userData.FechaCierre)}
     
      WHERE IdCicloEscolar = ${userData.IdCicloEscolar}`;

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
userModel.getUsers = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM CicloEscolar ORDER BY idCicloEscolar',
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

userModel.insertCiclo = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO CicloEscolar SET ?', userData,
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



module.exports = userModel;
