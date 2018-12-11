const UserModel = require('../models/ProgramaEducativo');

module.exports = app => {
    app.delete('/ProgramaEducativo/Eliminar/:id', (req, res) => {
        var id = req.params.id;
        UserModel.deleteUser(id, (err, data) => {
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

    app.put('/ProgramaEducativo/Update/', (req, res) => {
        const userData = {

            IdProgramaEducativo: req.body.IdProgramaEducativo,
            ProgramaEducativoA1: req.body.ProgramaEducativoA1,
            ProgramaEducativoA2: req.body.ProgramaEducativoA2,
            Semestre: req.body.Semestre,
            FechaInicio: req.body.FechaInicio,
            FechaCierre: req.body.FechaCierre,


        };

        UserModel.updateCiclo(userData, function (err, data) {
            if (data && data.msg) {
                res.status(200).json({ data });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    app.put('/ProgramaEducativo/delUpd/', (req, res) => {
        const userData = {
            IdProgramaEducativo: req.body.IdProgramaEducativo
        };
        UserModel.delete(userData, function (err, data) {
            if (data && data.msg) {
                res.status(200).json({ data });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    app.get('/ProgramaEducativo/get', (req, res) => {
        UserModel.getProgramaEducativos((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/ProgramaEducativo', (req, res) => {
        // idProgEdu: string;
        // NomPE: string;
        // UnidReg: number; //llave forania
        // UnidadAcad: number; //llave forania
        // Nombre_UA: string;
        // FechaRegistro: string;
        // Estatus: string;
        var userData = {
            //idProgEdu: req.body.idProgEdu,
            NomPE: req.body.NomPE,
            UnidAcad: req.body.UnidAcad,
            NivelEdu:req.body.NivelEdu,
           UnidReg: req.body.UnidReg
        };

        UserModel.insertProg(userData, (err, data) => {
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
