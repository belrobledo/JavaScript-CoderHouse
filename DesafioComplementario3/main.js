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

main();

function main(){
    menu();
}

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

function menu(){
    let option=0;
    let auxLista = [];
    let listaProductos = cargarListaProductos();
    option = parseInt(prompt(">> Bienvenido al Kiosco <<\n\n" +
                                "Seleccione una opcion:\n" +
                                "1. Ver todos los productos.\n" + 
                                "2. Ver bebidas.\n" + 
                                "3. Ver comidas.\n" + 
                                "4. Buscar producto.\n" + 
                                "0. Salir."));
    switch(option){
        case 1: mostrarListaProductosDOM(listaProductos);
                break;
        case 2: auxLista = listaProductos.filter((elemento) => elemento.categoria == "Bebida");
                mostrarListaProductosDOM(auxLista);
                break;
        case 3: auxLista = listaProductos.filter((elemento) => elemento.categoria == "Comida");
                mostrarListaProductosDOM(auxLista);
                break;
        case 4: auxLista[0] = buscarProductoPorNombre(listaProductos);
                if(auxLista[0] == undefined){
                    alert("No se encontraron productos que coincidan con la busqueda.");
                }
                else{ 
                    mostrarListaProductosDOM(auxLista);
                }
                break;       
        case 0: alert("Programa finalizado. Vuelva pronto :)");
                break;
    }
}

function buscarProductoPorNombre(listaProductos){
    console.log("lista productos: " + listaProductos + "\n");
    let nombre = prompt("Ingrese el nombre del producto a buscar.");
    return listaProductos.find((elemento) => elemento.nombre.toLowerCase().includes(nombre.trim().toLowerCase()));
    //"includes" para que pueda buscar por un fragmento del string y no solo por la palabra completa.
}

function mostrarListaProductosDOM(listaProductos){
    let containerP = document.getElementById("containerProductos");
    let titulo = document.createElement("h2");
    titulo.innerHTML = "Productos";
    containerP.append(titulo);
    for(const producto of listaProductos){
        let column = document.createElement("div");
        column.id = `columna-${producto.nombre}`;
        column.className = "card";
        column.innerHTML = `<p class="card-text">ID: <b>${producto.id}</b></p>
                            <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
                            <p class="card-text">Precio: <b>$${producto.precio}</b></p>
                            <p class="card-text">Categoria: <b>${producto.categoria}</b></p>
                            `;
        containerP.append(column);
    }
}