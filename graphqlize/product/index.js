import { getProducts, createProduct } from "../../common/product";
module.exports = gBuilder => {
  gBuilder.type("Products").implements("List").def(`
    products: [Product]!
  `);

  gBuilder.type("Product").def(`
    id: ID!
    name: String!
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
    .resolve((root, args, context) => {
      const { offset, limit, filter } = args;
      return getProducts({ offset, limit, filter });
    });

  gBuilder.subscription(`
    productAdded: Product!
  `);

  gBuilder
    .mutation(
      `
    createProduct(product: ProductInput): Response!
    `
    )
    .resolve((root, args, context) => {
      const { product } = args;
      this.publish("productAdded", product);
      return createProduct({ product });
    });
};
