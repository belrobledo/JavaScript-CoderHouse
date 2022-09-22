//DESAFIO ENTREGABLE 2 - ROBLEDO, BELEN

//----CLASES----------------------------------------------------------------------------------------------
class Producto{
    static i = 1;

    constructor(nombre, precio, categoria){
        this.id = this.constructor.i++;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
    }

    toString(){
        return (this.nombre + " - $" + this.precio + " - Categoria: " + this.categoria);
    }
}

class Carrito{
    constructor(){
        this.productos = [];
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    eliminarProducto(producto){
        let index = productos.indexOf(producto);
        if(index!==-1){
            this.productos.splice(index, 1);
        }
    }

    calcularPrecioTotal(){
        let suma = 0;
        for(let producto of this.productos){
            suma = suma + producto.precio;
        }
        return suma;
    }

    toString(){
        let auxString = "Productos en el Carrito: ";
            for(let aux of this.productos){
                auxString += (aux.nombre + ", ");
            }
            auxString = auxString.slice(0, -2);
        auxString += ("\nPrecio Total: $" + this.calcularPrecioTotal());
        return auxString;
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
    listaProductos.push(new Producto("Jugo", 120, "Bebida"));
    listaProductos.push(new Producto("Gaseosa", 230, "Bebida"));
    listaProductos.push(new Producto("Vino", 490, "Bebida"));
    listaProductos.push(new Producto("Galletitas", 170, "Comida"));
    listaProductos.push(new Producto("Nachos", 150, "Comida"));
    listaProductos.push(new Producto("Chocolate", 95, "Comida"));
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
        column.innerHTML = `<p class="card-text">ID: <b>${producto.id}</b></p>
                            <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
                            <p class="card-text">Precio: <b>$${producto.precio}</b></p>
                            <p class="card-text">Categoria: <b>${producto.categoria}</b></p>
                            `;
        containerProductos.append(column);
    }
    return containerProductos;
}

function comprarProductos(listaProductos){
    let carrito = new Carrito();
    let containerComprar = document.createElement("div");
    containerComprar.id = "containerComprar";
    containerComprar.className = "contenedor-comprar";
    let tituloText = "Productos";
    containerComprar.append(mostrarProductos(listaProductos, tituloText));
    document.body.append(containerComprar);

    for(const producto of listaProductos){
        let column = document.getElementById(`columna-${producto.id}`);
        let boton = document.createElement("button");
        column.append(boton);
        boton.innerText = "Agregar";
        boton.className = "boton-producto";
        boton.id = `botonProducto-${producto.id}`;

        boton.onclick = function() {
            carrito.productos.push(producto);
        }
    }

    containerComprar.append(agregarBotonCancelar());
    containerComprar.append(agregarBotonFinalizar(carrito));
}

function finalizarCompra(carrito){
    let containerCarrito = document.createElement("div");
    document.body.append(containerCarrito);
    containerCarrito.className = "contenedor-carrito";
    containerCarrito.id = "containerCarrito";
    let tituloText = "Carrito";
    containerCarrito.append(mostrarProductos(carrito.productos, tituloText));
    containerCarrito.append(agregarBotonCancelar());
    containerCarrito.append(agregarBotonPagar(carrito));
}

function mostrarTicket(carrito){
    let containerTicket = document.createElement("div");
    containerTicket.className = "contenedor-ticket";
    containerTicket.id = "containerTicket";
    tituloText = "Gracias por su compra <3";
    containerTicket.append(mostrarProductos(carrito.productos, tituloText));
    containerTicket.innerHTML += `<h3 id=precioTotal>Precio Total: $${carrito.calcularPrecioTotal()}</h3>`;
    document.body.append(containerTicket);
}
//----------------------------------------------------------------------------------------------------------


//----AGREGAR-BOTONES---------------------------------------------------------------------------------------
function agregarBotonCancelar(){
    let botonCancelar = document.createElement("button");
    botonCancelar.id = "botonCancelar";
    botonCancelar.className = "boton-cancelar";
    botonCancelar.textContent = "Cancelar";

    botonCancelar.onclick = function() {
        botonCancelar.parentElement.remove();
        mostrarOpcionesMenu();}

    return botonCancelar;
}

function agregarBotonFinalizar(carrito){
    let botonFinalizar = document.createElement("button");
    botonFinalizar.id = "botonFinalizar";
    botonFinalizar.className = "boton-finalizar";
    botonFinalizar.textContent = "Finalizar Compra";

    botonFinalizar.onclick = function() {
        botonFinalizar.parentElement.remove();
        finalizarCompra(carrito);}

    return botonFinalizar;
}

function agregarBotonPagar(carrito){
    let botonPagar = document.createElement("button");
    botonPagar.id = "botonPagar";
    botonPagar.className = "boton-pagar";
    botonPagar.textContent = "Pagar";

    botonPagar.onclick = function() {
        botonPagar.parentElement.remove();
        mostrarTicket(carrito);}

    return botonPagar;
}
//----------------------------------------------------------------------------------------------------------


//-----BUSCAR-PRODUCTO-POR-NOMBRE---------------------------------------------------------------------------
function buscarProductoPorNombre(listaProductos){
    //let auxLista = [];
    let containerBusqueda = document.createElement("div");
    containerBusqueda.className = "contenedor-busqueda";
    containerBusqueda.id = "containerBusqueda";
    containerBusqueda.innerHTML = `<h1>Buscar Producto</h1>
                                    <form id=formulario>
                                        <input type="text" placeholder="Producto" required>
                                        <input type="submit" value="Buscar">
                                    </form>
                                    `;
    containerBusqueda.append(agregarBotonCancelar());
    document.body.append(containerBusqueda);
    let formulario = document.getElementById("formulario");
    /*let nombre =*/ formulario.addEventListener("submit", obtenerProductoIngresado);

    /*Con esta funcion tuve un inconveniente, mi idea era que el evento al apretar Submit llamara a la funcion
    ObtenerProductoIngresado, y esta funcion devolviese el valor ingresado asignandolo a nombre, para luego 
    realizar la busqueda y todo lo que se encuentra en el comentario siguiente. 
    El problema fue que se ejecutaba todo el codigo de la funcion buscarProductoPorNombre, incluso lo que 
    estaba debajo del eventListener, y al realizarse el evento no volvia a ejecutarse la funcion, entonces
    tuve que seguir el resto de la funcion dentro del eventListener pero no se si es lo correcto.*/

    /*auxLista[0] = listaProductos.find((elemento) => elemento.nombre.toLowerCase().includes(nombre.trim().toLowerCase()));
    //"includes" para que pueda buscar por un fragmento del string y no solo por la palabra completa.

    console.log(auxLista[0]);

    if(auxLista[0] == undefined){
        alert("No se encontraron productos que coincidan con la busqueda.");
    }
    else{ 
        comprarProductos(auxLista);
    }*/
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

    //return formulario.children[0].value;
    /*esto es lo que a mi me hubiese gustado que devolviera la funcion, en vez de hacer todo aca dentro,
    ademas tuve que Cancelar a cargarListaProductos porque no tenia los valores en esta funcion*/
}
//----------------------------------------------------------------------------------------------------------
