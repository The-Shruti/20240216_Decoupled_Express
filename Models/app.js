const express = require("express")  
const app = express(); 
const port = 5000;
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shrutishrivastav938:Y384d7Yy4JqhXw6e@cluster0.iqvdkac.mongodb.net/?retryWrites=true&w=majority");

const Products = require("./userModels").Products; 
const Orders = require('./userModels').Orders; 
const Checkout = require('./userModels').Checkout;

/*async function insert() {
    await Products.create({ 
        p_id: 5, 
        p_name: 'Product5', 
        p_desc: 'Consumer Products', 
        p_price: 200, 
        p_stock: 50, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
    });
} 
insert();*/


// Route to fetch all products
app.get('/products', async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Products.find();

    // Send the fetched products as a JSON response
    res.json(allProducts);
  } catch (error) {
    // If there's an error while fetching products, return a 500 error
    res.status(500).json({ error: error.message });
  }
}); 


// Route to fetch data of a particular product by ID
app.get('/products/:id', async (req, res) => {
  try {
    let productId = req.params.id; // Extract product ID from URL parameter

    // If product ID is not provided in URL parameter, check query parameter
    if (!productId && req.query.id) {
      productId = req.query.id;
    }

    // Check if the 'id' parameter is provided
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Find the product in the database with the specified ID
    const product = await Products.findOne({ p_id: productId });

    // If product is found, return it. Otherwise, return 404 error.
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // If there's an error while querying the database, return a 500 error
    res.status(500).json({ error: error.message });
  }
});   


// Route to fetch data of a particular product by name
app.get('/products/name/:productName', async (req, res) => {
  try {
    const productName = req.params.productName;

    // Find the product in the database with the specified name
    const product = await Products.findOne({ p_name: productName });

    // If product is found, return it. Otherwise, return 404 error.
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // If there's an error while querying the database, return a 500 error
    res.status(500).json({ error: error.message });
  }
});

// Import the body-parser middleware to parse request bodies
const bodyParser = require('body-parser');

// Parse JSON bodies
app.use(bodyParser.json());

// Route to add a new product using POST method
app.post('/products', async (req, res) => {
  // Extract product details from the request body
  const { p_id, p_name, p_desc, p_price, p_stock, p_image } = req.body;

  try {
    // Create a new product instance
    const newProduct = new Products({
      p_id,
      p_name,
      p_desc,
      p_price,
      p_stock,
      p_image
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Send the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error) {
    // If there's an error, send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
});


// Route to update a product using PUT method
app.put('/products/:id', async (req, res) => {
  // Extract product ID from the URL parameter
  const productId = req.params.id;

  // Extract updated product details from the request body
  const { p_name, p_desc, p_price, p_stock, p_image } = req.body;

  try {
    // Find the product by ID in the database
    const product = await Products.findOne({ p_id: productId });

    if (!product) {
      // If product not found, return 404 error
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product details
    product.p_name = p_name;
    product.p_desc = p_desc;
    product.p_price = p_price;
    product.p_stock = p_stock;
    product.p_image = p_image;

    // Save the updated product to the database
    const updatedProduct = await product.save();

    // Send the updated product as the response
    res.json(updatedProduct);
  } catch (error) {
    // If there's an error, send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
});


// Route to delete a particular product by ID using DELETE method
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameters

    try {
        // Find the product by ID and delete it from the database
        const deletedProduct = await Products.findOneAndDelete({ p_id: productId });

        if (deletedProduct) {
            res.status(204).send(); // Send a 204 No Content response
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Parse JSON bodies
app.use(bodyParser.json()); 

// Route to add a product to checkout
app.post('/checkout', async (req, res) => {
  try {
    const { p_id, quantity } = req.body;

    // Check if both ID and quantity are provided in the request body
    if (!p_id || !quantity) {
      return res.status(400).json({ error: 'Both product ID and quantity are required in the request body' });
    }

    // Find the product with the given ID
    const foundProduct = await Products.findOne({ p_id: p_id });

    if (!foundProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the requested quantity is less than or equal to the available stock
    if (quantity > foundProduct.p_stock) {
      return res.status(400).json({ error: 'Requested quantity exceeds available stock' });
    }

    // Create a new item in the checkout
    const newCartItem = new Checkout({
      p_id: p_id,
      quantity: quantity,
      checkout_id: Date.now(), // Generate a checkout ID (can be improved)
      price: foundProduct.p_price * quantity // Calculate price based on product price and quantity
    });

    // Save the new item to the checkout
    await newCartItem.save();

    // Update the stock quantity in the product schema
    foundProduct.p_stock -= quantity;
    await foundProduct.save();

    res.json({ message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  

// Route to retrieve all items from the checkout
app.get('/checkout', async (req, res) => {
  try {
    // Retrieve all items from the Checkout Schema
    const checkoutItems = await Checkout.find();

    // Check if there are no items in the checkout
    if (checkoutItems.length === 0) {
      return res.status(404).json({ message: 'No items found in the checkout' });
    }

    // Send the list of checkout items as a JSON response
    res.json({ checkoutItems: checkoutItems });
  } catch (error) {
    console.error('Error retrieving checkout items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a specific product from the checkout
app.delete('/checkout/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product in the checkout by its ID and delete it
    const deletedProduct = await Checkout.findOneAndDelete({ p_id: productId });

    // Check if the product was found and deleted successfully
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found in checkout' });
    }

    // Update the stock quantity in the Products Schema
    const foundProduct = await Products.findOne({ p_id: deletedProduct.p_id });
    if (foundProduct) {
      foundProduct.p_stock += deletedProduct.quantity; // Increment stock by the quantity of the deleted product
      await foundProduct.save();
    }

    res.json({ message: 'Product removed from checkout successfully' });
  } catch (error) {
    console.error('Error deleting product from checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to place all products from checkout into Orders Schema

app.post('/place-order', async (req, res) => {
  try {
    const { o_id, o_address, o_status } = req.body;

    // Retrieve all items from the Checkout Schema
    const checkoutItems = await Checkout.find();

    // Check if there are items in the checkout
    if (checkoutItems.length === 0) {
      return res.status(400).json({ error: 'No items found in the checkout' });
    }

    // Calculate total cost
    let totalCost = 0;
    for (const item of checkoutItems) {
      totalCost += item.price;
    }

    // Create a new order instance with provided details and calculated total cost
    const newOrder = new Orders({
      o_id: o_id,
      o_date: new Date(), // Use current date if o_date is not provided
      o_address: o_address,
      o_status: o_status || 'pending', // Default status to 'pending' if not provided
      o_p_id: checkoutItems.map(item => item.p_id),
      o_totalcost: totalCost
    });

    // Save the order to the Orders Schema
    const savedOrder = await newOrder.save();

    // Remove all items from the Checkout Schema
    await Checkout.deleteMany();

    res.json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to retrieve all orders
app.get('/orders', async (req, res) => {
  try {
    // Retrieve all orders from the Orders Schema
    const orders = await Orders.find();

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


// Define PUT endpoint for updating order status
app.put('/orders/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.o_status;

  try {
      // Find the order by ID and update its status
      const updatedOrder = await Orders.findOneAndUpdate(
          { o_id: orderId },
          { o_status: newStatus },
          { new: true } // Return the updated order
      );

      // Check if the order exists
      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Return the updated order
      return res.json(updatedOrder);
  } catch (error) {
      console.error('Error updating order status:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});