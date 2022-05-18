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

module.exports = { validateUsername, validatePassword, validatePhone };
