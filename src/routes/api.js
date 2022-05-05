const customerRouter = require("./customer");
const productRouter = require("./product");
const orderRouter = require("./order");
function initAPIRoute(app) {
  app.get("/api", (req, res) => {
    res.json({
      customer: {
        get: ["/", "/find/:name"],
        post: "/create",
        put: "/:id/edit",
        delete: "/:id",
      },
    });
  });
  app.use("/api/product", productRouter);
  app.use("/api/customer", customerRouter);
  app.use("/api/order", orderRouter);
}

module.exports = initAPIRoute;
