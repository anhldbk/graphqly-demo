import _ from "lodash";
import { createBuilder, pubsub } from "graphqly";
import Base from "./base";
import Brand from "./brand";
import Category from "./category";
import Product from "./product";

const gBuilder = createBuilder();
gBuilder.use(Base);
// gBuilder.use(Brand);
// gBuilder.use(Category);
gBuilder.use(Product);

// Global hook
gBuilder.hook({
  options: {
    point: "pre.query"
  },
  handle: function(opts) {
    // if you invoke done(value), resolving functions will not be called
    // the promise chain will stop immediately
    return function(root, args, context, done) {
      // `this` is binded to the associated query (determined at runtime)
      console.log("Logging...", this.get("scope"));
      return [root, args, context];
    };
  }
});

const schema = gBuilder.build();

module.exports = {
  schema,
  pubsub
};
