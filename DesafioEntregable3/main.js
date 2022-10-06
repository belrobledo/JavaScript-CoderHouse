//DESAFIO ENTREGABLE 3 - ROBLEDO, BELEN

//----CLASES----------------------------------------------------------------------------------------------
class Producto{
    static i = 1;

    constructor({nombre, precio, categoria, imgRoute}){
        this.id = this.constructor.i++;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
        this.cantidad = 1;
        this.imgRoute = (imgRoute || "./img/undefined.jpg");
    }

    setCantidad (cantidad){
        this.cantidad = parseInt(cantidad);
    }

    static resetStaticID (){
        Producto.i = 1;
    }
}

class Carrito{
    constructor(){
        this.productos = [];
    }

    agregarProducto(producto){
        let index = this.productos.map(e => e.nombre).indexOf(producto.nombre);
        //let index = this.productos.indexOf(producto);
        (index !==-1) ? this.productos[index].cantidad++ : this.productos.push(producto);
    }

    eliminarProducto(producto){
        let index = this.productos.indexOf(producto);
        if(index!==-1){
            (this.productos[index].cantidad>1) ? this.productos[index].cantidad-- : this.productos.splice(index, 1);
        }
    }

    calcularPrecioTotal(){
        let suma = 0;
        for(let producto of this.productos){
            suma += (producto.precio * producto.cantidad);
        }
        return suma;
    }
}
//----------------------------------------------------------------------------------------------------------


//----MAIN--------------------------------------------------------------------------------------------------
main();

function main(){
    mostrarOpcionesMenu();
}
//----------------------------------------------------------------------------------------------------------


//-----FUNCIONES--------------------------------------------------------------------------------------------
function cargarListaProductos(){
    let listaProductos = [];
    Producto.resetStaticID();
    let objeto = {nombre: "Jugo", precio: 120, categoria: "Bebida", imgRoute: "./img/jugo.jpg"};
    listaProductos.push(new Producto(objeto));
    objeto = {nombre: "Gaseosa", precio: 230, categoria: "Bebida", imgRoute: "./img/gaseosa.jpg"};
    listaProductos.push(new Producto(objeto));
    objeto = {nombre: "Vino", precio: 490, categoria: "Bebida", imgRoute: "./img/vino.jpg"};
    listaProductos.push(new Producto(objeto));
    objeto = {nombre: "Galletitas", precio: 170, categoria: "Comida", imgRoute: "./img/galletitas.jpg"};
    listaProductos.push(new Producto(objeto));
    objeto = {nombre: "Nachos", precio: 150, categoria: "Comida", imgRoute: "./img/nachos.jpg"};
    listaProductos.push(new Producto(objeto));
    objeto = {nombre: "Chocolate", precio: 95, categoria: "Comida", imgRoute: "./img/chocolate.jpg"};
    listaProductos.push(new Producto(objeto));
    //esta carga quedo un poco desprolija pero lo hice asi para poder incorporar la desestructuracion en parametros.
    //ademas, si logro guardar los productos en un archivo.json podria cargarlos de esta manera tambien.
    return listaProductos;
}

function mostrarOpcionesMenu(){
    let listaProductos = cargarListaProductos();
    let containerMenu = document.createElement("div");
    containerMenu.id = "containerMenu";
    containerMenu.className = "menu";
    containerMenu.innerHTML = "<h1>Bienvenido al Kiosco</h1>";
    let menuList = document.createElement("div");
    menuList.className = "menu-list";
    menuList.innerHTML = `<button id=btn1>Ver todos los productos</button>
                            <button id=btn2>Ver bebidas</button>
                            <button id=btn3>Ver comidas</button>
                            <button id=btn4>Buscar producto</button>
                            `;
    containerMenu.append(menuList);
    document.body.append(containerMenu);
    menuListener(listaProductos);
}

function menuListener(listaProductos){
    let auxLista = [];
    let boton1 = document.getElementById("btn1");
    boton1.onclick = function() {
        containerMenu.remove();
        comprarProductos(listaProductos)};

    let boton2 = document.getElementById("btn2");
    boton2.onclick = function() {
        containerMenu.remove();
        auxLista = listaProductos.filter((elemento) => elemento.categoria == "Bebida");
        comprarProductos(auxLista);};

    let boton3 = document.getElementById("btn3");
    boton3.onclick = function() {
        containerMenu.remove();
        auxLista = listaProductos.filter((elemento) => elemento.categoria == "Comida");
        comprarProductos(auxLista);};

    let boton4 = document.getElementById("btn4");
    boton4.onclick = function() {
        containerMenu.remove()
        buscarProductoPorNombre(listaProductos);};
}

