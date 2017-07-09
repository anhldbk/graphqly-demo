const products = [];
export function createProduct({ product }) {
  // let's assume update db is a lengthy operation
  return new Promise((resolve, reject) => {
    products.push(product);
    return resolve({
      code: "SUCCESS",
      message: "Product is created"
    });
  });
}
export function getProducts({ offset = 0, limit = 20, filter = {} }) {
  return new Promise((resolve, reject) => {
    // in this example, we just ignore `offset`, `limit`
    // to return all products
    return resolve({
      size: products.length,
      offset: 0,
      limit: products.length,
      total: products.length,
      products
    });
  });
}
