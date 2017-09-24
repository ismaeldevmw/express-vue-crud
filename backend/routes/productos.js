var express = require('express');
var router = express.Router();
const knex = require("../config/db/knex");

router.get('/', (req, res) => {
  res.status(200).render('productos', {title: 'Productos'});
});

router.get('/get', (req, res, next) => {
  knex.select('productos.productoid', 'productos.nombre', 'marcas.nombre as marca', 'precio', 'descripcion').from('productos').leftJoin('marcas', 'productos.marcaid', 'marcas.marcaid')
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
  knex('productos').select('*','productos.nombre as nombre','marcas.nombre as marca').leftJoin('marcas', 'productos.marcaid', 'marcas.marcaid').where('productoid', id)
  .then((result) => {
    if(result.length) {
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

router.put('/update/:id', (req,res, next) => {
  const id = req.params.id;
  var data = {
    productoid: req.params.id,
    nombre: req.body.nombre,
    marcaid: req.body.marcaid,
    precio: req.body.precio,
    descripcion: req.body.descripcion
  };
  req.check('nombre', 'El campo nombre es requerido').notEmpty();
  req.check('precio','Valor invalido, se requiere un precio menor a 100').isFloat();
  var errors = req.validationErrors();

  if (errors) {
    res.status(200).json({
      status: 'validationErrors',
      message: errors[0].msg
    });
  } else {
    knex('productos').update(data).where({productoid: id})
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: 'success',
          message: '¡Actualizado correctamente'
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: '¡El registro no existe'
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
  req.check('precio','Valor invalido, se requiere un precio menor a 100').isFloat();
  var errors = req.validationErrors();
  if (errors) {
    res.status(200).json({
      status: 'error',
      message: errors[0].msg
    });
  } else {
    knex('productos').insert(req.body)
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

router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('productos').del().where('productoid', id)
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
    return next(err);
  });
});

module.exports = router;
