// Acá se carga toda la información de los productos
// El array que almacena los datos del carrito que se encuentran guardados en el almacenamiento local
var almacenamiento = JSON.parse(localStorage.getItem("carrito"));

/* Check out para ver productos y finalizar compra y con esto la rompimos! */
let divCarrito = document.getElementById("carritoContenedor");
for (let todo of almacenamiento) {
  let finalizar = document.createElement("div");
  let contenedor = document.createElement("div");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let img = document.createElement("img");
  let check = document.createElement("input");
  let regalo = document.createElement("p");
  let carritoCantidades = document.createElement("span");
  let eliminar = document.createElement("button");

  check.className = "form-check-input";
  finalizar.className = "finalizar";
  contenedor.className = "contenedor";
  finalizar.className = "modalcontainer";
  img.className = "img-fluid";
  h3.className = "preciofinal";

  img.setAttribute("src", `${todo.imagen}`);
  carritoCantidades.setAttribute("id", `${todo.id}`);

  check.type = "checkbox";
  h2.innerHTML = todo.nombre;
  h3.innerHTML = `$${todo.precio}`;
  regalo.innerText = "Es para regalo";
  eliminar.dataset.eliminar = `${todo.id}`;
  eliminar.innerText = "Eliminar";

  finalizar.append(img);
  contenedor.append(h2);
  contenedor.append(h3);
  contenedor.append(check);
  contenedor.append(regalo);
  contenedor.append(eliminar);

  finalizar.append(contenedor);

  divCarrito.append(finalizar);

  eliminar.addEventListener('click',()=>{
    for (let i = todo.length - 1; i > -1; i--){
      if (todo[i].id == id){
        todo.splice(i,1);
        console.log(`Se elimino el elemento del carrito con índice ${i}`);
      }
    }
  });
}
