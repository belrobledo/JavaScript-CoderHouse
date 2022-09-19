class Producto{
    constructor(nombre, precio, categoria){
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
    do{
        option = parseInt(prompt(">> Bienvenido al Kiosco <<\n\n" +
                                    "Seleccione una opcion:\n" +
                                    "1. Ver todos los productos.\n" + 
                                    "2. Ver bebidas.\n" + 
                                    "3. Ver comidas.\n" + 
                                    "4. Buscar producto.\n" + 
                                    "0. Salir."));
       switch(option){
            case 1: comprarProductos(listaProductos);
                    break;
            case 2: auxLista = listaProductos.filter((elemento) => elemento.categoria == "Bebida");
                    comprarProductos(auxLista);
                    break;
            case 3: auxLista = listaProductos.filter((elemento) => elemento.categoria == "Comida");
                    comprarProductos(auxLista);
                    break;
            case 4: auxLista[0] = buscarProductoPorNombre(listaProductos);
                    if(auxLista[0] == undefined){
                        alert("No se encontraron productos que coincidan con la busqueda.");
                    }
                    else{ 
                        comprarProductos(auxLista);
                    }
                    break;       
            case 0: alert("Programa finalizado. Vuelva pronto :)");
                    break;
        }
    }while(option!=0)
}

function buscarProductoPorNombre(listaProductos){
    console.log("lista productos: " + listaProductos + "\n");
    let nombre = prompt("Ingrese el nombre del producto a buscar.");
    return listaProductos.find((elemento) => elemento.nombre.toLowerCase().includes(nombre.trim().toLowerCase()));
}

function comprarProductos(productos){
    let option = 0;
    let carrito = new Carrito();
    if(productos != null){
        do{
            option = parseInt(prompt("Seleccione un producto a agregar al carrito:\n" +
                                        mostrarListaProductos(productos) + 
                                        "0. Finalizar compra"));
            if(option>0 && option <= productos.length){
                carrito.agregarProducto(productos[option-1]);
                alert("Producto '" + productos[option-1].nombre + "' agregado al Carrito.");
            }
            else if (option == 0){
                if(carrito.productos.length == 0){
                    alert("El Carrito estaba vacio, la compra ha sido cancelada.");
                }
                else{
                    mostrarYfinalizarCompra(carrito);
                }
            }
        }while(option!=0)
    }
    else{
        alert("No hay productos disponibles para comprar.");
    }
}

function mostrarListaProductos(productos){
    let auxString = "";
    let i=1;
    productos.forEach(producto => {
        auxString += (i + ". " + producto.toString() + "\n");
        i++
    });
    return auxString;
}

function mostrarYfinalizarCompra(carrito){
    let option = parseInt(prompt(carrito.toString() + 
                        "\n\nSeleccione el metodo de pago a utilizar:" + 
                        "\n1. Efectivo (10% de descuento)" + 
                        "\n2. Tarjeta de Credito (en 3 cuotas sin intereses)" +
                        "\n0. Cancelar compra."))
    switch(option){
        case 1: alert("Gracias por su compra!\nPrecio Final: $" + aplicarDescuento(carrito.calcularPrecioTotal()).toFixed(2));
                break;
        case 2: alert("Gracias por su compra!\nPrecio Final: $" + carrito.calcularPrecioTotal() + " en 3 cuotas sin intereses de $" + calcularCuotas(carrito.calcularPrecioTotal()).toFixed(2));
                break;
        case 0: alert("Compra cancelada.");
                break;
    }
}

function aplicarDescuento(precioTotal){
    return (parseFloat(precioTotal) * 0.9);
}

function calcularCuotas(precioTotal){
    return (parseFloat(precioTotal) / 3);
}