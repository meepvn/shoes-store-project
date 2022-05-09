const pool = require("../configs/connectDB");

class OrderController {
  async getAllDetails(req, res) {
    const [details] = await pool.execute("select * from chitietdonhang");
    res.status(200).json(details);
  }

  async AddOrderDetail(req, res) {
    if (!req.body.data || !req.body.orderId) {
      return res.status(200).json({
        message: "Missing data",
      });
    }
    console.log(req.body.data);
    const { orderId, data: details } = req.body;
    details.forEach(async (value) => {
      console.log(typeof value);
      if (typeof value === "string") {
        value = JSON.parse(value);
      }
      const [result] = await pool.execute(
        "insert into chitietdonhang  values (?,?,?)",
        [orderId, ...value]
      );
    });
    res.status(200).json("Ok. Added");
  }
}

module.exports = new OrderController();
