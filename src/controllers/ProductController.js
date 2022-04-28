const pool = require('../configs/connectDB');

class ProductController{
    async getAllProduct(req,res){
        const [products] = await pool.execute('select * from sanpham');
        res.status(200).json(products);
    }
    async getCustomerByID(req,res){
        const [customer] = await pool.execute('select * from sanpham where MaSP = ?',[req.params.id]);
        res.status(200).json(customer);
    }
    async updateCustomerByID(req,res){
        if(!req.body.name || !req.body.phone || !req.body.address || !req.body.email) {
            return res.json({
                message:"Missing required parameter(s)"
            });
        }
        const {name,phone,address,email} = req.body;
        await pool.execute(`update customers set TenKH = ?, 
        SDT = ?, DiaChi = ?, Email = ? where MaKH = ? `,[name,phone,address,email,req.params.id]);
        res.status(200).json({
            message:"ok, updated"
        });
    }
    async insertCustomer(req,res){
        if(!req.body.name || !req.body.phone || !req.body.address || !req.body.email) {
            return res.json({
                message:"Missing required parameter(s)"
            });
        }
        const {name,phone,address,email} = req.body;
        const [customer] = await pool.execute(`insert into khachhang (TenKH,SDT,DiaChi,Email) 
        values (?,?,?,?) `,[name,phone,address,email]);
        res.status(200).json({
            message:'Success',
        })
    }
    
    async deleteCustomer(req,res){
        await pool.execute(`delete from khachhang where MaKH = ?`,[req.params.id]);
        res.status(200).json({
            message:"ok, deleted"
        });
    }

}

module.exports = new ProductController;