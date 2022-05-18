const pool = require("../configs/connectDB");

class Customer {
  async getAll() {
    const [customers] = await pool.execute("select * from khachhang");
    return customers;
  }

  async getById(id) {
    const [customer] = await pool.execute(
      "select * from khachhang where MaKH = ?",
      [id]
    );
    return customer;
  }

  async updateById(TenKH, SDT, DiaChi, Email, id) {
    const [result, field] = await pool.execute(
      `update khachhang set TenKH = ?, 
          SDT = ?, DiaChi = ?, Email = ? where MaKH = ? `,
      [TenKH, SDT, DiaChi, Email, id]
    );
  }

  async insert(TenKH, SDT, DiaChi, Email) {
    const [result] = await pool.execute(
      `insert into khachhang (TenKH,SDT,DiaChi,Email) 
                values (?,?,?,?) `,
      [TenKH, SDT, DiaChi, Email]
    );
    return result.insertId;
  }

  async deleteById(id) {
    await pool.execute(`delete from khachhang where MaKH = ?`, [id]);
  }
}

module.exports = new Customer();
