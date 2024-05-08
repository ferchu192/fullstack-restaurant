# Modo de uso
La aplicación comienza en home, donde se listan todos los restaurantes que tiene cargada la app. Solo el primero d la e ellos cuenta con una cantidad necesaria de productos como para ver en funcionamiento el componente de scroll infinito (PaginateScroll).

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/f6112700-f1d6-4cca-b949-45bdb76f91fa)

Una vez lo seleccionamos, veremos una página dedicada a mostrar el menú de ese restaurant. Aquí se listaran todos los productos haciendo uso del (PaginateScroll). Cada uno de ellos se podrá elegir para tomar una orden. Cada vez que cambiemos la orden se mostrará en el icono de Shop.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/893154cd-3c52-4469-835f-0a3be0647f8c)

Una vez tengamos lista nuestra orden, podremos consultarla y tomarla yendo al botón de Shop, veremos desplegarse un menú con el detalle de nuestro pedido y un botón para tomarla.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/4da0e217-b52c-4fb3-a77d-67fdd776ef65)

Finalmente hayamos decido pedir la orden, se creara en base de datos una orden nueva con el detalle del pedido.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/1459fca0-0878-45fa-9d45-2786beac32c6)

# Documentación

Para cumplir con las especificaciones del challenge se definieron las siguientes partes

## API:
Su función es definir los endpoints a los que la app podrá consultar, definir los modelos de base datos, definir la conexión con la base de datos, alojar las imágenes públicas de la app.
Se pensó una app que permitiera extender nuevas funciones, como un panel de administrador para que los restaurantes pudieran cargar sus menús, y otro para que el admin pudiera crear nuevos restaurantes. También se ideó para que pudiera mostrar un historial de órdenes.

## Endpoints:
Se crearon los siguientes endpoints:

### Restaurant
  * POST /create-restaurant: Permite crear un restaurant
  * POST /restaurants: Permite obtener los restaurantes paginados
  * POST /restaurant: Permite obtener el menu paginado de un restaurant
  * PUT /restaurant: Permite editar un restaurant
  * DELETE /restaurant/:id: Permite borrar un restaurant
### Product
  * POST /create-product: Permite crear un producto
  * GET /product/:id: Permite obtener un producto
  * PUT /product: Permite editar un producto
  * DELETE /product/:id: Permite eliminar un producto
### Orden
  * POST /create-order: Permite crear una orden a partir de una lista de products
  * GET /order/:id: Permite obtener una orden con un id dado
  * PUT /order: Permite editar el status de una orden

## Base de datos:
Se definieron la siguientes entidades:
  * restaurant:
  ```
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    menu: [{
      type: Types.ObjectId,
      ref: 'product'
    }],
    image: {
      type: String,
    },
    isNew: {
      type: Boolean,
      default: true
    }
  ```
  * product:
  ```
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number
    },
    type: {
      type: String
    },
    image: {
      type: String
    },
    ingredients: [{
      type: String,
      name: String
    }],
    isVegan: {
      type: Boolean
    },
    isCeliac: {
      type: Boolean
    }
  ```
  * order:
  ```
    products: [
    {
      id: {
        type: Types.ObjectId,
        required: true
      },
      cant: {
        type: Number,
        default: 1
      },
    }],
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['taken', 'cooking', 'done'],
      default: 'taken' // Valor por defecto
    }
  ```


## Frontend
Su función es la de definir la interface gráfica. Dentro de ella se definen las rutas, y vistas de la app.

### Componentes principales

### PagínateScroll
Es el componente encargado de mostrar, en un panel scrollable, los datos paginados. Se diseñó este componente con el objetivo de que fuera re utilizable en el código, es por ello que tiene como parámetro la función refetch. Esta función es la que permite al componente, una vez que llega al fondo del scroll, consultar por la siguiente página de datos. Está consulta se hace un poco antes de llegar al final del scroll, para así hacer el movimiento mucho más suave.

### Shopping
Este componente muestra el estado actual de la orden que se está tomando, mostrando una lista de productos junto con el precio. Cuenta con un botón de “Take Order” para crear la orden con los datos solicitados.
