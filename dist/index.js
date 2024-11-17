"use strict";
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Cart {
    constructor() {
        this.items = [];
    }
    addProduct(product) {
        this.items.push(product);
        console.log(`${product.name} added to the cart.`);
    }
    removeProduct(productId) {
        this.items = this.items.filter(product => product.id !== productId);
        console.log(`Product with id ${productId} removed from the cart.`);
    }
    listProducts() {
        console.log("Cart contents:");
        this.items.forEach(product => {
            console.log(`${product.name} - $${product.price}`);
        });
    }
    getTotal() {
        return this.items.reduce((total, product) => total + product.price, 0);
    }
}
class Order {
    constructor(cart, customerName) {
        this.cart = cart;
        this.customerName = customerName;
        this.status = 'New';
        this.id = Order.nextId++;
    }
    changeStatus(newStatus) {
        this.status = newStatus;
        console.log(`Order ${this.id} status changed to ${newStatus}.`);
    }
    getOrderDetails() {
        console.log(`Order ${this.id} for ${this.customerName}:`);
        this.cart.listProducts();
        console.log(`Total: $${this.cart.getTotal()}`);
    }
}
Order.nextId = 1;
class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
        console.log(`Product ${product.name} added.`);
    }
    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }
    listProducts() {
        console.log("Available products:");
        this.products.forEach(product => {
            console.log(`${product.name} - $${product.price}`);
        });
    }
}
class OrderManager {
    constructor() {
        this.orders = [];
    }
    placeOrder(cart, customerName) {
        const order = new Order(cart, customerName);
        this.orders.push(order);
        console.log(`Order ${order.id} placed.`);
        return order;
    }
    changeOrderStatus(orderId, newStatus) {
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
            order.changeStatus(newStatus);
        }
    }
    listOrders() {
        console.log("All orders:");
        this.orders.forEach(order => {
            console.log(`Order ${order.id}: ${order.status}`);
        });
    }
}
const productManager = new ProductManager();
const orderManager = new OrderManager();
productManager.addProduct(new Product(1, "Laptop", 1200));
productManager.addProduct(new Product(2, "Phone", 700));
productManager.listProducts();
const cart = new Cart();
cart.addProduct(productManager.getProductById(1));
cart.addProduct(productManager.getProductById(2));
const order = orderManager.placeOrder(cart, "John Doe");
order.getOrderDetails();
orderManager.changeOrderStatus(order.id, 'Shipped');
orderManager.listOrders();
