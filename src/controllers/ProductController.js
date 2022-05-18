const productModel = require("../models/Product");

class ProductController {
  async getAllProduct(req, res) {
    const products = await productModel.getAll();
    res.status(200).json(products);
  }
  async getProductByID(req, res) {
    const product = await productModel.getOneById(req.params.id);
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
      await productModel.updateWithImage(
        TenSP,
        SoLuong,
        DonGia,
        Loai,
        HangSX,
        req.file.filename,
        req.params.id
      );
      return res.status(200).json({
        message: "Ok, updated with image",
        filename: req.file.filename,
      });
    } else {
      // await pool.execute(
      //   `update sanpham set TenSP = ?,
      //     SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ? where MaSP = ? `,
      //   [TenSP, SoLuong, DonGia, Loai, HangSX, req.params.id]
      // );
      await productModel.updateWithoutImage(
        TenSP,
        SoLuong,
        DonGia,
        Loai,
        HangSX,
        req.params.id
      );
      const product = await productModel.getOneById(req.params.id);
      return res.status(200).json({
        message: "ok, updated",
        filename: product[0].ImageName,
      });
    }
  }
  async insertProduct(req, res) {
    if (
      !req.body.TenSP ||
      !req.body.SoLuong ||
      !req.body.DonGia ||
      !req.body.HangSX ||
      !req.body.Loai ||
      !req.file
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    const { TenSP, SoLuong, DonGia, HangSX, Loai } = req.body;
    const result = await productModel.insertWithImage(
      TenSP,
      Loai,
      HangSX,
      DonGia,
      SoLuong,
      req.file.filename
    );

    res.status(200).json({
      message: "Success",
      insertedData: {
        MaSP: result.insertId,
        TenSP,
        SoLuong,
        DonGia,
        HangSX,
        ImageName: req.file.filename,
        Loai,
      },
    });
  }

  async deleteProduct(req, res) {
    await productModel.deleteWithId(req.params.id);
    res.status(200).json({
      message: "ok, deleted",
    });
  }
}

module.exports = new ProductController();
