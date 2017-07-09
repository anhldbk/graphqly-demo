module.exports = gBuilder => {
  gBuilder.iface("List").def(`
    total: Int!,
    offset: Int!,
    limit: Int!,
    # number of items actually in this window
    size: Int!        
    `);

  gBuilder.enum("MediaType").def(`
    VIDEO
    IMAGE
  `);

  gBuilder.type("Media").def(`
    link: String!,
    type: MediaType!
  `);

  gBuilder.type("Response").def(`
    code: String!,
    message: String
  `);

  gBuilder.enum("Size").def(`
    S
    M
    L
  `);
};
