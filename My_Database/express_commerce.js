const fs = require('fs');
const path = require('path');

// File paths
const productsFilePath = './products.json';
const ordersFilePath = './orders.json'; 
const checkoutFilePath = './checkout.json';

// Create initial products and orders files if they don't exist
if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, '[]');
}

if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, '[]');
}

/**
 * Function to append an object to a JSON file synchronously.
 * @param {string} filePath - The path to the JSON file.
 * @param {Object} objectData - The object to append.
 */
function appendObjectToJSONFileSync(filePath, objectData) {
    try {
        let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Check if the file content is an array
        if (!Array.isArray(jsonData)) {
            jsonData = [];
        }

        // Append the object to the array
        jsonData.push(objectData);

        // Write the updated data back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        console.log('Order Placed Successfully.');
    } catch (err) {
        console.error('Error appending object to JSON file:', err);
    }
} 

// Create initial checkout file if it doesn't exist
if (!fs.existsSync(checkoutFilePath)) {
    fs.writeFileSync(checkoutFilePath, '[]');
}

/**
 * Function to append an object to a JSON file synchronously.
 * @param {string} filePath - The path to the JSON file.
 * @param {Object} objectData - The object to append.
 */
function appendObjectToJSONFileSync(filePath, objectData) {
    try {
        let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Check if the file content is an array
        if (!Array.isArray(jsonData)) {
            jsonData = [];
        }

        // Append the object to the array
        jsonData.push(objectData);

        // Write the updated data back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        console.log('Object appended to JSON file successfully.');
    } catch (err) {
        console.error('Error appending object to JSON file:', err);
    }
}

// Usage example:
const newCheckoutItem = {};

// Append a new checkout item to the checkout JSON file
appendObjectToJSONFileSync(checkoutFilePath, newCheckoutItem);

// Usage example:
const newProduct1 = {
        p_id: 1, 
        p_name: 'Product1', 
        p_desc: 'Beauty Products', 
        p_price: 100, 
        p_stock: 13, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
}; 

const newProduct2 = {
        p_id: 2, 
        p_name: 'Product2', 
        p_desc: 'Hair Cream', 
        p_price: 150, 
        p_stock: 20, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
};

const newProduct3 = {
    p_id: 3, 
    p_name: 'Product3', 
    p_desc: 'Hair Cream', 
    p_price: 70, 
    p_stock: 39, 
    p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
}; 

const newProduct4 = {
        p_id: 4, 
        p_name: 'Product4', 
        p_desc: 'Food Products', 
        p_price: 100, 
        p_stock: 10, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
}; 

const newProduct5 = {
    p_id: 5, 
        p_name: 'Product5', 
        p_desc: 'Consumer Products', 
        p_price: 200, 
        p_stock: 50, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
}; 
const newProduct6 = {
        p_id: 6, 
        p_name: 'Product6', 
        p_desc: 'Harmful Products', 
        p_price: 180, 
        p_stock: 10, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
};  

const newProduct7 = {
        p_id: 7, 
        p_name: 'Product7', 
        p_desc: 'Edible Oil Products', 
        p_price: 100, 
        p_stock: 15, 
        p_image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakini-group.com%2Fwp-content%2Fuploads%2F2018%2F05%2FMakini-Group-Consumer-Products-1024x284.png&tbnid=qs_F_wEtBMFr3M&vet=12ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ..i&imgrefurl=https%3A%2F%2Fmakini-group.com%2Findustries%2Fconsumer-products%2F&docid=_RNl0XwTrjRL5M&w=1024&h=284&q=products&ved=2ahUKEwjqj7mXq7KEAxW0smMGHS_vDyYQMygMegUIARCGAQ',
}; 

const newOrder = {};

// Append new product and order to their respective files
//appendObjectToJSONFileSync(productsFilePath, newProduct);
appendObjectToJSONFileSync(ordersFilePath, newOrder);

