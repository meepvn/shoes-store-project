const pool = require("../configs/connectDB");

class Product {
  async getAll() {
    const [products] = await pool.execute("select * from sanpham");
    return products;
  }

  async getOneById(id) {
    const [product] = await pool.execute(
      "select * from sanpham where MaSP = ?",
      [id]
    );
    return product;
  }

  async insertWithImage(TenSP, Loai, HangSX, DonGia, SoLuong, filename) {
    const [result] = await pool.execute(
      `insert into sanpham (TenSP,Loai,HangSX,DonGia,SoLuong,ImageName) 
          values (?,?,?,?,?,?) `,
      [TenSP, Loai, HangSX, DonGia, SoLuong, filename]
    );
    return result;
  }

  async updateWithImage(TenSP, SoLuong, DonGia, Loai, HangSX, filename, id) {
    await pool.execute(
      `update sanpham set TenSP = ?, 
          SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ?, ImageName = ? where MaSP = ? `,
      [TenSP, SoLuong, DonGia, Loai, HangSX, filename, id]
    );
  }

  async updateWithoutImage(TenSP, SoLuong, DonGia, Loai, HangSX, id) {
    await pool.execute(
      `update sanpham set TenSP = ?, 
          SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ? where MaSP = ? `,
      [TenSP, SoLuong, DonGia, Loai, HangSX, id]
    );
  }

  async deleteWithId(id) {
    await pool.execute(`delete from sanpham where MaSP = ?`, [id]);
  }
}

module.exports = new Product();
