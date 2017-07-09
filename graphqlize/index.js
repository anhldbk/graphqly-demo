import _ from "lodash";
import { createBuilder } from "graphqly";
import Base from "./base";
import Brand from "./brand";
import Category from "./category";
import Product from "./product";

const gBuilder = createBuilder();
gBuilder.use(Base);
// gBuilder.use(Brand);
// gBuilder.use(Category);
gBuilder.use(Product);
const schema = gBuilder.build();

module.exports = {
  schema
};
