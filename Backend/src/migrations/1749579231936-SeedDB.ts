import { MigrationInterface, QueryRunner, In } from "typeorm";
import {
  Role,
  Gender,
  OrderStatus,
  OrderItemStatus,
  PaymentType,
} from "../graphql/types/resolvers-types.js";
import { User } from "../entities/user/User.entity.js";
import { Buyer } from "../entities/buyer/Buyer.entity.js";
import { Seller } from "../entities/seller/Seller.entity.js";
import { Category } from "../entities/category/Category.entity.js";
import { Product } from "../entities/product/Product.entity.js";
import { ShoppingCart } from "../entities/shoppingCart/ShoppingCart.entity.js";
import { Order } from "../entities/order/Order.entity.js";
import { OrderItem } from "../entities/orderItem/OrderItem.entity.js";
import { Payment } from "../entities/payment/Payment.entity.js";
import { Review } from "../entities/review/review.entity.js";
import { WishList } from "../entities/wishList/WishList.entity.js";
import bcrypt from "bcrypt";

// Helper functions for randomness
const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T>(arr: T[], maxCount: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (maxCount + 1)));
};
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export class SeedDB1749579231936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const HASHED_PASSWORD = await bcrypt.hash("User1234", 10); // Hashed "User1234"

    console.log(
      "--- Starting Heavy Database Seeding (Gender-Neutral/Masculine) ---"
    );

    // --- 1. DEFINE DATA SOURCES ---
    const sellersData = Array.from({ length: 10 }, (_, i) => ({
      firstName: `SellerFirst${i + 1}`,
      lastName: `SellerLast${i + 1}`,
      email: `seller${i + 1}@example.com`,
      password: HASHED_PASSWORD,
      role: Role.Seller,
      verified: true,
      storeName: `Store${i + 1} Emporium`,
      storeBalance: getRandomInt(1000, 10000),
      country: getRandomItem(["USA", "Germany", "Japan", "Brazil"]),
      city: getRandomItem(["New York", "Berlin", "Tokyo", "Rio"]),
    }));

    // All buyers are generated as Male
    const buyersData = Array.from({ length: 30 }, (_, i) => ({
      firstName: `BuyerFirst${i + 1}`,
      lastName: `BuyerLast${i + 1}`,
      email: `buyer${i + 1}@example.com`,
      password: HASHED_PASSWORD,
      role: Role.Buyer,
      verified: true,
      gender: Gender.Male,
      country: getRandomItem(["Canada", "France", "Australia", "South Korea"]),
      city: getRandomItem(["Toronto", "Paris", "Sydney", "Seoul"]),
    }));

    const categoriesData = [
      {
        name: "Electronics",
        description: "Cutting-edge electronic gadgets and accessories.",
        image:
          "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      },
      {
        name: "Books",
        description: "From timeless classics to modern bestsellers.",
        image:
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      },
      {
        name: "Men's Apparel",
        description: "Stylish and comfortable clothing.",
        image:
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      },
      {
        name: "Home & Kitchen",
        description: "Everything you need to make your house a home.",
        image:
          "https://images.pexels.com/photos/65882/kitchen-cook-interior-design-65882.jpeg",
      },
      {
        name: "Sports & Outdoors",
        description: "Gear up for your next adventure.",
        image:
          "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
      },
      {
        name: "Toys & Games",
        description: "Fun and games for all ages.",
        image:
          "https://images.pexels.com/photos/3661242/pexels-photo-3661242.jpeg",
      },
    ];

    // Curated list of products and images
    const productsData = [
      // Electronics
      {
        name: "Pro Laptop 15-inch",
        price: 1299.99,
        quantity: 50,
        images: ["https://images.pexels.com/photos/18105/pexels-photo.jpg"],
        category: "Electronics",
        desc: "A powerful and sleek laptop for professionals.",
      },
      {
        name: "Smartphone X",
        price: 799.5,
        quantity: 120,
        images: [
          "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
        ],
        category: "Electronics",
        desc: "The latest smartphone with a stunning camera.",
      },
      {
        name: "Wireless Noise-Cancelling Headphones",
        price: 349.0,
        quantity: 80,
        images: [
          "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
        ],
        category: "Electronics",
        desc: "Immerse yourself in sound.",
      },
      {
        name: "4K Ultra HD Smart TV",
        price: 599.99,
        quantity: 40,
        images: [
          "https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg",
        ],
        category: "Electronics",
        desc: "Cinema-like experience at home.",
      },
      {
        name: "Gaming Mouse Pro",
        price: 69.99,
        quantity: 200,
        images: [
          "https://images.pexels.com/photos/7915228/pexels-photo-7915228.jpeg",
        ],
        category: "Electronics",
        desc: "Precision and speed for competitive gaming.",
      },

      // Books
      {
        name: "The Sci-Fi Epic",
        price: 24.95,
        quantity: 200,
        images: [
          "https://images.pexels.com/photos/2177013/pexels-photo-2177013.jpeg",
        ],
        category: "Books",
        desc: "A sprawling science fiction novel.",
      },
      {
        name: "The Mystery of the Old Manor",
        price: 18.5,
        quantity: 150,
        images: [
          "https://images.pexels.com/photos/208895/pexels-photo-208895.jpeg",
        ],
        category: "Books",
        desc: "A thrilling whodunit that will keep you guessing.",
      },
      {
        name: "Fundamentals of Cooking",
        price: 35.0,
        quantity: 100,
        images: [
          "https://images.pexels.com/photos/5938/food-kitchen-cooking-prepare.jpg",
        ],
        category: "Books",
        desc: "An essential guide for any home chef.",
      },
      {
        name: "A Brief History of Time",
        price: 22.99,
        quantity: 90,
        images: [
          "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg",
        ],
        category: "Books",
        desc: "Exploring the universe from the big bang to black holes.",
      },

      // Men's Apparel
      {
        name: "Classic Men's T-Shirt",
        price: 19.99,
        quantity: 300,
        images: [
          "https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg",
        ],
        category: "Men's Apparel",
        desc: "A high-quality, 100% cotton t-shirt.",
      },
      {
        name: "Men's Classic Leather Jacket",
        price: 189.99,
        quantity: 80,
        images: ["https://images.pexels.com/photos/16170/pexels-photo.jpg"],
        category: "Men's Apparel",
        desc: "A timeless biker-style leather jacket.",
      },
      {
        name: "Performance Running Shoes",
        price: 120.0,
        quantity: 150,
        images: [
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        ],
        category: "Men's Apparel",
        desc: "Lightweight and responsive for your best run yet.",
      },

      // Home & Kitchen
      {
        name: "Espresso Machine",
        price: 499.0,
        quantity: 60,
        images: [
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
        ],
        category: "Home & Kitchen",
        desc: "Barista-quality coffee at home.",
      },
      {
        name: "Robotic Vacuum Cleaner",
        price: 299.99,
        quantity: 75,
        images: [
          "https://images.pexels.com/photos/4392033/pexels-photo-4392033.jpeg",
        ],
        category: "Home & Kitchen",
        desc: "Smart, automated cleaning for your floors.",
      },
      {
        name: "Cast Iron Skillet",
        price: 45.5,
        quantity: 250,
        images: [
          "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
        ],
        category: "Home & Kitchen",
        desc: "A durable, versatile pan for searing, baking, and frying.",
      },
    ];

    const moreProducts = [
      // Electronics
      {
        name: "Portable Power Bank 20000mAh",
        price: 49.99,
        quantity: 300,
        images: [
          "https://images.pexels.com/photos/13912953/pexels-photo-13912953.jpeg",
        ],
        category: "Electronics",
        desc: "Charge your devices on the go.",
      },
      {
        name: "Smartwatch Series 8",
        price: 399.0,
        quantity: 110,
        images: [
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
        ],
        category: "Electronics",
        desc: "Track your health and stay connected.",
      },
      {
        name: "Bluetooth Speaker",
        price: 99.0,
        quantity: 180,
        images: [
          "https://images.pexels.com/photos/1279923/pexels-photo-1279923.jpeg",
        ],
        category: "Electronics",
        desc: "Rich, powerful sound in a compact design.",
      },
      {
        name: "Webcam 1080p",
        price: 59.95,
        quantity: 220,
        images: [
          "https://images.pexels.com/photos/7243009/pexels-photo-7243009.jpeg",
        ],
        category: "Electronics",
        desc: "Crystal clear video for calls and streaming.",
      },
      // Books
      {
        name: "The Art of Strategy",
        price: 21.0,
        quantity: 130,
        images: [
          "https://images.pexels.com/photos/261895/pexels-photo-261895.jpeg",
        ],
        category: "Books",
        desc: "Classic text on tactics and life.",
      },
      {
        name: "History of Ancient Rome",
        price: 29.99,
        quantity: 180,
        images: [
          "https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg",
        ],
        category: "Books",
        desc: "A deep dive into the Roman Empire.",
      },
      // Men's Apparel
      {
        name: "Winter Parka",
        price: 250.0,
        quantity: 70,
        images: [
          "https://images.pexels.com/photos/6764724/pexels-photo-6764724.jpeg",
        ],
        category: "Men's Apparel",
        desc: "Stay warm in the harshest conditions.",
      },
      {
        name: "Leather Belt",
        price: 45.0,
        quantity: 250,
        images: [
          "https://images.pexels.com/photos/984539/pexels-photo-984539.jpeg",
        ],
        category: "Men's Apparel",
        desc: "A stylish and durable genuine leather belt.",
      },
      // Home & Kitchen
      {
        name: "Air Fryer XL",
        price: 119.99,
        quantity: 100,
        images: [
          "https://images.pexels.com/photos/6815750/pexels-photo-6815750.jpeg",
        ],
        category: "Home & Kitchen",
        desc: "Enjoy crispy food with less oil.",
      },
      {
        name: "Knife Set with Block",
        price: 149.99,
        quantity: 90,
        images: [
          "https://images.pexels.com/photos/33242/cooking-ingredient-kitchen-knife.jpg",
        ],
        category: "Home & Kitchen",
        desc: "High-carbon stainless steel for precision cutting.",
      },
      // Sports & Outdoors
      {
        name: "Professional Basketball",
        price: 49.99,
        quantity: 250,
        images: [
          "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg",
        ],
        category: "Sports & Outdoors",
        desc: "Official size and weight, built for indoor and outdoor courts.",
      },
      {
        name: "2-Person Camping Tent",
        price: 129.5,
        quantity: 80,
        images: [
          "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg",
        ],
        category: "Sports & Outdoors",
        desc: "Waterproof and easy to set up.",
      },
      {
        name: "Insulated Water Bottle",
        price: 25.0,
        quantity: 500,
        images: [
          "https://images.pexels.com/photos/9699827/pexels-photo-9699827.jpeg",
        ],
        category: "Sports & Outdoors",
        desc: "Keeps drinks cold for 24 hours or hot for 12.",
      },
      {
        name: "Adjustable Dumbbells Set",
        price: 350.0,
        quantity: 50,
        images: [
          "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg",
        ],
        category: "Sports & Outdoors",
        desc: "Save space with this versatile dumbbell set.",
      },
      // Toys & Games
      {
        name: "1000-Piece Jigsaw Puzzle",
        price: 19.99,
        quantity: 300,
        images: [
          "https://images.pexels.com/photos/386025/pexels-photo-386025.jpeg",
        ],
        category: "Toys & Games",
        desc: "A challenging and beautiful puzzle of a landscape.",
      },
      {
        name: "Wooden Building Blocks Set",
        price: 39.99,
        quantity: 200,
        images: [
          "https://images.pexels.com/photos/1769356/pexels-photo-1769356.jpeg",
        ],
        category: "Toys & Games",
        desc: "Inspire creativity with this classic toy.",
      },
      {
        name: "Strategy Board Game",
        price: 55.0,
        quantity: 120,
        images: [
          "https://images.pexels.com/photos/788662/pexels-photo-788662.jpeg",
        ],
        category: "Toys & Games",
        desc: "A game of conquest and diplomacy for 2-4 players.",
      },
      {
        name: "Remote Control Car",
        price: 79.99,
        quantity: 150,
        images: ["https://images.pexels.com/photos/35969/pexels-photo.jpg"],
        category: "Toys & Games",
        desc: "High-speed, all-terrain RC car for thrilling fun.",
      },
    ];
    productsData.push(...moreProducts);

    // --- 2. CREATE BASE ENTITIES ---
    console.log("Creating users and categories...");
    await queryRunner.manager.save(User, {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: HASHED_PASSWORD,
      role: Role.Admin,
      verified: true,
    } as User);
    const [savedSellers, savedBuyers, savedCategories] = await Promise.all([
      queryRunner.manager.save(Seller, sellersData as Seller[]),
      queryRunner.manager.save(Buyer, buyersData as Buyer[]),
      queryRunner.manager.save(Category, categoriesData),
    ]);
    console.log(
      `Created ${savedSellers.length} sellers, ${savedBuyers.length} buyers, and ${savedCategories.length} categories.`
    );

    // --- 3. CREATE PRODUCTS ---
    console.log("Creating products...");
    const categoryMap = new Map(savedCategories.map((c) => [c.name, c]));
    const productEntities = productsData.map((p) => ({
      ...p,
      description: p.desc,
      reference: `${p.name.substring(0, 3).toUpperCase()}-${getRandomInt(
        1000,
        9999
      )}`,
      category: categoryMap.get(p.category)!,
      owner: getRandomItem(savedSellers),
    }));
    const savedProducts = await queryRunner.manager.save(
      Product,
      productEntities
    );
    console.log(`Created ${savedProducts.length} products.`);

    // --- 4. CREATE INTERACTIONS (CARTS, WISHLISTS, ORDERS, REVIEWS) ---
    console.log("Creating carts, wishlists, orders, and reviews...");
    let allReviews: Review[] = [];
    for (const buyer of savedBuyers) {
      await queryRunner.manager.save(ShoppingCart, { buyer });
      await queryRunner.manager.save(WishList, {
        buyer,
        products: getRandomSubset(savedProducts, 5),
      });

      const numOrders = getRandomInt(1, 3);
      for (let i = 0; i < numOrders; i++) {
        const numItems = getRandomInt(1, 4);
        const orderItemsData: Partial<OrderItem>[] = [];
        let totalAmount = 0;

        getRandomSubset(savedProducts, numItems).forEach((product) => {
          const quantity = getRandomInt(1, 3);
          totalAmount += product.price * quantity;
          orderItemsData.push({
            product,
            productId: product.id,
            quantity,
            price: product.price,
            status: getRandomItem([
              OrderItemStatus.Delivered,
              OrderItemStatus.Shipped,
              OrderItemStatus.Confirmed,
              OrderItemStatus.Pending,
            ]),
          });
        });

        if (orderItemsData.length === 0) continue;

        const payment = await queryRunner.manager.save(Payment, {
          paymentDate: new Date(),
          paymentType: getRandomItem([PaymentType.Visa, PaymentType.Paypal]),
        });

        const orderStatus = orderItemsData.every(
          (oi) => oi.status === OrderItemStatus.Delivered
        )
          ? OrderStatus.Delivered
          : OrderStatus.Partiallyshipped;
        const order = await queryRunner.manager.save(Order, {
          totalAmount,
          status: orderStatus,
          buyer,
          payment,
        });

        for (const itemData of orderItemsData) {
          const savedOrderItem = await queryRunner.manager.save(OrderItem, {
            ...itemData,
            order,
          });
          if (savedOrderItem.status === OrderItemStatus.Delivered) {
            allReviews.push(
              queryRunner.manager.create(Review, {
                rating: getRandomInt(3, 5),
                comment: `This is a great product! I am buyer ${buyer.id} and I am very satisfied with this purchase. Highly recommended!`,
                reviewer: buyer,
                product: savedOrderItem.product,
                productId: savedOrderItem.productId,
              })
            );
          }
        }
      }
    }
    await queryRunner.manager.save(Review, allReviews);
    console.log(`Created ${allReviews.length} reviews for delivered items.`);

    // --- 5. UPDATE PRODUCT RATINGS ---
    console.log("Updating product ratings based on new reviews...");
    const reviewsByProduct = allReviews.reduce((acc, review) => {
      if (!acc[review.productId]) acc[review.productId] = [];
      acc[review.productId].push(review.rating);
      return acc;
    }, {} as Record<number, number[]>);

    const productsToUpdate: Product[] = [];
    for (const productId in reviewsByProduct) {
      const ratings = reviewsByProduct[productId];
      const averageRating =
        ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

      const product = savedProducts.find((p) => p.id === +productId);
      if (product) {
        product.rating = Math.round(averageRating * 10) / 10;
        product.numberOfReviews = ratings.length;
        productsToUpdate.push(product);
      }
    }

    if (productsToUpdate.length > 0) {
      await queryRunner.manager.save(Product, productsToUpdate);
      console.log(`Updated ratings for ${productsToUpdate.length} products.`);
    }

    console.log("--- Seeding Finished Successfully ---");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log("--- Reverting Heavy Database Seed ---");
    // This command efficiently clears all data from the specified tables.
    // RESTART IDENTITY resets auto-incrementing counters.
    // CASCADE removes dependent objects in other tables.
    // NOTE: This syntax is for PostgreSQL.
    await queryRunner.query(
      'TRUNCATE "review", "cart_item", "shopping_cart", "order_item", "order", "payment", "wish_list_products_product", "wish_list", "product", "category", "user" RESTART IDENTITY CASCADE'
    );
    console.log("--- Revert Finished ---");
  }
}
