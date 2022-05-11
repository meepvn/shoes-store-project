function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

const array = [
  "Nguyễn Văn Thắng",
  "Đỗ Tiến Hiệp",
  "Nguyen Van Thang",
  "Do Tien Hiep",
];

const renderArray = (arr) => {
  const userContainer = document.querySelector("#list-user");
  userContainer.innerHTML = arr.map((item) => `<h1>${item}</h1>`).join("");
};

renderArray(array);

const inputFind = document.querySelector(".find");
inputFind.addEventListener("change", (e) => {
  const arr = array.filter((item) =>
    removeAccents(item.toLowerCase()).includes(e.target.value.toLowerCase())
  );
  console.log(arr);
});
