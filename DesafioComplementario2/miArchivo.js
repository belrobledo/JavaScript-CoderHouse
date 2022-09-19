class Producto{
    nombre;
    precio;

    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }

    toString(){
        return (this.nombre + " - $" + this.precio);
    }
}

class Carrito{
    productos = [];

    constructor(){
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    eliminarProducto(producto){
        let index = productos.indexOf(producto);
        if(index!=1){
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

const producto1 = new Producto("Jugo", 120);
const producto2 = new Producto("Gaseosa", 230);
const producto3 = new Producto("Vino", 490);
const producto4 = new Producto("Galletitas", 170);
const producto5 = new Producto("Nachos", 150);
const producto6 = new Producto("Chocolate", 95);

main();

function main(){
    menu();
}

function menu(){
    let option=0;
    do{
        option = parseInt(prompt(">> Bienvenido al Kiosco <<\n\n" +
                             "Seleccione una opcion:\n" +
                            "1. Comprar productos.\n" + 
                            "0. Salir."))
        switch(option){
            case 1: comprarProductos();
                    break;
            case 0: alert("Programa finalizado. Vuelva pronto :)");
                    break;
        }
    }while(option!=0)
}

function comprarProductos(){
    let option = 0;
    let carrito = new Carrito();
    do{
        option = parseInt(prompt("Seleccione un producto a agregar al carrito:\n" +
                      "1. " + producto1.toString() + "\n" + 
                      "2. " + producto2.toString() + "\n" + 
                      "3. " + producto3.toString() + "\n" + 
                      "4. " + producto4.toString() + "\n" + 
                      "5. " + producto5.toString() + "\n" + 
                      "6. " + producto6.toString() + "\n" + 
                      "0. Finalizar compra"))
        switch(option){
            case 1: carrito.agregarProducto(producto1);
                    alert("Producto '" + producto1.nombre + "' agregado al Carrito.");
                    break;
            case 2: carrito.agregarProducto(producto2);
                    alert("Producto '" + producto2.nombre + "' agregado al Carrito.");
                    break;
            case 3: carrito.agregarProducto(producto3);
                    alert("Producto '" + producto3.nombre + "' agregado al Carrito.");
                    break;
            case 4: carrito.agregarProducto(producto4);
                    alert("Producto '" + producto4.nombre + "' agregado al Carrito.");
                    break;
            case 5: carrito.agregarProducto(producto5);
                    alert("Producto '" + producto5.nombre + "' agregado al Carrito.");
                    break;
            case 6: carrito.agregarProducto(producto6);
                    alert("Producto '" + producto6.nombre + "' agregado al Carrito.");
                    break;
            case 0: if(carrito == ""){
                        alert("El Carrito estaba vacio, la compra ha sido cancelada.");
                    }
                    else{
                        mostrarYfinalizarCompra(carrito);
                    }
                    break;
        }
    }while(option!=0)
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