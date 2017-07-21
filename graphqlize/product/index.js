import { getProducts, createProduct } from "../../common/product";
module.exports = gBuilder => {
  gBuilder.type("Products").implements("List").def(`
    products: [Product]!
  `);

  gBuilder.type("Product").def(`
    id: ID
    name: String
    link: String
    price: Int
  `);

  // we're too lazy to define a separate input
  gBuilder.input("ProductInput").ext("Product");

  gBuilder.enum("ProductOrder").def(`
    PRICE_DESCENDING
    PRICE_ASCENDING
    NEWEST
  `);

  gBuilder.input("ProductFilter").def(`
    sorting: ProductOrder
    size: [Size] 
    brands: [ID!]
    categories: [ID!]
  `);

  gBuilder
    .query(
      `
    products(limit: Int = 20, offset: Int = 0, filter: ProductFilter): Products
    `
    )
    .set("scope", ["products.read"])
    .hook({
      options: {
        point: "pre.query"
      },
      handle: function(opts) {
        return function(root, args, context) {
          // `this` is binded to the query (or mutation)
          console.log("In query....", this._name);
          return [root, args, context];
        };
      }
    })
    .resolve((root, args, context) => {
      const { offset, limit, filter } = args;
      return getProducts({ offset, limit, filter });
    });

  gBuilder.subscription(
    `
    productAdded: Product
  `
  );

  gBuilder
    .mutation(
      `
    createProduct(product: ProductInput): Response!
    `
    )
    .resolve(function(root, args, context) {
      const { product } = args;
      process.nextTick(() => {
        this.publish("productAdded", product);
      });
      return createProduct({ product });
    });
};
