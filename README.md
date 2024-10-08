# Usage
The application starts on the home page, where all the restaurants loaded in the app are listed. Only the first one of them has a necessary amount of products to see the infinite scroll component (PaginateScroll) in action.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/f6112700-f1d6-4cca-b949-45bdb76f91fa)

Once selected, we will see a page dedicated to displaying the menu of that restaurant. Here, all the products will be listed using the PaginateScroll. Each of them can be chosen to place an order. Every time we change the order, it will be displayed in the Shop icon.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/893154cd-3c52-4469-835f-0a3be0647f8c)

Once our order is ready, we can check it and place it by going to the Shop button, where a menu will be displayed with the details of our order and a button to place it.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/4da0e217-b52c-4fb3-a77d-67fdd776ef65)

Finally, once we have decided to place the order, a new order will be created in the database with the details of the request.

![image](https://github.com/ferchu192/fullstack-restaurant/assets/20408878/1459fca0-0878-45fa-9d45-2786beac32c6)

# Documentation

To meet the specifications of the challenge, the following parts were defined:

## Frontend
Its function is to define the graphical interface. Within it, the routes and views of the app are defined, along with the PaginateScroll component, the main component of the app. For its use, the following libraries were mainly employed:

### Libraries:

    redux-toolkit: To maintain the state of the order (products, quantity, and price).
    styled-components: To style the components.
    axios: For communication with the API.
    react-icons: For the "back" and "shop" icons.

### Main components

### PagínateScroll
This component is responsible for displaying paginated data in a scrollable panel. This component was designed with the aim of being reusable in the code, which is why it has the refetch function as a parameter. This allows any component that requires its use to have infinite scrolling, as long as a pagination function is available. This function is what allows the component, once it reaches the bottom of the scroll, to query for the next page of data. This query is made a little before reaching the end of the scroll, to make the movement much smoother.
An example of its use is on the /home view, where it is used to list the restaurants, and on /home/restaurant/<id> where it is used to list the restaurant's menu.

### Shopping
This component shows the current state of the order being taken, displaying a list of products along with their prices. It has a "Take Order" button to create the order with the requested data. Whenever a new product is added or a product is completely removed, a notification will be shown. The notification counts at the product level, meaning that if the same product is added 4 times, it counts as a single notification. Similarly, if a product is removed, meaning that the quantity of that product in the order is reduced to 0, the notification is not counted.

## API:
Its function is to define the endpoints that the app can query, define the database models, define the connection with the database, and host the app's public images.
An app was designed to allow for the extension of new features, such as an admin panel for restaurants to upload their menus, and another for the admin to create new restaurants. It was also designed to display an order history.

## Endpoints:
The following endpoints were created:

### Restaurant
    POST /create-restaurant: Allows creating a restaurant
    POST /restaurants: Allows fetching paginated restaurants
    POST /restaurant: Allows fetching the menu paginated for a restaurant
    PUT /restaurant: Allows editing a restaurant
    DELETE /restaurant/:id: Allows deleting a restaurant

### Product
    POST /create-product: Allows creating a product
    GET /product/:id: Allows fetching a product
    PUT /product: Allows editing a product
    DELETE /product/:id: Allows deleting a product

### Order
    POST /create-order: Allows creating an order from a list of products
    GET /order/:id: Allows fetching an order with a given ID
    PUT /order: Allows editing the status of an order

## Database:
The following entities were defined:
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
