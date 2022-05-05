const pool = require("../configs/connectDB");

class OrderController {
  async getAllOrders(req, res) {
    const [orders] = await pool.execute("select * from donhang");
    res.status(200).json(orders);
  }
  async createOrder(req, res) {
    if (!req.body.customerID) {
      return res.json({
        message: "missing required parameter(s)",
      });
    }
    const { customerID } = req.body;
    const [order] = await pool.execute(
      "insert into donhang (MaKH,NgayTao,TinhTrang,GhiChu) values (?,now(),?,?)",
      [customerID, "Chờ xác nhận", "Không"]
    );
    res.status(200).json({
      message: "ok",
      orderID: order.insertId,
    });
  }

  async AddOrderDetail(req, res) {
    if (!req.body.data || !req.body.orderId) {
      return res.status(200).json({
        message: "Missing data data",
      });
    }
    const { orderId, data: details } = req.body;
    details.forEach(async (value) => {
      const [result] = await pool.execute(
        "insert into chitietdonhang  values (?,?,?)",
        [orderId, ...value]
      );
    });
    res.status(200).json("Ok. Added");
  }
}

module.exports = new OrderController();