function comprarProductos(listaProductos){
    let carrito = retrieveCarrito();
    let containerComprar = document.createElement("div");
    containerComprar.id = "containerComprar";
    containerComprar.className = "contenedor-comprar";
    containerComprar.append(mostrarProductos(listaProductos, "Productos"));
    document.body.append(containerComprar);

    agregarBotonAgregar(listaProductos, carrito);
    containerComprar.append(agregarBotonCarrito(carrito));
    containerComprar.append(agregarBotonVolver());
}

function verCarrito(carrito){
    let containerCarrito = document.createElement("div");
    document.body.append(containerCarrito);
    containerCarrito.className = "contenedor-carrito";
    containerCarrito.id = "containerCarrito";
    containerCarrito.append(mostrarProductos(carrito.productos, "Carrito"));
    mostrarCantidadEnProducto(carrito);

    let estadoCarrito = document.createElement("p");
    estadoCarrito.id = "estadoCarrito";
    containerCarrito.append(estadoCarrito);
    carrito.productos.length === 0 && (estadoCarrito.innerHTML = "El carrito esta vacio.");

    agregarBotonEliminar(carrito);
    carrito.productos.length > 0 && (containerCarrito.append(agregarBotonPagar(carrito)) + containerCarrito.append(agregarBotonVaciarCarrito()));
    containerCarrito.append(agregarBotonVolver());
}

function finalizarCompra(carrito){
    let containerTicket = document.createElement("div");
    containerTicket.className = "contenedor-ticket";
    containerTicket.id = "containerTicket";
    containerTicket.append(mostrarProductos(carrito.productos, "Gracias por su compra <3"));
    containerTicket.innerHTML += `<h3 id=precioTotal>Precio Total: $${carrito.calcularPrecioTotal()}</h3>`;
    document.body.append(containerTicket);
    mostrarCantidadEnProducto(carrito);

    localStorage.clear();

    containerTicket.append(agregarBotonVolver());
}

function mostrarProductos(listaProductos, tituloText){
    let containerProductos = document.createElement("div");
    containerProductos.id = "containerProductos";
    containerProductos.className = "contenedor-productos";
    let titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.innerText = tituloText;
    containerProductos.append(titulo);
    for(const producto of listaProductos){
        let column = document.createElement("div");
        column.id = `columna-${producto.id}`;
        column.className = "card";
        column.innerHTML = `<img class="img-product" src="${producto.imgRoute}" alt="${producto.nombre}">
                            <p class="card-text">ID: <b>${producto.id}</b></p>
                            <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
                            <p class="card-text">Precio: <b>$${producto.precio}</b></p>
                            <p class="card-text">Categoria: <b>${producto.categoria}</b></p>
                            `;
        containerProductos.append(column);
    }
    return containerProductos;
}

function mostrarCantidadEnProducto(carrito){
    for(const producto of carrito.productos){
        let column = document.getElementById(`columna-${producto.id}`);
        column.innerHTML += `<p class="card-text" id="card-${producto.id}-cantidad">Cantidad: <b>${producto.cantidad}</b></p>`;
    }
}
//----------------------------------------------------------------------------------------------------------


//----AGREGAR-BOTONES---------------------------------------------------------------------------------------
function agregarBotonVolver(){
    let botonVolver = document.createElement("button");
    botonVolver.id = "botonVolver";
    botonVolver.className = "boton-volver";
    botonVolver.textContent = "Volver al Menu";

    botonVolver.onclick = function() {
        botonVolver.parentElement.remove();
        mostrarOpcionesMenu();}

    return botonVolver;
}

function agregarBotonAgregar(listaProductos, carrito){
    for(const producto of listaProductos){
        let column = document.getElementById(`columna-${producto.id}`);
        let boton = document.createElement("button");
        column.append(boton);
        boton.id = `botonProducto-${producto.id}`;
        boton.className = "boton-producto";
        boton.textContent = "Agregar";

        boton.onclick = function() {
            carrito.agregarProducto(producto);
            saveCarrito(carrito);

            Toastify({
                text: `"${producto.nombre}" agregado al carrito.`,
                duration: 3000,
                stopOnFocus: true,
                style: {
                    background: "#198754"
                  }
                }).showToast();
        }
    }
}

