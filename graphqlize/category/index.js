module.exports = gBuilder => {
  gBuilder.type("Categories").implements("List").def(`
    categories: [Category]!
    `);

  gBuilder.type("Category").def(`
    id: ID!
    name: String!
    link: String
    parentId: ID!
    createdAt: String!
    updatedAt: String
    `);
};
