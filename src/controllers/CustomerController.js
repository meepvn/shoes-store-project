const pool = require("../configs/connectDB");

class CustomerController {
  async getAllCustomer(req, res) {
    const [customers] = await pool.execute("select * from khachhang");
    res.status(200).json(customers);
  }
  async getCustomerByNameRelatively(req, res) {
    const [customer] = await pool.execute(
      `select * from khachhang where TENKH like concat('%',?,'%')`,
      [req.params.name]
    );
    res.status(200).json(customer);
  }
  async getCustomerByID(req, res) {
    const [customer] = await pool.execute(
      "select * from khachhang where MaKH = ?",
      [req.params.id]
    );
    res.status(200).json(customer);
  }
  async updateCustomerByID(req, res) {
    if (
      !req.body.TenKH ||
      !req.body.SDT ||
      !req.body.DiaChi ||
      !req.body.Email
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    const { TenKH, SDT, DiaChi, Email } = req.body;
    await pool.execute(
      `update khachhang set TenKH = ?, 
        SDT = ?, DiaChi = ?, Email = ? where MaKH = ? `,
      [TenKH, SDT, DiaChi, Email, req.params.id]
    );
    res.status(200).json({
      message: "ok, updated",
    });
  }
  async insertCustomer(req, res) {
    if (
      !req.body.TenKH ||
      !req.body.SDT ||
      !req.body.DiaChi ||
      !req.body.Email
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    const { TenKH, SDT, DiaChi, Email } = req.body;
    const [result] = await pool.execute(
      `insert into khachhang (TenKH,SDT,DiaChi,Email) 
              values (?,?,?,?) `,
      [TenKH, SDT, DiaChi, Email]
    );

    res.status(200).json({
      message: "Success",
      insertedData: {
        id: result.insertId,
        TenKH,
        SDT,
        DiaChi,
        Email,
      },
    });
  }
  async deleteCustomer(req, res) {
    if (!req.params.id) {
      res.json({
        message: "failed",
      });
      return;
    }
    await pool.execute(`delete from khachhang where MaKH = ?`, [req.params.id]);
    res.status(200).json({
      message: "ok, deleted",
    });
  }
}

module.exports = new CustomerController();
