exports.seed = function(knex, Promise) {
// Deletes ALL existing entries
  return knex('marcas').del()
    .then(() => knex('marcas').del())
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('marcas').insert([
          {nombre: 'Sabritas'},
          {nombre: 'Marinela'},
          {nombre: 'Pepsi'},
          {nombre: 'Coca Cola'},
          {nombre: 'Gou'}
        ])
        .then(marca => {
          return knex('productos').insert([
            { nombre: 'Chilimango 200gr', marcaid: marca[0], precio: 12.5, descripcion: 'Gomitas de gelatina cubiertas de chile' },
            { nombre: 'Mundet 2L', marcaid: marca[0], precio: 19, descripcion: 'Refresco sabor manzana' },
            { nombre: 'Mirinda 600ml', marcaid: marca[0], precio: 11, descripcion: 'Refresco sabor mandarina' },
            { nombre: 'Emperador vainilla 150gr', marcaid: marca[0], precio: 12.99, descripcion: 'Galletas sabor vainilla rellenas de chocolate' },
            { nombre: 'Churrumaiz 40gr', marcaid: marca[0], precio: 5.98, descripcion: 'Frituras de maiz con chile y limón' }
          ])
        })
        .then(() => {
          console.log('Seeding complete!');
        })
        .catch(error => {
          console.log('Error seeding data: ${error}');
        })
      ]) // end return Promise.all
    })
    .catch(error => console.log('Error seeding data: ${error}'));
};
