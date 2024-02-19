const mongoose = require('mongoose'); 

// Define ProductsSchema
const ProductsSchema = new mongoose.Schema({ 
   p_id: Number, 
    p_name: String, 
    p_desc: String, 
    p_price: Number, 
    p_stock: Number, 
    p_image: String 
});  

// Define OrdersSchema
const OrdersSchema = new mongoose.Schema({
    o_id: Number,
    o_date: Date,
    o_address: String,
    o_status: String,
    o_totalcost: Number 
}); 


//Define CheckoutSchema
const CheckoutSchema = new mongoose.Schema({
  p_id: Number,
  quantity:Number,
  checkout_id: Number,
  price: Number
});

// Export schemas
const Products = mongoose.model('Products', ProductsSchema);
const Orders = mongoose.model('Orders', OrdersSchema);
const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = { Products,Orders,Checkout };