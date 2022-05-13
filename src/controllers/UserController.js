const pool = require("../configs/connectDB");
const bcrypt = require("bcryptjs");

const validateUsername = (username) => {
  const regex = new RegExp(
    "^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$"
  );
  return regex.test(username);
};

const validatePassword = (password) => {
  password = password.trim();
};

class UserController {
  async getAllUsers(req, res) {
    const [users] = await pool.execute("select * from nhanvien");
    res.status(200).json(users);
  }
  async insertUser(req, res) {
    if (
      !req.body.HoTen ||
      !req.body.MatKhau ||
      !req.body.TenTK ||
      !req.body.SDT
    ) {
      return res.json({
        message: "Missing required parameter(s)",
      });
    }
    const { TenTK, MatKhau, HoTen, SDT } = req.body;
    // TenTK = TenTK.trim();
    // MatKhau = MatKhau.trim();
    console.log(validateUsername(TenTK));
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(MatKhau, salt);
    const [result] = await pool.execute(
      `insert into nhanvien  
              values (?,?,?,?) `,
      [TenTK, hashedPwd, HoTen, SDT]
    );

    res.status(200).json({
      message: "Success",
      insertedData: {
        TenTK,
        HoTen,
        MatKhau: hashedPwd,
        SDT,
      },
    });
  }
  async loginResult(req, res) {}
}

module.exports = new UserController();
