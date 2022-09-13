let stockProductos = [
    {id: 1, nombre: "Kit-Razer", tipo: "Auriculares", cantidad: 1, desc: "Producto Razer", precio: 12000, img: './images/Razer.jfif'},
    {id: 2, nombre: "Kit-Logitech", tipo: "Auriculares", cantidad: 1, desc: "Producto Logitech", precio: 9000,  img: './images/Logitech.jfif'},
    {id: 3, nombre: "Kit-HyperX", tipo: "Auriculares", cantidad: 1, desc: "Producto HyperX", precio: 8000,  img: './images/HyperX.jfif'},
    {id: 4, nombre: "Kit-Red dragon", tipo: "Auriculares", cantidad: 1, desc: "Producto Red-dragon", precio: 5000, img: './images/Reddragon.jfif'},
  ]
  
  // Desestructuracion de array
  const [a, b, c, d] = stockProductos
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)
  
  // SPREAD ARRAY
  const kitsNuevos = [
    {id:"Kit-MSI",product: 'MSI',price: 7000 ,quantity: 1,}, 
    {id:"Kit-NOGANET",product: 'Logitech',price: 5000,quantity: 1,},
    {id:"Kit-COUGAR",product: 'HyperX',price: 10000,quantity: 1,},
  ];
  const kits1 = [...stockProductos, ...kitsNuevos]
  console.log(kits1)
  
  
  // ARRAY ALMACENADO
  const localSave = (product, price) => { localStorage.setItem(product, price)}
  localSave("kits", JSON.stringify(stockProductos))
  
  // FETCH // MOCKAPI
  function registrarProducto (producto) {
    fetch("https://62e859f7249bb1284ead6466.mockapi.io/kits",{
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  }
  
  const productoAResgistrar = [
    {
      "product": "Razer",
      "price": 12000,
      "quantity": 1,
      "id": "1"
    },
    {
      "product": "Logitech",
      "price": 9000,
      "quantity": 1,
      "id": "2"
    },
    {
      "product": "HyperX",
      "price": 8000,
      "quantity": 1,
      "id": "3"
    },
    {
      "product": "Red-dragon",
      "price": 5000,
      "quantity": 1,
      "id": "4"
    },
    {
      "product": "Msi",
      "price": 8000,
      "quantity": 1,
      "id": "5"
    },
    {
      "product": "Noganet",
      "price": 5000,
      "quantity": 1,
      "id": "6"
    },
    {
      "product": "Cougar",
      "price": 10000,
      "quantity": 1,
      "id": "7"
    }
  ]
  registrarProducto(productoAResgistrar)


const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

/*
// no funciona
const filtroProducto = document.getElementById('filtroProducto');
    
window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
closeModal.addEventListener('click',()=> modal.style.display = 'none');
filtroProducto.addEventListener('change', filterProducts);
function filterProducts(event) {
    const responseFilter = event.target.value === 'Menores a 8000'
    ? kits.filter( kit => kit.price < 8000)
    : event.target.value === 'Entre 5000 y 10000'
    ? kits.filter( kit => kit.price >= 5000 && kit.price <= 10000)
    : event.target.value === 'Mayores a 8000'
    ? kits.filter( kit => kit.price > 8000)
    : null;
  
    containerCards.innerHTML = 'filtroProducto';
    responseFilter.map( kit => createCards(kit));
  }*/

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        carritoActualizado()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    carritoActualizado()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

   
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        //
    })
})




const agregarAlCarrito = (prodId) => {

    
    const validez = carrito.some (prod => prod.id === prodId) 

    if (validez){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    carritoActualizado() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    carritoActualizado() 
    console.log(carrito)
}

const carritoActualizado = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}

const btnMostrarAlert = document.getElementById("btn-mostrar-alert");
btnMostrarAlert.onclick = mostrarAlert();

  function mostrarAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Trabajo final terminado',
      showConfirmButton: false,
      timer: 1500
    })

  }