var express = require('express');
var router = express.Router();
const knex = require("../config/db/knex");

router.get('/', (req, res) => {
   res.status(200).render('marcas', { title: 'Marcas' });
});

router.get('/get', (req, res, next) => {
  knex('marcas').select()
  .then((results) => { 
    res.status(200).json({
      status: 'success',
      data: results
    });
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id;
  knex('marcas').select().where('marcaid', id)
  .then((result) => {
    if (result.length) {
      res.status(200).json({
        status: 'success',
        data: result
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'El registro no existe'
      });
    }
  })
  .catch((err) => {
    return next(err);
  });
});

router.put('/update/:id', (req, res, next) => {
  const id = req.params.id;
  const updatedNombre = req.body.nombre;
  req.check('nombre', 'El campo nombre es requerido').notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    res.status(200).json({
      status: 'validationErrors',
      message: errors[0].msg
    });
  } else {
    knex('marcas').update({nombre: updatedNombre}).where({marcaid: id}).then((result) => {
      if (result) {
        res.status(200).json({
          status: 'success',
          message: '¡Actualizado correctamente!'
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: '¡El registro no existe!'
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
  }
});

router.post('/create', (req, res, next) => {
  req.check('nombre', 'El campo nombre es requerido').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(200).json({
      status: 'error',
      message: errors[0].msg
    });
  } else {
    knex('marcas').insert(req.body)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: 'Registrado correctamente'
      });
    })
    .catch((err) => {
      return next(err);
    });
  }

});

router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  knex('marcas').del().where('marcaid', id)
  .then((result) => {
    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'El registro ha sido eliminado'
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: '¡El registro no existe!'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({ 
      status: 'error',
      message: 'Error: Existen dependencias del registro'
    });
  });
});

module.exports = router;