function agregarBotonCarrito(carrito){
    let botonCarrito = document.createElement("button");
    botonCarrito.id = "botonCarrito";
    botonCarrito.className = "boton-carrito";
    botonCarrito.textContent = "Ver Carrito";

    botonCarrito.onclick = function() {
        botonCarrito.parentElement.remove();
        verCarrito(carrito);}

    return botonCarrito;
}

function agregarBotonEliminar(carrito){
    for(const producto of carrito.productos){
        let column = document.getElementById(`columna-${producto.id}`);
        let boton = document.createElement("button");
        column.append(boton);
        boton.id = `botonProducto-${producto.id}`;
        boton.className = "boton-producto";
        boton.textContent = "Eliminar";

        boton.onclick = function() {
            if(producto.cantidad===1){
                column.remove();
            }else{
                let textCantidad = document.getElementById(`card-${producto.id}-cantidad`);
                textCantidad.innerHTML = `<p class="card-text" id="card-${producto.id}-cantidad">Cantidad: <b>${producto.cantidad - 1}</b></p>`;
            }
            carrito.eliminarProducto(producto);
            saveCarrito(carrito);

            if(carrito.productos.length === 0){
                let containerCarrito = document.getElementById("containerCarrito");
                containerCarrito.remove();
                localStorage.clear();
                verCarrito(carrito);
            }
        }
    }
}

function agregarBotonVaciarCarrito(){
    let botonVaciarCarrito = document.createElement("button");
    botonVaciarCarrito.id = "botonVaciarCarrito";
    botonVaciarCarrito.className = "boton-vaciar-carrito";
    botonVaciarCarrito.textContent = "Vaciar Carrito";

    botonVaciarCarrito.onclick = function() {
        swal.fire({
            title: "Esta seguro que desea vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if(result.isConfirmed){
                swal.fire({
                    title: "Carrito vaciado.",
                    icon: "success"
                })
                botonVaciarCarrito.parentElement.remove();
                localStorage.clear();
                let carrito = new Carrito;
                verCarrito(carrito);
            }
        })
    }

    return botonVaciarCarrito;
}

function agregarBotonPagar(carrito){
    let botonPagar = document.createElement("button");
    botonPagar.id = "botonPagar";
    botonPagar.className = "boton-pagar";
    botonPagar.textContent = "Pagar";

    botonPagar.onclick = function() {
        botonPagar.parentElement.remove();
        finalizarCompra(carrito);}

    return botonPagar;
}
//----------------------------------------------------------------------------------------------------------


//-----BUSCAR-PRODUCTO-POR-NOMBRE---------------------------------------------------------------------------
function buscarProductoPorNombre(listaProductos){
    let containerBusqueda = document.createElement("div");
    containerBusqueda.className = "contenedor-busqueda";
    containerBusqueda.id = "containerBusqueda";
    containerBusqueda.innerHTML = `<h1>Buscar Producto</h1>
                                    <form id=formulario>
                                        <input type="text" placeholder="Producto" required>
                                        <input type="submit" value="Buscar">
                                    </form>
                                    `;
    containerBusqueda.append(agregarBotonVolver());
    document.body.append(containerBusqueda);
    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", obtenerProductoIngresado);
}

function obtenerProductoIngresado(event){
    event.preventDefault();
    let formulario = event.target;
    let auxLista = [];
    let listaProductos = cargarListaProductos();
    let nombre = formulario.children[0].value;
    auxLista[0] = listaProductos.find((elemento) => elemento.nombre.toLowerCase().includes(nombre.trim().toLowerCase()));
    //"includes" para que pueda buscar por un fragmento del string y no solo por la palabra completa.
    let containerBusqueda = document.getElementById("containerBusqueda");
    if(auxLista[0] == undefined){
        let resultado = document.createElement("p");
        resultado.innerText = "No se encontraron productos que coincidan con la busqueda.";
        containerBusqueda.append(resultado);
    }
    else{
        containerBusqueda.remove();
        comprarProductos(auxLista);
    }
}
//----------------------------------------------------------------------------------------------------------


//-----JSON-------------------------------------------------------------------------------------------------
function retrieveCarrito(){
    let listaJSON = JSON.parse(localStorage.getItem("productosCarrito"));
    let carrito = new Carrito();
    if(listaJSON!=null){
        for(const objeto of listaJSON){
            let producto = new Producto(objeto);
            producto.setCantidad(objeto.cantidad);
            carrito.productos.push(producto);
        }
    }
    return carrito;
}

function saveCarrito(carrito){
    localStorage.setItem("productosCarrito", JSON.stringify(carrito.productos));
}
//----------------------------------------------------------------------------------------------------------