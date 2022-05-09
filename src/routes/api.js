const customerRouter = require("./customer");
const productRouter = require("./product");
const orderRouter = require("./order");
const detailRouter = require("./detail");
function initAPIRoute(app) {
  app.get("/api", (req, res) => {
    res.json({
      customer: "customer",
      product: "product",
      order: "order",
      detail: "detail",
    });
  });
  app.use("/api/product", productRouter);
  app.use("/api/customer", customerRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/detail", detailRouter);
}

module.exports = initAPIRoute;
