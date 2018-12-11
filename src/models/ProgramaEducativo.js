const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'AdiUas'
});

let userModel = {};

userModel.updateCiclo = (userData, callback) => {
  console.log(JSON.stringify(userData))
  if (connection) {
    const sql = `
      UPDATE CicloEscolar SET
      CicloEscolarA1=${connection.escape(userData.CicloEscolarA1)},
      CicloEscolarA2=${connection.escape(userData.CicloEscolarA2)},
      Semestre = ${connection.escape(userData.Semestre)},
      FechaInicio= ${connection.escape(userData.FechaInicio)},
      FechaCierre= ${connection.escape(userData.FechaCierre)}
     
      WHERE IdCicloEscolar = ${userData.IdCicloEscolar}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err; //ESto esta por mientra desarrollamos
      } else {
      
        callback(null, {
          "msg": "success"
        })
      }
    });
  }
};

userModel.delete = (userData, callback) => {
  console.log(JSON.stringify(userData))
  if (connection) {
    const sql = `
      UPDATE CicloEscolar SET
      Estatus='INACTIVO'
      
     
      WHERE IdCicloEscolar = ${userData.IdCicloEscolar}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err; //ESto esta por mientra desarrollamos
      } else {
      
        callback(null, {
          "msg": "success"
        })
      }
    });
  }
};
userModel.getProgramaEducativos = (callback) => {
  if (connection) {
    connection.query("select NomPE,NivelEdu,UnidReg,UnidAcad,unidad_acad.Nombre_UA from progedu, unidad_acad  where progedu.UnidAcad=unidad_acad.IDUnidad_Acad;",
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

userModel.insertProg= (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO progedu SET ?', userData,
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


// userModel.deleteUser = (id, callback) => {
//   if (connection) {
//     var sqlExists = `
//       SELECT * FROM CicloEscolar WHERE IdCicloEscolar = ${connection.escape(id)}
//     `;
//     connection.query(sqlExists, (err, row) => {
//       if (row) {
//         var sql = `DELETE FROM CicloEscolar WHERE IdCicloEscolar=` + connection.escape(id);
//         connection.query(sql, (err, result) => {
//           if (err) {
//             throw err;
//           } else{
//             callback(null, {
//               "msg": "deleted"
//             });
//           }
//         });
//       } else {
//         callback(null, {
//           "msg": "not Exists"
//         });
//       }
//     });
//   }
// }