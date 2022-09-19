let numero = 0;
const MENSAJE = "Hola";

numero = prompt("Indique la cantidad de veces a saludar.");

for(let i=0; i<numero; i++){
    alert((i+1) + ". " + MENSAJE);
}