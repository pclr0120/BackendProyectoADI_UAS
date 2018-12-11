const UserModel = require('../models/CicloEscolar');

module.exports = app => {
  app.delete('/CicloEscolar/Eliminar/:id', (req, res) => {
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

  app.put('/CicloEscolar/Update/', (req, res) => {
    const userData = {

      IdCicloEscolar:req.body.IdCicloEscolar,
     CicloEscolarA1:req.body.CicloEscolarA1,
     CicloEscolarA2:req.body.CicloEscolarA2,
      Semestre: req.body.Semestre,
      FechaInicio:req.body.FechaInicio,
      FechaCierre: req.body.FechaCierre,
      
   
    };

    UserModel.updateCiclo(userData, function (err, data) {
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

  app.put('/CicloEscolar/delUpd/', (req, res) => {
    const userData = {
      IdCicloEscolar:req.body.IdCicloEscolar
    };
    UserModel.delete(userData, function (err, data) {
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

  app.get('/CicloEscolar/get', (req, res) => {
    UserModel.getUsers((err, data) => {
      res.status(200).json(data);
    });
  });

  app.post('/CicloEscolar', (req, res) => {
    var userData = {
      CicloEscolarA1:req.body.CicloEscolarA1,
      CicloEscolarA2:req.body.CicloEscolarA2,
      Semestre: req.body.Semestre,
      FechaInicio: req.body.FechaInicio,
      FechaCierre:req.body.FechaCierre
    };
   
    UserModel.insertCiclo(userData, (err, data) => {
    try {
      if (data && data.insertId) {

        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
  
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


};
