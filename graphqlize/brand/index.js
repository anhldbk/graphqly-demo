module.exports = gBuilder => {
  gBuilder.type("Brands").implements("List").def(`
    brands: [Brand]!
    `);

  gBuilder.type("Brand").def(`
    id: ID!
    name: String!
    link: String
    createdAt: String!
    updatedAt: String
    `);
};
