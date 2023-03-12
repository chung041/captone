// Hàm tìm kiếm sản phẩm theo tên
function searchProduct() {
  // B1: DOM
  let search = getElement("#txtSearch").value;
  // B2: Lọc những product có name khớp với giá trị search
  let newProductList = productList.filter((product) => {
    //Lọc ra mảng mới có product khớp điều kiện
    let name = product.name.toLowerCase();
    search = search.toLowerCase();
    return product.name.indexOf(search) !== -1;
  });
  renderProducts(newProductList);
}

// Hàm thêm sản phẩm: DOM và gửi yêu cầu thêm sản phẩm tới API
function createProduct() {
  const product = {
    name: getElement("#TenSP").value,
    weight: getElement("#GiaSP").value,
    img: getElement("#HinhSP").value,
    description: getElement("#MoTaSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
  };

  isValid = validate();
  if (!isValid) {
    console.log(isValid);
    return;
  }

  apiCreateProduct(product)
    .then((response) => {
      getProducts();
    })
    .catch((error) => {
      alert("Thêm sản phẩm thất bại");
    });
}

// Hàm xoá sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      alert("Xoá sản phẩm thất bại");
    });
}

// Hàm lấy chi tiết 1 sản phẩm và hiển thị lên modal
function selectProduct(productId) {
  resetForm();
  apiGetProductById(productId)
    .then((response) => {
      const product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#HinhSP").value = product.img;
      getElement("#GiaSP").value = product.weight;
      getElement("#MoTaSP").value = product.description;
      getElement("#loaiSP").value = product.goldPurity;
      getElement("#maSP").value = product.codeProduct;

      // Mở và cập nhật giao diện cho modal
      getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
      getElement(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
      `;
      $("#myModal").modal("show");
    })
    .catch((error) => {
      alert("Lấy chi tiết sản phẩm thất bại");
    });
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  debugger;
  const product = {
    name: getElement("#TenSP").value,
    weight: getElement("#GiaSP").value,
    img: getElement("#HinhSP").value,
    description: getElement("#MoTaSP").value,
    goldPurity: getElement("#loaiSP").value,
    codeProduct: getElement("#maSP").value,
  };

  let isValid = validate();
  // console.log(isValid);
  if (!isValid) {
    return;
  }
  apiUpdateProduct(productId, product)
    .then((response) => {
      // renderProducts(response.data);  a
      alert("Sản phẩm đã được cập nhật");
    })
    .catch((error) => {
      alert("Cập nhật sản phẩm thất bại");
    });
}

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>
          <img src="${product.img}" with="70" height="70" />
        </td>
        <td>${product.description}</td>
        <td class="price${product.id}">${new Intl.NumberFormat("vn-VN").format(
        product.price
      )}</td>
        <td>
          <button
            class="btn btn-primary"
            onclick="selectProduct('${product.id}')"
          >
            Xem
          </button>
          <button
            class="btn btn-danger"
            onclick="deleteProduct('${product.id}')"
          >
            Xoá
          </button>
        </td>
      </tr>
    `
    );
  }, "");
  document.getElementById("tblDanhSachSP").innerHTML = html;
}

//Hàm gọi Modal để chuẩn bị thêm mới sản phẩm
function addNewProduct() {
  resetForm();
}

//Hàm reset dữ liệu trên Modal
function resetForm() {
  getElement("#TenSP").value = "";
  getElement("#HinhSP").value = "";
  getElement("#GiaSP").value = "";
  getElement("#MoTaSP").value = "";
  getElement("#loaiSP").value = "";
  getElement("#maSP").value = "";

  getElement("#tbTenSP").classList.remove("d-block");
  getElement("#tbCanNangSP").classList.remove("d-block");
  getElement("#tbLinkSP").classList.remove("d-block");
  getElement("#tbMoTaSP").classList.remove("d-block");
  getElement("#tbMaSP").classList.remove("d-block");
}

// ============ DOM ===============
getElement("#btnThemSP").addEventListener("click", () => {
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
  `;
});

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}

// ===============Validation===================
function validate() {
  let isValid = true;

  // kiểm tra tên sản phẩm
  name = getElement("#TenSP").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTenSP").classList.add("d-block");
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không để trống";
  } else if (/^\d*[0-9]$/.test(name)) {
    isValid = false;
    getElement("#tbTenSP").classList.add("d-block");
    getElement("#tbTenSP").innerHTML = "Tên Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbTenSP").innerHTML = "";
  }

  //kiểm tra cân nặng
  weight = getElement("#GiaSP").value;
  if (!weight.trim()) {
    isValid = false;
    getElement("#tbCanNangSP").classList.add("d-block");
    getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không để trống";
  } else if (!/^\d*(\.\d+)?$/.test(weight)) {
    isValid = false;
    getElement("#tbCanNangSP").classList.add("d-block");
    getElement("#tbCanNangSP").innerHTML = "Cân nặng Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbCanNangSP").innerHTML = "";
  }

  //kiểm tra đường dẫn hình ảnh
  img = getElement("#HinhSP").value;
  if (!img.trim()) {
    isValid = false;
    getElement("#tbLinkSP").classList.add("d-block");
    getElement("#tbLinkSP").innerHTML = "Đường dẫn Sản phẩm không để trống";
  } else if (
    !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(
      img
    )
  ) {
    isValid = false;
    getElement("#tbLinkSP").classList.add("d-block");
    getElement("#tbLinkSP").innerHTML = "Đường dẫn Sản phẩm không hợp lệ";
  } else {
    getElement("#tbLinkSP").innerHTML = "";
  }

  //kiểm tra mô tả
  description = getElement("#MoTaSP").value;
  if (!description.trim()) {
    isValid = false;
    getElement("#tbMoTaSP").classList.add("d-block");
    getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không để trống";
  } else if (/\d/.test(description)) {
    isValid = false;
    getElement("#tbMoTaSP").classList.add("d-block");
    getElement("#tbMoTaSP").innerHTML = "Mô tả Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbMoTaSP").innerHTML = "";
  }

  //kiểm tra Mã sản phẩm (Phải định dạng số)
  codeProduct = getElement("#maSP").value;
  if (!codeProduct.trim()) {
    isValid = false;
    getElement("#tbMaSP").classList.add("d-block");
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không để trống";
  } else if (!/^[0-9]*$/.test(codeProduct)) {
    isValid = false;
    getElement("#tbMaSP").classList.add("d-block");
    getElement("#tbMaSP").innerHTML = "Mã Sản Phẩm không hợp lệ";
  } else {
    getElement("#tbMaSP").innerHTML = "";
  }
  return isValid;
}

//Hàm tìm kiếm tên sản phẩm thông qua sự kiện type input

// function lookUpProduct() {
//   getElement("#txtSearch").addEventListener("input", (event) => {
//     let newProductList = productList.filter((product) => {
//       let name = product.name.toLowerCase();
//       let search = event.target.value.toLowerCase();
//       return product.name.indexOf(search) !== -1;
//     });
//     renderProducts(newProductList);
//   });
// }
