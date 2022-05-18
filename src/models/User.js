const pool = require("../configs/connectDB");

class User {
  async getAll() {
    const [users] = await pool.execute("select * from nhanvien");
    return users;
  }

  async getUserByUsername(username) {
    const [selectUsernameResult] = await pool.execute(
      "select * from nhanvien where TenTK = ?",
      [username]
    );
    return selectUsernameResult;
  }

  async insertUser(TenTK, MatKhau, HoTen, SDT) {
    await pool.execute(
      `insert into nhanvien  
                values (?,?,?,?) `,
      [TenTK, MatKhau, HoTen, SDT]
    );
  }
}

module.exports = new User();
