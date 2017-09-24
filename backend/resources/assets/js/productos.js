new Vue({
    el: '#productos',
    created: function() {
        this.getProductos();
        this.getMarcas();
    },
    data: {
        marcas: null,
        productos: null,
        producto: {
        productoid: '',
        nombre: '',
        marcaid: '',
        precio: null,
        descripcion: ''
        },
        nuevoProducto: {
            productoid: '',
            nombre: '',
            marcaid: '',
            precio: null,
            descripcion: ''
        }
    },
    methods: {
        getMarcas: function() {
            var urlMarcas = '/marcas/get';
            axios.get(urlMarcas).then((response) => {
              this.marcas = response.data.data
            })
            .catch((error) => {
              console.log(error);
            });
        },
        getProductos: function() {
            var url = '/productos/get';
            axios.get(url).then((response) => {                  
            this.productos = response.data.data;                                           
            })
            .catch((error) => {
            console.log(error);
            });
        },
        editProducto: function(id) {            
            var url = '/productos/edit/' + id;
            axios.get(url).then((response) => {
            this.producto = response.data.data[0];
            console.log(this.marca);
            })
            .catch((error) => {        
            console.log(error);
            });
        },
        updateProducto: function() {
            var id = this.producto.productoid;
            var url = '/productos/update/' + id;
            var params = this.producto;
            axios.put(url, params).then((response) => {
            if (response.data.status == 'success') {          
                toastr.success(response.data.message);                  
                $('#editModal').modal('toggle');
                console.log(response);
            } else {
                toastr.info(response.data.message); 
            }
            })
            .catch((error) => {
            console.log(error);
            })
        },
        createProducto: function() {
            var url = '/productos/create';
            var params = this.nuevoProducto;
            axios.post(url, params).then((response) => {
            if (response.data.status == 'success') {          
                toastr.success(response.data.message);  
                this.getProductos();                                 
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
        deleteProducto: function(id) {
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
                var url = '/productos/delete/' + id;
                axios.delete(url).then((response) => {
                self.getProductos();
                swal("¡Eliminado!", response.data.message, "success");
                console.log(response);
                })
                .catch((error) => {                
                console.log(error); 
                });
            } else {
                swal("Cancelado", "Tu registro esta a salvo :)", "error");
            }
            });
        },
        limpiarDatos: function() {
            this.nuevoProducto.nombre = '';
        }
    }
  });