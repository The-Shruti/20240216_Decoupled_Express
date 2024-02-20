var express = require('express'); 
const bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs'); 
//const express_commerce = require('./express_commerce.js')


// Serve static files from the 'public' directory
app.use(express.static('public'));

// File path for products JSON file
const productsFilePath = path.join(__dirname, 'products.json');  


// Load products from JSON file
var products = JSON.parse(fs.readFileSync('products.json'));
app.get('/products', (req, res) => {
    try {
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        const allProducts = JSON.parse(data);
        
        // Send the fetched products as a JSON response
        res.json(allProducts);
      });
    } catch (error) {
      // If there's an error while fetching products, return a 500 error
      res.status(500).json({ error: error.message });
    }
  });
  


 

// Route to fetch data of a particular product by ID using query parameters
app.get('/products/:id', (req, res) => {
    try {
      const productId = parseInt(req.params.id);
  
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
  
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        const allProducts = JSON.parse(data);
        
        // Find the product with the specified ID
        const product = allProducts.find(product => product.p_id === productId);
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
  
        // Send the product as a JSON response
        res.json(product);
      });
    } catch (error) {
      // If there's an error while fetching the product, return a 500 error
      res.status(500).json({ error: error.message });
    }
  }); 

// Route to fetch data of a particular product by name
app.get('/products/name/:productName', (req, res) => {
    try {
      const productName = req.params.productName;
  
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        const allProducts = JSON.parse(data);
        
        // Find the product with the specified name
        const product = allProducts.find(product => product.p_name === productName);
        
        if (product) {
          // If product is found, return it
          res.json(product);
        } else {
          // If product is not found, return 404 error
          res.status(404).json({ error: 'Product not found' });
        }
      });
    } catch (error) {
      // If there's an error while querying the database, return a 500 error
      res.status(500).json({ error: error.message });
    }
  }); 

// Route to add a new product using POST method 
app.use(bodyParser.json());
app.post('/products', (req, res) => {
    // Extract product details from the request body
    const { p_id, p_name, p_desc, p_price, p_stock, p_image } = req.body;
  
    try {
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        const allProducts = JSON.parse(data);
  
        // Create a new product object
        const newProduct = {
          p_id,
          p_name,
          p_desc,
          p_price,
          p_stock,
          p_image
        };
  
        // Add the new product to the array of products
        allProducts.push(newProduct);
  
        // Write the updated array back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(allProducts, null, 2), (err) => {
          if (err) {
            // If there's an error writing the file, return a 500 error
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          
          // Send the saved product as the response
          res.status(201).json(newProduct);
        });
      });
    } catch (error) {
      // If there's an error, send a 500 response with the error message
      res.status(500).json({ error: error.message });
    }
  }); 

// Route to update a product using PUT method
app.put('/products/:id', (req, res) => {
    // Extract product ID from the URL parameter
    const productId = parseInt(req.params.id);
  
    // Extract updated product details from the request body
    const { p_name, p_desc, p_price, p_stock, p_image } = req.body;
  
    try {
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        const allProducts = JSON.parse(data);
        
        // Find the index of the product with the specified ID
        const productIndex = allProducts.findIndex(product => product.p_id === productId);
        
        if (productIndex === -1) {
          // If product not found, return 404 error
          return res.status(404).json({ error: 'Product not found' });
        }
  
        // Update product details
        allProducts[productIndex].p_name = p_name;
        allProducts[productIndex].p_desc = p_desc;
        allProducts[productIndex].p_price = p_price;
        allProducts[productIndex].p_stock = p_stock;
        allProducts[productIndex].p_image = p_image;
  
        // Write the updated products data back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(allProducts, null, 2), (err) => {
          if (err) {
            // If there's an error writing the file, return a 500 error
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          // Send the updated product as the response
          res.json(allProducts[productIndex]);
        });
      });
    } catch (error) {
      // If there's an error, send a 500 response with the error message
      res.status(500).json({ error: error.message });
    }
  }); 

// Route to delete a particular product by ID using DELETE method
app.delete('/products/:id', (req, res) => {
    // Get the product ID from the URL parameters
    const productId = parseInt(req.params.id);
  
    try {
      // Read products data from the JSON file
      fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
          // If there's an error reading the file, return a 500 error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Parse the JSON data into an array of products
        let allProducts = JSON.parse(data);
        
        // Find the index of the product with the specified ID
        const productIndex = allProducts.findIndex(product => product.p_id === productId);
        
        if (productIndex === -1) {
          // If product not found, return 404 error
          return res.status(404).json({ error: 'Product not found' });
        }
  
        // Remove the product with the specified ID from the array
        allProducts.splice(productIndex, 1);
  
        // Write the updated products data back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(allProducts, null, 2), (err) => {
          if (err) {
            // If there's an error writing the file, return a 500 error
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          // Send a 204 No Content response
          res.status(204).send();
        });
      });
    } catch (error) {
      // If there's an error, send a 500 response with the error message
      res.status(500).json({ error: error.message });
    }
  }); 


