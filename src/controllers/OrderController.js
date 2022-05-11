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
      `insert into donhang (MaKH,NgayTao,TinhTrang,GhiChu) values (?,now(),?,?)`,
      [customerID, "Chờ xác nhận", "Không"]
    );
    res.status(200).json({
      message: "ok",
      orderID: order.insertId,
    });
  }

  async deleteOrder(req, res) {
    await pool.execute(`delete from chitietdonhang where MaDH = ?`, [
      req.params.id,
    ]);
    await pool.execute(`delete from donhang where MaDH = ?`, [req.params.id]);
    res.status(200).json({
      message: "ok, deleted",
    });
  }

  async updateOrder(req, res) {
    res.json("ok");
  }
}

module.exports = new OrderController();
