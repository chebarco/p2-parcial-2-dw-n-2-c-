/*
En este archivo se definen las constantes, variables, arrays, clases y/u objetos que van a utilizarse para el funcionamiento la página web.
En el caso del Array carrito se creó también una función mediante prototipado para devolver el total de precio de los artículos del carrito.
Seguiamente de los variables que almacenan elementos del documentos (etiquetas HTML) se crearon eventos de escucha para los elementos principalmente de tipo botón.
Todas las declaraciones están definidas en el mismo orden en que aparecen en el documento HTML.
*/


// Esta es la constante productos con información de todos los productos que se van a poder seleccionar para incluir en el array carrito.
const productos = [
    {
      id: 1,
      nombre: "Casco",
      categoria: "accesorios",
      descripcion: "Casco Ciclismo",
      precio: 17500,
      image: "./imagenes/accesorio-casco.png",
    },
    {
      id: 2,
      nombre: "Lentes",
      categoria: "accesorios",
      descripcion: "Lentes Ciclismo",
      precio: 25000,
      image: "./imagenes/accesorio-lentes.png",
    },
    {
      id: 3,
      nombre: "Guantes",
      categoria: "accesorios",
      descripcion: "Guantes Ciclismo ",
      precio: 7500,
      image: "./imagenes/accesorio-guantes.png",
    },
    {
      id: 4,
      nombre: "Gravel",
      categoria: "ruta",
      descripcion: "Bicicleta Ruta Ciclismo",
      precio: 230000,
      image: "./imagenes/biciruta-1.png",
    },
    {
      id: 5,
      nombre: "Triatlón",
      categoria: "ruta",
      descripcion: "Bicicleta Ruta Ciclismo",
      precio: 500000,
      image: "./imagenes/biciruta-2.png",
    },
    {
      id: 6,
      nombre: "Bicicleta Ruta",
      categoria: "ruta",
      descripcion: "Bicicleta Ruta Ciclismo",
      precio: 800000,
      image: "./imagenes/biciruta-3.png",
    },
    {
      id: 7,
      nombre: "Calzas",
      categoria: "indumentaria",
      descripcion: "Calzas Ciclismo",
      precio: 8500,
      image: "./imagenes/indumentaria-calzas.png",
    },
    {
      id: 8,
      nombre: "Jersey",
      categoria: "indumentaria",
      descripcion: "Jersey Ciclismo Profesioanl",
      precio: 9500,
      image: "./imagenes/indumentaria-jersey.png",
    },
    {
      id: 9,
      nombre: "Zapatillas",
      categoria: "indumentaria",
      descripcion: "Zapatillas Ciclismo",
      precio: 25000,
      image: "./imagenes/indumentaria-zapatillas.png",
    },
    {
      id: 10,
      nombre: "Specialized Doble",
      categoria: "montana",
      descripcion: "Bicicleta MTB Ciclismo",
      precio: 1000000,
      image: "./imagenes/mtb-1.png",
    },
    {
      id: 11,
      nombre: "Special Epic",
      categoria: "montana",
      descripcion: "Bicicleta MTB Ciclismo",
      precio: 2000000,
      image: "./imagenes/mtb2.png",
    },
    {
      id: 12,
      nombre: "Special Epic 2020",
      categoria: "montana",
      descripcion: "Bicicleta MTB Ciclismo",
      precio: 1500000,
      image: "./imagenes/mtb3.png",
    },
];


// Esta es la clase Carrito con los datos que va a tener cada elemento que contenga el array carrito declarado más abajo.
class Carrito {
  #id;
  #nombre;
  #precio;
  #imagen;
  constructor(id, nombre, precio, imagen) {
    this.#id = id;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#imagen = imagen;
  }
  /**
   * @param {any} nombre
   */
  set setNombre(nombre) {
    this.#nombre = nombre;
  }
  get getNombre() {
    return this.#nombre;
  }
  /**
   * @param {any} precio
   */
  set setPrecio(precio) {
    this.#precio = precio;
  }
  get getPrecio() {
    return this.#precio;
  }
  /**
   * @param {any} imagen
   */
  set setImagen(imagen) {
    this.#imagen = imagen;
  }
  get getImagen() {
    return this.#imagen;
  }
  /**
   * @param {any} id
   */
  set setId(id) {
    this.#id = id;
  }
  get getId() {
    return this.#id;
  }
  toJSON() {
    return {
      nombre: this.#nombre,
      precio: this.#precio,
      imagen: this.#imagen,
    };
  }
}


// Este es el array que almacena los productos del carrito y se define un prototipado para obtener el total de los productos que hay en él.
var carrito = [];
/* Se agrega una función mediante prototipado */
Array.prototype.getTotal = function(){
  let precioTotal = 0;
  if (carrito) {
    for (valor of carrito){
      precioTotal += valor.precio;
    }
  }
  return precioTotal;
}


/* Declaración de Variables que almacenan elemntos del documento y definición de Eventos para las que lo requieran */


// El array que almacena los botones de filtro en el HTML
var filterBtns = document.querySelectorAll(".filtro-btn");
// Agrego un evento de escucha a cada botón de filtro
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    console.log(e.currentTarget.dataset.categoria);
    // guardo en una variable la categoría clickeada
    let category = e.currentTarget.dataset.categoria;
    // aplico filter a productos
    let productoCategory = productos.filter(function (productoItem) {
      // defino el filtro
      if (productoItem.categoria === category) {
        // returno el producto
        return productoItem;
      }
    });

    // condicional para impresión
    if (category === "todos") {
      //limpia pantalla y pinta todos los productos
      cardProductos.innerHTML = "";

      crearFichas(productos);
    } else {
      //limpia pantalla
      cardProductos.innerHTML = "";
      // pinta producto sólo de la categoría
      crearFichas(productoCategory);

      //pintar producto de cada categoria
    }
  });
});


// El botón HTML con id="verCarrito" del DOM que ejecuta la visualización de la ventana modal al hacer click
const verCarrito = document.getElementById("verCarrito");
// Acá cuando llamo al evento cliquear en el icono carrito me muestra la info
verCarrito.addEventListener("click", () => {
  /* Se llama a la función que actualiza la información del carrito */
  actualizarDatosCarrito();
  /* Se crea el botón que borra la información del carrito */
  let borrar = document.getElementById("vaciar-carrito");
  /* Se crea el evento del botón borrar carrito */
  borrar.addEventListener("click", (e) => {
    /* Vacio el carrito */
    carrito = [];
    /* Limpio el localStorage */
    localStorage.clear();
    actualizarDatosCarrito();
  });
});


// La etiqueta <span> con id="contadorCarrito" que se encuentra dentro del botón para Ver el Carrito
let contador = document.getElementById("contadorCarrito");


// La etiqueta <div> con id="carrito-contenedor" del DOM en el que se van a visualizar los productos agregados al array carrito
const carritoContenedor = document.getElementById("carrito-contenedor");

// La etiqueta <div> con id="idPrecioTotal" del DOM en el que se van a visualizar el precio total de los productos del carrito
const precioTotal = document.getElementById("idPrecioTotal");


// La etiqueta <div> con id="productosCard" del DOM en el que se construyen las fichas de los productos
const cardProductos = document.getElementById("productosCard");


/*
Acá está el Local Storage en el que se guarda todito del carrito
Al cargar la página en caso de exister el item carrito en el local storage, se carga esa información en el array carrito y se actualizan los datos del mismo en la página, de lo constrario el array queda vacío tal como se lo declaró en el archivo global.js
*/
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  };
  actualizarDatosCarrito();
});





