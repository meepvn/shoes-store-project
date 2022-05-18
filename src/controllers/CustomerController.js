const customerModel = require("../models/Customer");
class CustomerController {
  async getAllCustomer(req, res) {
    const result = await customerModel.getAll();
    res.status(200).json(result);
  }

  async getCustomerByID(req, res) {
    const customer = await customerModel.getById(req.params.id);
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

    await customerModel.updateById(TenKH, SDT, DiaChi, Email, req.params.id);

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

    const result = await customerModel.insert(TenKH, SDT, DiaChi, Email);

    res.status(200).json({
      message: "Success",
      insertedData: {
        id: result,
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
    await customerModel.deleteById(req.params.id);
    res.status(200).json({
      message: "ok, deleted",
    });
  }
}

module.exports = new CustomerController();

// async getCustomerByNameRelatively(req, res) {
//   const [customer] = await pool.execute(
//     `select * from khachhang where TENKH like concat('%',?,'%')`,
//     [req.params.name]
//   );
//   res.status(200).json(customer);
// }
