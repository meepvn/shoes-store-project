const pool = require("../configs/connectDB");
const bcrypt = require("bcryptjs");

const validateUsername = (username) => {
  const regex = new RegExp(
    "^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$"
  );
  return regex.test(username);
};

const validatePassword = (password) => {
  const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$");
  return regex.test(password);
};

const validatePhone = (phone) => {
  const regex = new RegExp(
    "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
  );
  return regex.test(phone);
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
    let { TenTK, MatKhau, HoTen, SDT } = req.body;
    TenTK = TenTK.trim();
    MatKhau = MatKhau.trim();
    HoTen = HoTen.trim();
    SDT = SDT.trim();
    if (!validateUsername(TenTK))
      return res.json({
        message: "Tài khoản không hợp lệ",
      });
    if (!validatePassword(MatKhau))
      return res.json({
        message: "Mật khẩu không hợp lệ",
      });
    if (!validatePhone(SDT))
      return res.json({
        message: "Số điện thoại không hợp lệ",
      });
    const [selectUsernameResult] = await pool.execute(
      "select TenTK from nhanvien where TenTK = ?",
      [TenTK]
    );
    if (selectUsernameResult.length > 0) {
      return res.json({
        message: "Tài khoản đã tồn tại",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(MatKhau, salt);
    await pool.execute(
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
  async loginResult(req, res) {
    if (!req.body.TenTK || !req.body.MatKhau) {
      res.json({
        message: "Request không có tài khoản / mật khẩu",
        result: false,
      });
    }
    const { TenTK, MatKhau } = req.body;
    const [selectPasswordResult] = await pool.execute(
      `select MatKhau from nhanvien where TenTK = ?`,
      [TenTK]
    );
    if (selectPasswordResult.length === 0)
      res.json({
        message: "Tài khoản không tồn tại",
        result: false,
      });
    else {
      const loginResult = bcrypt.compareSync(
        MatKhau,
        selectPasswordResult[0].MatKhau
      );
      if (loginResult)
        res.json({
          message: "Đăng nhập thành công",
          result: true,
        });
      else {
        res.json({
          message: "Tài khoản hoặc mật khẩu không đúng",
          result: false,
        });
      }
    }

    // res.json(result);
  }
}

module.exports = new UserController();

// Minimum eight characters, at least one letter and one number:

// "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
// Minimum eight characters, at least one letter, one number and one special character:

// "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
