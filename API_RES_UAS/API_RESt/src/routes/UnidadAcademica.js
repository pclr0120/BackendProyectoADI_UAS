const UserModel = require('../models/UnidadAcademica');
const message = require('../schema/message');
module.exports = app => {

    app.get('/Unidad_Academica/search', (req, res) => {
        UserModel.getUnidades((err, data) => {
            if (!data.status) {
                res.status(500).json(data);
            } else {
                res.status(200).json(data);
            }
        });
    });

    /*app.get('/Unidad_Academica/search/:id', (req, res) => {
        if (req.params.id == null) {
            res.status(500).json({
                status: false,
                msg: message.MissingParameters
            });
        } else {
            id = req.params.id;
            UserModel.getQuestionsID(id, (err, data) => {
                if (!data.status) {
                    res.status(500).json(data);
                } else {
                    res.status(200).json(data);
                }
            });
        }
    });*/

    app.post('/Unidad_Academica/register', (req, res) => {
        if (false) {
            res.status(500).json({
                status: false,
                msg: message.MissingParameters
            });
        } else {
            var userData = {
                //id: req.body.id, //autoincrementable
                IDUnidad_Acad: req.body.IDUnidad_Acad,
                Nombre_UA: req.body.Nombre_UA,
                Nivel_Educ: req.body.Nivel_Educ,
                Unidad_Reg: req.body.Unidad_Reg,
                Tel_UA: req.body.Tel_UA,
                Nom_Direct: req.body.Nom_Direct,
                Nom_SA: req.body.Nom_SA,
                Direcc_UA: req.body.Direcc_UA,
                Red_Soc: req.body.Red_Soc,
                Nom_RT: req.body.Nom_RT,
                Tel_RT: req.body.Tel_RT,
                Correo_RT: req.body.Correo_RT
            };
            UserModel.insertUnidadAcademica(userData, (err, data) => {
                if (data.status) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json(data);
                }
            });
        }
    });

    app.put('/Unidad_Academica/update/:IDUnidad_Acad', (req, res) => {
        if ((req.params.IDUnidad_Acad)==null) {
            res.status(500).json({
                status: false,
                msg: message.MissingParameters
            });
        } else {
            const userData = {
                IDUnidad_Acad: req.params.IDUnidad_Acad,
                Nombre_UA: req.body.Nombre_UA,
                Nivel_Educ: req.body.Nivel_Educ,
                Unidad_Reg: req.body.Unidad_Reg,
                Tel_UA: req.body.Tel_UA,
                Nom_Direct: req.body.Nom_Direct,
                Nom_SA: req.body.Nom_SA,
                Direcc_UA: req.body.Direcc_UA,
                Red_Soc: req.body.Red_Soc,
                Nom_RT: req.body.Nom_RT,
                Tel_RT: req.body.Tel_RT,
                Correo_RT: req.body.Correo_RT
            };
            UserModel.updateUnidadAcademica(userData, function (err, data) {
                if (data.status) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json(data);
                }
            });
        }
    });


    app.delete('/Unidad_Academica/delete/:IDUnidad_Acad', (req, res) => {
        if (isNaN(req.params.IDUnidad_Acad)) { } else {
            const id = req.params.IDUnidad_Acad;
            UserModel.deleteUnidad_Academica(id, function (err, data) {
                if (data.status) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json(data);
                }
            });
        }
    });

}