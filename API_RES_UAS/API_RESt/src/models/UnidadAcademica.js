const mysql = require('mysql');
const bd = require('../bd/mysql');
const message = require('../schema/message');

var connection;
let userModel = {};

function createConnection() {
  connection = mysql.createConnection(bd);
}

function connect() {
  connection.connect(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Conexion correcta.');
    }
  });
}

userModel.getUnidades = (callback) => {
  try {
    createConnection();
    connect();
    if (connection) {
      connection.query('SELECT * FROM unidad_acad ORDER BY IDUnidad_Acad',
        (error, data) => {
          if (error) {
            callback(null, {
              error,
              msg: message.SearchError,
              status: false
            });
          } else {
            callback(null, {
              data,
              msg: message.SearchSuccess,
              status: true
            })
          }
        }
      )
    }
  } catch (error) {
    callback(null, {
      error,
      msg: message.ErrorInternal,
      status: false
    });
  }
  finally {
    connection.end();
  }
};

userModel.getQuestionsID = (id_pregunta, callback) => {
  try {
    createConnection();
    connect();
    var id = id_pregunta;
    if (connection) {
      connection.query('SELECT * FROM question ORDER BY id where id=' + connection.escape(id),
        (error, data) => {
          if (error) {
            callback(null, {
              error,
              msg: message.SearchError,
              status: false
            });
          } else {
            callback(null, {
              data,
              msg: message.SearchSuccess,
              status: true
            })
          }
        }
      )
    }
  } catch (error) {
    callback(null, {
      error,
      msg: message.ErrorInternal,
      status: false
    });
  }
  finally {
    connection.end();
  }
};

userModel.insertUnidadAcademica = (userData, callback) => {
  try {
    createConnection();
    connect();
    if (connection) {
      connection.query('INSERT INTO unidad_acad SET ?', userData,
        (error, data) => {
          if (error) {
            callback(null, {
              error,
              msg: message.SavedError,
              status: false
            });
          } else {
            callback(null, {
              data,
              msg: message.Saved,
              status: true
            })
          }
        }
      )
    }

  } catch (error) {
    callback(null, {
      error,
      msg: message.ErrorInternal,
      status: false
    });
  }
  finally {
    connection.end();
  }
};

userModel.updateUnidadAcademica = (userData, callback) => {
  try {
    createConnection();
    connect();
    if (connection) {
      const sql = `
        UPDATE unidad_acad SET
  
        Nombre_UA = ${connection.escape(userData.Nombre_UA)},
        Nivel_Educ = ${connection.escape(userData.Nivel_Educ)},
        Unidad_Reg = ${connection.escape(userData.Unidad_Reg)},
        Tel_UA = ${connection.escape(userData.Tel_UA)},
        Nom_Direct = ${connection.escape(userData.Nom_Direct)},
        Nom_SA = ${connection.escape(userData.Nom_SA)},
        Direcc_US = ${connection.escape(Direcc_UA)},
        Red_Soc = ${connection.escape(userData.Red_Soc)},
        Nom_RT = ${connection.escape(userData.Nom_RT)},
        Tel_RT = ${connection.escape(userData.Tel_RT)},
        Correo_RT = ${connection.escape(userData.Correo_RT)}
       
        WHERE IDUnidad_Acad = ${userData.IDUnidad_Acad}`;

      connection.query(sql, function (error, data) {
        if (error) {
          callback(null, {
            error,
            msg: message.UpdatedError,
            status: false
          });
        } else {
          callback(null, {
            data,
            msg: message.Updated,
            status: true
          })
        }
      });
    }
  } catch (error) {
    callback(null, {
      error,
      msg: message.ErrorInternal,
      status: false
    });
  }
  finally {
    connection.end();
  }
};

userModel.deleteUnidad_Academica = (id, callback) => {
  try {
    createConnection();
    connect();
    if (connection) {
      var sqlExists = `
          SELECT * FROM unidad_acad WHERE IDUnidad_Acad = ${connection.escape(id)}
        `;
      connection.query(sqlExists, (err, row) => {
        if (row) {
          var sql = `DELETE FROM unidad_acad WHERE IDUnidad_Acad=` + connection.escape(id);
          connection.query(sql, (error, data) => {
            if (error) {
              callback(null, {
                error,
                msg: message.DeletedError,
                status: false
              });
            } else {
              callback(null, {
                data,
                msg: message.Deleted,
                status: true
              })
            }
          });
        } else {
          callback(null, {
            msg: message.NotExist,
            status: false
          });
        }
      });
    }
  }
  finally {
    connection.end();
  }
};

module.exports = userModel;