// Route to add a product to checkout 
const checkoutFilePath = './checkout.json'; 
// Function to read JSON file
function readJSONFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Function to write JSON file
function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Route to add a product to checkout
app.post('/checkout', async (req, res) => {
    try {
        const { p_id, quantity } = req.body;

        // Check if both ID and quantity are provided in the request body
        if (!p_id || !quantity) {
            return res.status(400).json({ error: 'Both product ID and quantity are required in the request body' });
        }

        // Read existing checkout data from the file
        let checkoutData = readJSONFile(checkoutFilePath);

        // Find the product with the given ID
        let productsData = readJSONFile(productsFilePath);
        const foundProductIndex = productsData.findIndex(product => product.p_id === p_id);

        if (foundProductIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the requested quantity is less than or equal to the available stock
        if (quantity > productsData[foundProductIndex].p_stock) {
            return res.status(400).json({ error: 'Requested quantity exceeds available stock' });
        }

        // Create a new item in the checkout
        const newCartItem = {
            p_id: p_id,
            quantity: quantity,
            checkout_id: Date.now(), // Generate a checkout ID (can be improved)
            price: productsData[foundProductIndex].p_price * quantity // Calculate price based on product price and quantity
        };

        // Append the new item to the checkout data
        checkoutData.push(newCartItem);

        // Update the stock quantity in the products data
        productsData[foundProductIndex].p_stock -= quantity;

        // Write the updated checkout and products data back to the files
        writeJSONFile(checkoutFilePath, checkoutData);
        writeJSONFile(productsFilePath, productsData);

        res.json({ message: 'Item added to the cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Route to retrieve all items from the checkout
app.get('/checkout', async (req, res) => {
    try {
        // Read checkout data from the file
        const checkoutData = readJSONFile(checkoutFilePath);

        // Check if there are no items in the checkout
        if (checkoutData.length === 0) {
            return res.status(404).json({ message: 'No items found in the checkout' });
        }

        // Send the list of checkout items as a JSON response
        res.json({ checkoutItems: checkoutData });
    } catch (error) {
        console.error('Error retrieving checkout items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a specific product from the checkout
app.delete('/checkout/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id); // Convert id to integer

        // Read checkout data from the file
        let checkoutData = readJSONFile(checkoutFilePath);

        // Find the index of the product in the checkout by its ID
        const productIndex = checkoutData.findIndex(item => item.p_id === productId);

        // Check if the product exists in the checkout
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in checkout' });
        }

        // Remove the product from the checkout
        const deletedProduct = checkoutData.splice(productIndex, 1)[0];

        // Update the stock quantity in the Products Schema
        const foundProductIndex = products.findIndex(product => product.p_id === deletedProduct.p_id);
        if (foundProductIndex !== -1) {
            products[foundProductIndex].p_stock += deletedProduct.quantity; // Increment stock by the quantity of the deleted product
            // Write the updated products data back to the file
            writeJSONFile(productsFilePath, products);
        }

        // Write the updated checkout data back to the file
        writeJSONFile(checkoutFilePath, checkoutData);

        res.json({ message: 'Product removed from checkout successfully' });
    } catch (error) {
        console.error('Error deleting product from checkout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Route to place all products from checkout into Orders Schema 
const ordersFilePath = './orders.json';
app.post('/place-order', async (req, res) => {
    try {
        const { o_id, o_date, o_address, o_status } = req.body;

        // Retrieve all items from the Checkout Schema
        let checkoutItems = [];
        if (fs.existsSync(checkoutFilePath)) {
            checkoutItems = readJSONFile(checkoutFilePath);
        }
        
        // Check if there are items in the checkout
        if (checkoutItems.length === 0) {
            return res.status(400).json({ error: 'No items found in the checkout' });
        }

        // Calculate total cost
        let totalCost = 0;
        for (const item of checkoutItems) {
            totalCost += item.price;
        }

        // Create a new order object with provided details and calculated total cost
        const newOrder = {
            o_id: o_id,
            o_date: o_date || new Date(), // Use current date if o_date is not provided
            o_address: o_address,
            o_status: o_status || 'pending', // Default status to 'pending' if not provided
            o_totalcost: totalCost
        };

        // Read existing orders data from the file
        let ordersData = [];
        if (fs.existsSync(ordersFilePath)) {
            ordersData = readJSONFile(ordersFilePath);
        }

        // Append the new order to the orders data
        ordersData.push(newOrder);

        // Write the updated orders data back to the file
        writeJSONFile(ordersFilePath, ordersData);

        // Remove all items from the Checkout Schema
        fs.writeFileSync(checkoutFilePath, '[]');

        res.json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Route to retrieve all orders
app.get('/orders', async (req, res) => {
    try {
        // Retrieve all orders from the Orders Schema
        let orders = [];
        if (fs.existsSync(ordersFilePath)) {
            orders = readJSONFile(ordersFilePath);
        }

        // Check if there are no orders
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Send the list of orders as a JSON response
        res.json({ orders: orders });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});  

// Endpoint to get order status by ID
app.get('/orders/:id/status', (req, res) => {
  const orderId = parseInt(req.params.id); // Convert ID to integer
  fs.readFile('orders.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    try {
      const orders = JSON.parse(data);
      const order = orders.find(order => order.o_id === orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.json({ status: order.o_status });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Read orders from JSON file
let orders = JSON.parse(fs.readFileSync('orders.json', 'utf8')); 

// Define PUT endpoint for updating order status 
app.put('/orders/status', async (req, res) => {
    const orderId = req.query.id;
    const newStatus = req.body.o_status;

    try {
        // Find the order by ID
        const order = orders.find(order => order.o_id === parseInt(orderId));

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the status of the order
        order.o_status = newStatus;

        // Write the updated data back to the file
        fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

        // Return the updated order
        return res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to delete an order by ID
app.delete('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id); // Convert ID to integer

  fs.readFile('orders.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      let orders = JSON.parse(data);
      const orderIndex = orders.findIndex(order => order.o_id === orderId);

      // Check if the order exists
      if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Remove the order from the array
      orders.splice(orderIndex, 1);

      // Write the updated data back to the file
      fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Return a success message
        return res.json({ message: 'Order deleted successfully' });
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Start the server
var server = app.listen(5000, () => {
    console.log("Express App running");
});
