menu()

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
    let suma = 0;
    let carrito = "";
    const producto1 = "Jugo";
    const producto2 = "Gaseosa";
    const producto3 = "Vino";
    const producto4 = "Galletitas";
    const producto5 = "Nachos";
    const producto6 = "Chocolate";
    const valorProd1 = 120;
    const valorProd2 = 230;
    const valorProd3 = 490;
    const valorProd4 = 170;
    const valorProd5 = 150;
    const valorProd6 = 95;
    do{
        option = parseInt(prompt("Seleccione un producto a agregar al carrito:\n" +
                    "1. " + producto1 + " - $" + valorProd1 + "\n" + 
                    "2. " + producto2 + " - $" + valorProd2 + "\n" + 
                    "3. " + producto3 + " - $" + valorProd3 + "\n" + 
                    "4. " + producto4 + " - $" + valorProd4 + "\n" + 
                    "5. " + producto5 + " - $" + valorProd5 + "\n" + 
                    "6. " + producto6 + " - $" + valorProd6 + "\n" + 
                    "0. Finalizar compra"))
        switch(option){
            case 1: carrito = sumarCarrito(carrito, producto1);
                    suma = sumarProducto(suma, valorProd1);
                    alert("Producto '" + producto1 + "' agregado al Carrito.");
                    break;
            case 2: carrito = sumarCarrito(carrito, producto2);
                    suma = sumarProducto(suma, valorProd2);
                    alert("Producto '" + producto2 + "' agregado al Carrito.");
                    break;
            case 3: carrito = sumarCarrito(carrito, producto3);
                    suma = sumarProducto(suma, valorProd3);
                    alert("Producto '" + producto3 + "' agregado al Carrito.");
                    break;
            case 4: carrito = sumarCarrito(carrito, producto4);
                    suma = sumarProducto(suma, valorProd4);
                    alert("Producto '" + producto4 + "' agregado al Carrito.");
                    break;
            case 5: carrito = sumarCarrito(carrito, producto5);
                    suma = sumarProducto(suma, valorProd5);
                    alert("Producto '" + producto5 + "' agregado al Carrito.");
                    break;
            case 6: carrito = sumarCarrito(carrito, producto6);
                    suma = sumarProducto(suma, valorProd6);
                    alert("Producto '" + producto6 + "' agregado al Carrito.");
                    break;
            case 0: if(carrito == ""){
                        alert("El Carrito estaba vacio, la compra ha sido cancelada.")
                    }
                    else{
                        mostrarYfinalizarCompra(suma, carrito);
                    }
                    break;
        }
    }while(option!=0)
}

function sumarProducto(suma, valorProducto){
    return suma + valorProducto;
}

function sumarCarrito(carrito, nuevoProducto){
    if(carrito == ""){
        return nuevoProducto;
    }
    else{
        return carrito + ", " + nuevoProducto;
    }
}

function mostrarYfinalizarCompra(suma, carrito){
    let option = parseInt(prompt("Productos en el carrito: " + carrito + "." +
                        "\nPrecio total: $" + suma +
                        "\n\nSeleccione el metodo de pago a utilizar:" + 
                        "\n1. Efectivo (10% de descuento)" + 
                        "\n2. Tarjeta de Credito (en 3 cuotas sin intereses)" +
                        "\n0. Cancelar compra."))
    switch(option){
        case 1: alert("Gracias por su compra!\nPrecio Final: $" + aplicarDescuento(suma).toFixed(2));
                break;
        case 2: alert("Gracias por su compra!\nPrecio Final: $" + suma + " en 3 cuotas sin intereses de $" + calcularCuotas(suma).toFixed(2));
                break;
        case 0: alert("Compra cancelada.");
                break;
    }
}

function aplicarDescuento(suma){
    return (parseFloat(suma) * 0.9);
}

function calcularCuotas(suma){
    return (parseFloat(suma) / 3);
}