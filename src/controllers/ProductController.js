const pool = require('../configs/connectDB');

class ProductController{
    async getAllProduct(req,res){
        const [products] = await pool.execute('select * from sanpham');
        res.status(200).json(products);
    }
    async getProductByID(req,res){
        const [product] = await pool.execute('select * from sanpham where MaSP = ?',[req.params.id]);
        res.status(200).json(product);
    }
    async updateProductByID(req,res){
        if(!req.body.name || !req.body.instock || !req.body.price ) {
            return res.json({
                message:"Missing required parameter(s)"
            });
        }
        const {name,instock,price,producer,category} = req.body;
        await pool.execute(`update sanpham set TenSP = ?, 
        SoLuong = ?, DonGia = ?, Loai = ?, HangSX = ? where MaSP = ? `,[name,instock,price,category,producer,req.params.id]);
        res.status(200).json({
            message:"ok, updated"
        });
    }
    async insertProduct(req,res){
        if(!req.body.name || !req.body.instock || !req.body.price || !req.body.producer || !req.body.category) {
            return res.json({
                message:"Missing required parameter(s)"
            });
        }
        const {name,instock,price, producer,category} = req.body;
        await pool.execute(`insert into sanpham (TenSP,Loai,HangSX,DonGia,SoLuong) 
        values (?,?,?,?,?) `,[name,category,producer,price,instock]);
        res.status(200).json({
            message:'Success',
        })
    }
    
    async deleteProduct(req,res){
        await pool.execute(`delete from sanpham where MaSP = ?`,[req.params.id]);
        res.status(200).json({
            message:"ok, deleted"
        });
    }

}

module.exports = new ProductController;