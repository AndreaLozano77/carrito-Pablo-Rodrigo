
window.onload = function() {
    //variables
    let baseDeDatos = [
        {
            id: 1111,
            nombre:'Hamburguesa sencilla',
            precio: 8000.00,
            imagen: "img/hamburger1.jpeg"
        },
        {
            id: 2222,
            nombre:'Hamburguesa doble',
            precio: 12000.00,
            imagen: "img/hamburguer3.jpeg"
        },
        {
            id: 3333,
            nombre:'Papas fritas',
            precio: 5000.00,
            imagen: "img/francesas2.jpeg"
        },
        {
            id: 4444,
            nombre:'Cocacola',
            precio: 3000.00,
            imagen: "img/gaseosa1.jpeg"
        }
    ]

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');

    //Funciones

    function renderItems() {
        for (let info of baseDeDatos) {
            //Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-6');
            //Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            //Título
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            //Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            //Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info['precio'] + '$';
            //Botón
            miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            //Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito() {
        //Añadimos el nodo a nuestro carrito
        carrito.push(+this.getAttribute('marcador'));
       
    
        //calcular el total
        calcularTotal();
            //renderizamos el carrito
        renderizarCarrito();
        
    }
    function renderizarCarrito() {
        //vaciar todo el html
        $carrito.textContent = '';
        //quitar los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];

        // generar los nodos a partir de carrito
        carritoSinDuplicados.forEach(function(item, indice) {
            //Obtenemos el item que necesitamos de la variable baseDeDatos


            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos["id"] == item;
            });
            
            //Cuenta el número de veces que se repite el producto

             let numeroUnidadesItem = carrito.reduce(function(total, itemId) {
               if (itemId === item){

                    return total+1;
                }
                else{
                    return total;
                }

            },0);

            
            //crear el nodo del item del carrito
            
            //let numeroUnidadesItem = carrito.reduce(reducer);
            
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            
            miNodo.textContent = `${numeroUnidadesItem} X ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            //Botón de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-3');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // incluimos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }
    function borrarItemCarrito() {
        //Obtenemos el producto ID que hay en el botón pulsado
        let id = this.getAttribute('item');
        //Borramos todos os productos
       
       
        let  filtroCarrito = carrito.filter(carritoId => 
            carritoId == id );
            filtroCarrito.shift();

            let  carritoAuxiliar = carrito.filter(carritoId => 
                carritoId != id );

            filtroCarrito.forEach(valor=> {
                carritoAuxiliar.push(valor);
            });

            carrito=carritoAuxiliar

     /*   let  carrito1 = carrito.filter(carritoId => 
        carritoId != id );
        carrito=carrito1*/
        //volvemos a renderizar
        renderizarCarrito();
        //calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        //limpiamos precio anterior
        total = 0;
        //recorremos el array del carrito
        for (let item of carrito) {
            //de cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        //formateamos el total para que solo tenga 2 decimales
        let totalDosDecimales = total.toFixed(2);
        //renderizamos el precio en el html
        $total.textContent = totalDosDecimales;
    }
    //Eventos
    
    //Inicio
    renderItems();

}















