const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

const { validatePhone, validateUsername } = require("../ulti/validate");

class UserController {
  async getAllUsers(req, res) {
    const users = await userModel.getAll();
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
    // if (!validatePassword(MatKhau))
    //   return res.json({
    //     message: "Mật khẩu không hợp lệ",
    //   });
    if (!validatePhone(SDT))
      return res.json({
        message: "Số điện thoại không hợp lệ",
      });
    const selectUsernameResult = await userModel.getUserByUsername(TenTK);

    if (selectUsernameResult) {
      return res.json({
        message: "Tài khoản đã tồn tại",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(MatKhau, salt);

    await userModel.insertUser(TenTK, hashedPwd, HoTen, SDT);

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
      return res.json({
        message: "Request không có tài khoản / mật khẩu",
        result: false,
      });
    }
    const { TenTK, MatKhau } = req.body;

    const selectUserResult = await userModel.getUserByUsername(TenTK);

    if (!selectUserResult)
      return res.json({
        message: "Tài khoản không tồn tại",
        result: false,
      });
    else {
      const loginResult = bcrypt.compareSync(MatKhau, selectUserResult.MatKhau);
      if (loginResult)
        return res.json({
          message: "Đăng nhập thành công",
          result: true,
          Name: selectUserResult.HoTen,
        });
      else {
        return res.json({
          message: "Tài khoản hoặc mật khẩu không đúng",
          result: false,
        });
      }
    }
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
