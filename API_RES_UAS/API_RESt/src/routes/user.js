const UserModel = require('../models/users');

module.exports = app => {

  app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    UserModel.getUsuario(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/users/Log/:user', (req, res) => {
 
    var user = req.params.user;
    UserModel.getLog(user,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });

  app.get('/users', (req, res) => {
    UserModel.getUsers((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/users', (req, res) => {
    var userData = {
      Id: null,
      userrr: req.body.Usuario,
      pass: req.body.Password,
      Estatus:req.body.Estatus,
      idEmpleado:req.body.NE,
      Rol: req.body.Rol,

   
    };
   
    UserModel.insertUser(userData, (err, data) => {
    try {
      if (data && data.insertId) {
// ///insertar primiso
//         var userData2 = {
//               Id:data.insertId,
//               Administrador: req.body.Administrador,
//               Cliente: req.body.Cliente,
//               Asistente: req.body.Asistente,
          
//               Chofer:req.body.Chofer
           
//             };
//         UserModel.insertUserPermisos(userData2, (err2, data2) => {

//         });
//         ///fin inserpermiso
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/users/' + data.insertId);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    } catch (error) {
      
    }
     
    });
  });

  app.put('/users/:id', (req, res) => {
    const userData = {
      Id: req.params.id,
     
      pass: req.body.Password,
      Estatus:req.body.Estatus,
      Rol: req.body.Rol,
      
   
    };
    UserModel.updateUser(userData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    UserModel.deleteUser(id, (err, data) =>  {
      if (data && data.msg === 'deleted' || data.msg == 'not Exists') {
        res.json({
          success: 'true',
          data
        });
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });
};
