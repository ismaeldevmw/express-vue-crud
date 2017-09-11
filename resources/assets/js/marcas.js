new Vue({
    el: '#marcas',
    created: function() {
      this.getMarcas();
    },
    data: {
      marcas: null,
      showBorrar: null,
      marca: {
        marcaid: '',
        nombre: ''
      },
      nuevaMarca: {
        nombre: ''
      }
    },
    methods: {
      getMarcas: function() {
        var urlMarcas = 'marcas/get';
        axios.get(urlMarcas).then((response) => {
          this.marcas = response.data.data
        })
        .catch((error) => {
          console.log(error);
        });
      },
      deleteMarca: function(id) {
        const answer = confirm('¿Estás seguro?');
        if (answer) {
          var url = '/marcas/delete/' + id;
          axios.delete(url).then((response) => {
            this.getMarcas();
            toastr.success(response.data.message);
            console.log(response);
          })
          .catch((error) => {         
            console.log(error); 
          });
        }
      },
      editMarca: function(id) {
        var url = '/marcas/edit/' + id;
        axios.get(url).then((response) => {
          this.marca = response.data.data[0];
          console.log(this.marca);
        })
        .catch((error) => {        
          console.log(error);
        });
      },
      updateMarca: function() {
        var id = this.marca.marcaid;
        var url = '/marcas/update/' + id;
        var params = this.marca;
        axios.put(url, params).then((response) => {
          if (response.data.status == 'success') {          
            toastr.success(response.data.message);  
            this.getMarcas();
            $('#editModal').modal('toggle');
            console.log(response)
          } else {
            toastr.info(response.data.message); 
          }
        })
        .catch((error) => {
          console.log(error);
        })
      },
      createMarca: function() {
        var url = '/marcas/create';
        var params = this.nuevaMarca;
        axios.post(url, params).then((response) => {
          if (response.data.status == 'success') {          
            toastr.success(response.data.message);  
            this.getMarcas();
            $('#createModal').modal('toggle');
            console.log(response)
          } else {
            toastr.warning(response.data.message); 
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      borrarMarca: function(id) {
        this.showBorrar = id;
      },
      cancelarBorrado: function() {
        this.showBorrar = null;
      },
      confirmarBorrado: function(id) {
        var self = this;
        swal({
          title: "¿Estás seguro?",
          text: "¡No seras capaz de recuperar este registro!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si, ¡eliminarlo!",
          cancelButtonText: "No, ¡cancelar!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            var url = '/marcas/delete/' + id;
            axios.delete(url).then((response) => {
              self.showBorrar = null;
              self.getMarcas();
              swal("¡Eliminado!", response.data.message, "success");
              console.log(response);
            })
            .catch((error) => {  
              self.showBorrar = null;       
              //toastr.error(error.response.data.message);
              console.log(error); 
            });
          } else {
            self.showBorrar = null;
            swal("Cancelado", "Tu registro esta a salvo :)", "error");
          }
        });
      },
      limpiarDatos: function() {
        this.nuevaMarca.nombre = '';
      }
    }
  });