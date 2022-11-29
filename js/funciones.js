
function totalCarrito(){
  let total = 0;
  for (valor of carrito){
    total += valor.precio;
  }
  return total;
}

/* Creo las cards en el DOM  mediante una función que quizás parezca simple pero hace mucha magia :-D */
function crearFichas(datos) {
  cardProductos.innerHTML = "";

  datos.forEach((producto) => {
    // Se crean las variables
    let contenido = document.createElement("div");
    let imagen = document.createElement("img");
    let titulo = document.createElement("h2");
    let cateP = document.createElement("p");
    let desP = document.createElement("p");
    let preciop = document.createElement("p");
    let span = document.createElement("span");
    span.className = "hidden";

    // Se crean las clases por cada etiqueta creada arriba
    contenido.className = "card-body";
    imagen.className = "card-img-top";
    titulo.className = "card-title";
    cateP.className = "card-text";
    desP.className = "card-text";

    // Acá viene la magia mi ciela y mi cielo (Defino el contenido de las etiquetas creadas)
    titulo.innerText = producto.nombre;
    cateP.innerText = producto.categoria;
    desP.innerText = producto.descripcion;
    preciop.innerText = `$ ${producto.precio}`;
    imagen.setAttribute("src", `${producto.image}`);

    // Acá creo el botón de Agregar a carrito y defino el evento
    let botonComprar = document.createElement("button");
    botonComprar.innerText = "Agregar al Carrito";
    botonComprar.className = "btn-boton";
    botonComprar.addEventListener("click", () => {
      span.innerText = "Un nuevo producto en el carrito";
      setTimeout(function () {
        span.style.visibility = "hidden";
      }, 1000);

      carrito.push({
        id: producto.id,
        imagen: producto.image,
        nombre: producto.nombre,
        precio: producto.precio,
      });
      document.getElementById("contadorCarrito").innerText = carrito.length;
      console.log(carrito);
    });

    contenido.append(imagen);
    contenido.append(titulo);
    contenido.append(cateP);
    contenido.append(desP);
    contenido.append(preciop);
    contenido.append(botonComprar);
    contenido.append(span);

    cardProductos.append(contenido);
  });
}

/* Esta función actualiza los datos del carrito, tanto los productos como la información de cantidad de productos y precio total y genera las etiquetas en la ventana modal para visualizar esta información */
function actualizarDatosCarrito(){
  carritoContenedor.innerHTML = '';
  carrito.forEach((elemento) => {
    let index = carrito.indexOf(elemento);
    let cantidad = document.getElementById(`${elemento.id}`);
    if (cantidad){
      cantidad.innerText++;
    } else {
      let carritoContenido = document.createElement("div");
      let carritoProducto = document.createElement("h2");
      let carritoPrecio = document.createElement("p");
      let carritoImg = document.createElement("img");
      let contenedorbtn = document.createElement('div');

      let carritoElementos = document.createElement("p");
      let carritoCantidad = document.createElement("span");
      carritoCantidad.setAttribute('id',`${elemento.id}`);
      carritoContenido.className = "card-body";
      carritoContenido.className = "modal-container";
  
      carritoProducto.innerText = elemento.nombre;
      carritoElementos.innerText = "Cantidad de ítems: ";
      carritoCantidad.innerText = 1
      carritoPrecio.innerText = `$${elemento.precio}`;
      carritoImg.setAttribute("src", `${elemento.imagen}`);
  
      let button_ins = document.createElement('button');
      button_ins.innerText = '+';
      button_ins.dataset.insertar = `${index}`;
      let button_del = document.createElement('button');
      button_del.innerText = '-';
      button_del.dataset.borrar = `${index}`;
      button_del.dataset.iddel = `${elemento.id}`;
      let btn_remove = document.createElement('button');
      btn_remove.dataset.eliminar = `${elemento.id}`;
      btn_remove.innerText = 'Eliminar';
      contenedorbtn.append(button_del);
      contenedorbtn.append(button_ins);
      contenedorbtn.append(btn_remove);

      button_del.addEventListener('click',(e)=>{
        console.log('Quitar Elemento');
        quitarElemento(e.target.dataset.iddel);
      });

      button_ins.addEventListener('click',(e)=>{
        console.log('Agregar Elemento');
        agregarElemento(e.target.dataset.insertar);
      });

      btn_remove.addEventListener('click',(e)=>{
        console.log('Eliminar Elementos');
        eliminarElementos(e.target.dataset.eliminar);
      });

      carritoElementos.append(carritoCantidad);
      carritoContenido.append(carritoImg);
      carritoContenido.append(carritoProducto);
      carritoContenido.append(carritoPrecio);
      carritoContenido.append(carritoElementos);
      carritoContenido.append(contenedorbtn);
  
      carritoContenedor.append(carritoContenido);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  });
  precioTotal.innerText = carrito.getTotal();
  contador.innerText = carrito.length;
}

function quitarElemento(id){
  let idcantidad = document.getElementById(`${id}`);
  if (idcantidad && (idcantidad.innerText > 1)){
    idcantidad.innerText--;
    contador.innerText--;
    for(let i = carrito.length-1; i > -1; i--){
      if(carrito[i].id == id){
        carrito.splice(i,1);
        precioTotal.innerText = carrito.getTotal();
        break;
      }
    }  
  }
  /* actualizarDatosCarrito(); */
}

function agregarElemento(i){
  carrito.push(carrito[i]);
  document.getElementById(`${carrito[i].id}`).innerText++;
  contador.innerText++;
  precioTotal.innerText = carrito.getTotal();
  /* actualizarDatosCarrito(); */
}

function eliminarElementos(id){
  for (let i = carrito.length - 1; i > -1; i--){
    if (carrito[i].id == id){
      carrito.splice(i,1);
      console.log(`Se elimino el elemento del carrito con índice ${i}`);
    }
  }
  actualizarDatosCarrito();
}


crearFichas(productos);
