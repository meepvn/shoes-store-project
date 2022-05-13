const pool = require("../configs/connectDB");

class ProductController {
  async getAllProduct(req, res) {
    const [products] = await pool.execute("select * from sanpham");
    res.status(200).json(products);
  }
  async getProductByID(req, res) {
    const [product] = await pool.execute(
      "select * from sanpham where MaSP = ?",
      [req.params.id]
    );
    res.status(200).json(product);
  }
  async updateProductByID(req, res) {
    if (
      !req.body.TenSP ||
      !req.body.SoLuong ||
      !req.body.DonGia ||
      !req.body.HangSX ||
      !req.body.Loai
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    const { TenSP, SoLuong, DonGia, HangSX, Loai } = req.body;
    if (req.file) {
      await pool.execute(
        `update sanpham set TenSP = ?, 
          SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ?, ImageName = ? where MaSP = ? `,
        [TenSP, SoLuong, DonGia, Loai, HangSX, req.file.filename, req.params.id]
      );
    } else {
      await pool.execute(
        `update sanpham set TenSP = ?, 
          SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ? where MaSP = ? `,
        [TenSP, SoLuong, DonGia, Loai, HangSX, req.params.id]
      );
    }
    res.status(200).json({
      message: "ok, updated",
    });
  }
  async insertProduct(req, res) {
    console.log(req.file);
    console.log(req.query);
    if (
      !req.body.TenSP ||
      !req.body.SoLuong ||
      !req.body.DonGia ||
      !req.body.HangSX ||
      !req.body.Loai
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    console.log();
    const { TenSP, SoLuong, DonGia, HangSX, Loai } = req.body;
    if (req.file) {
      await pool.execute(
        `insert into sanpham (TenSP,Loai,HangSX,DonGia,SoLuong,ImageName) 
          values (?,?,?,?,?,?) `,
        [TenSP, Loai, HangSX, DonGia, SoLuong, req.file.filename]
      );
    } else {
      await pool.execute(
        `insert into sanpham (TenSP,Loai,HangSX,DonGia,SoLuong) 
          values (?,?,?,?,?) `,
        [TenSP, Loai, HangSX, DonGia, SoLuong]
      );
    }

    res.status(200).json({
      message: "Success",
    });
  }

  async deleteProduct(req, res) {
    await pool.execute(`delete from sanpham where MaSP = ?`, [req.params.id]);
    res.status(200).json({
      message: "ok, deleted",
    });
  }
}

module.exports = new ProductController();
