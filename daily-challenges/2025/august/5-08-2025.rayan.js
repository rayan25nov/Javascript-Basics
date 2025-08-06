// Sample Data
const restaurants = [
  { id: 1, name: "Pizza Palace", preparationTime: 15, successRate: 0.9 },
  { id: 2, name: "Burger Barn", preparationTime: 10, successRate: 0.8 },
  { id: 3, name: "Sushi Spot", preparationTime: 20, successRate: 0.95 },
  { id: 4, name: "Taco Town", preparationTime: 8, successRate: 0.85 },
];

const deliveryDrivers = [
  { id: 1, name: "Alex", isAvailable: true, deliveryTime: 12 },
  { id: 2, name: "Sam", isAvailable: false, deliveryTime: 15 },
  { id: 3, name: "Jordan", isAvailable: true, deliveryTime: 10 },
  { id: 4, name: "Casey", isAvailable: true, deliveryTime: 18 },
];

const orders = [
  {
    id: 101,
    restaurantId: 1,
    items: ["Pizza Margherita", "Coke"],
    totalAmount: 15.99,
  },
  {
    id: 102,
    restaurantId: 2,
    items: ["Cheeseburger", "Fries"],
    totalAmount: 12.5,
  },
  {
    id: 103,
    restaurantId: 3,
    items: ["Salmon Roll", "Miso Soup"],
    totalAmount: 18.75,
  },
];

// Task 1: Restaurant Order Processing
function processOrder(restaurantId, orderId) {
  return new Promise((resolve, reject) => {
    // Your implementation here
    // Hint: Use setTimeout, Math.random() for success rate

    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (!restaurant) {
      reject(new Error(`Restaurant ${restaurantId} not found`));
      return;
    }

    // Simulate preparation time and success/failure
    setTimeout(() => {
      // Your logic here
      if (Math.random() > restaurant.successRate) {
        reject(
          new Error(
            `Order ${orderId} failed during preparation at ${restaurant.name}`
          )
        );
      } else {
        resolve({
          orderId,
          status: "ready",
          preparationTime: restaurant.preparationTime,
          restaurant: restaurant.name,
        });
      }
    }, restaurant.preparationTime * 1000); // Convert to milliseconds

    // Expected output (after 15 seconds):
    // { orderId: 101, status: "ready", preparationTime: 15, restaurant: "Pizza Palace" }
    // OR (on failure):
    // Error: "Order 101 failed during preparation at Pizza Palace"
  });
}

// Task 2: Driver Assignment System
async function assignDriver(orderId) {
  try {
    // Your implementation here
    // Hint: Filter available drivers, sort by delivery time

    const availableDrivers = deliveryDrivers.filter(
      (driver) => driver.isAvailable
    );

    if (availableDrivers.length === 0) {
      throw new Error("No drivers available");
    }

    // Find driver with shortest delivery time
    const driver = availableDrivers.reduce((prev, curr) =>
      curr.deliveryTime < prev.deliveryTime ? curr : prev
    );
    // Mark as unavailable
    driver.isAvailable = false;
    // Return assignment details
    return {
      orderId,
      driver: driver.name,
      estimatedDeliveryTime: driver.deliveryTime,
      assignedAt: new Date(),
    };
    // Expected output:
    // { orderId: 101, driver: "Jordan", estimatedDeliveryTime: 10, assignedAt: "2025-08-05T10:30:00Z" }
  } catch (error) {
    throw error;
  }
}

// Test your functions
console.log("=== Task 1: Processing Order ===");
processOrder(1, 101)
  .then((result) => {
    console.log("Order processed:", result);
    console.log("\n=== Task 2: Assigning Driver ===");
    return assignDriver(result.orderId);
  })
  .then((assignment) => {
    console.log("Driver assigned:", assignment);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

