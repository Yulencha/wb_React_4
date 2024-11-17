type OrderStatus = 'New' | 'Processing' | 'Shipped' | 'Delivered';

class Product {
  constructor(public id: number, public name: string, public price: number) {}
}

class Cart {
  private items: Product[] = [];

  addProduct(product: Product): void {
      this.items.push(product);
      console.log(`${product.name} added to the cart.`);
  }

  removeProduct(productId: number): void {
      this.items = this.items.filter(product => product.id !== productId);
      console.log(`Product with id ${productId} removed from the cart.`);
  }

  listProducts(): void {
      console.log("Cart contents:");
      this.items.forEach(product => {
          console.log(`${product.name} - $${product.price}`);
      });
  }

  getTotal(): number {
      return this.items.reduce((total, product) => total + product.price, 0);
  }
}

class Order {
    private static nextId = 1;
    public readonly id: number;
    public status: OrderStatus = 'New';

    constructor(public cart: Cart, public customerName: string) {
        this.id = Order.nextId++;
    }

    changeStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        console.log(`Order ${this.id} status changed to ${newStatus}.`);
    }

    getOrderDetails(): void {
        console.log(`Order ${this.id} for ${this.customerName}:`);
        this.cart.listProducts();
        console.log(`Total: $${this.cart.getTotal()}`);
    }
}

class ProductManager {
  private products: Product[] = [];

  addProduct(product: Product): void {
      this.products.push(product);
      console.log(`Product ${product.name} added.`);
  }

  getProductById(productId: number): Product | undefined {
      return this.products.find(product => product.id === productId);
  }

  listProducts(): void {
      console.log("Available products:");
      this.products.forEach(product => {
          console.log(`${product.name} - $${product.price}`);
      });
  }
}

class OrderManager {
  private orders: Order[] = [];

  placeOrder(cart: Cart, customerName: string): Order {
      const order = new Order(cart, customerName);
      this.orders.push(order);
      console.log(`Order ${order.id} placed.`);
      return order;
  }

  changeOrderStatus(orderId: number, newStatus: OrderStatus): void {
      const order = this.orders.find(order => order.id === orderId);
      if (order) {
          order.changeStatus(newStatus);
      }
  }

  listOrders(): void {
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
cart.addProduct(productManager.getProductById(1)!);
cart.addProduct(productManager.getProductById(2)!);

const order = orderManager.placeOrder(cart, "John Doe");
order.getOrderDetails();

orderManager.changeOrderStatus(order.id, 'Shipped');

orderManager.listOrders();

