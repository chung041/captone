let cartArray = getProductsInCart(); //Mảng các sản phẩm giỏ hàng
console.log(cartArray);
storeProductsInCart();
//Hàm hiển thị sản phẩm Vàng (trong dropdown) theo lựa chọn Khách hàng
function chooseProducts() {
  console.log(cartArray);
  let productType = +document.getElementById("productType").value;
  let arraySJC = []; //Mảng Vàng miếng SJC
  let arrayVangNhan24k = []; //Mảng Vàng nhẫn 24k
  let arrayThanTai = []; //Mảng Vàng vỉ Thần Tài

  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "24k") {
      arrayVangNhan24k.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "SJC") {
      arraySJC.push(productList[i]);
    }
  }
  for (i = 0; i < productList.length; i++) {
    if (productList[i].goldPurity === "24k-ThầnTài") {
      arrayThanTai.push(productList[i]);
    }
  }
  if (!productType) {
    alert("Bạn chưa chọn sản phẩm");
    return;
  } else if (productType === 1) {
    renderProductsCustomer(arrayVangNhan24k);
  } else if (productType === 2) {
    renderProductsCustomer(arraySJC);
  } else if (productType === 3) {
    renderProductsCustomer(arrayThanTai);
  }
}

//Hàm hiển thị sản phẩm Vàng ra giao diện
function renderProductsCustomer(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <div id="${
        product.id
      }" class="product__item col-6 col-md-4 mt-3 d-inline-flex ${
        product.goldPurity
      }">
        <div class="card">
          <img
            class="imgProduct"
            src="${product.img}"
            alt=""
          />
          <a class="text-center">${product.name}</a>
          <div class="product-footer d-flex justify-content-between">
            <a class="d-flex ml-3 mb-3 align-items-center">
              <i class="fa fa-star" aria-hidden="true"></i>
              5
            </a>
            <p class="mr-3">68 đã bán</p>
          </div>
      <div
                class="product-info flex-column justify-content-center align-items-center text-center"
              >
                <h2>Chi tiết</h2>
                <ul class="product__detail">
                  <li>
                    Tên: <span class="nameProduct">${product.name}</span>
                  </li>
                  <li>Loại: Vàng <span>${product.goldPurity}</span></li>
                  <li>Cân nặng: <span class="code02">${
                    product.weight
                  }</span> (g)</li>
                  <li>
                    Giá: <span class="productPrice" id="price1">${new Intl.NumberFormat(
                      "vn-VN"
                    ).format(product.price)}</span> VNĐ
                  </li>
                  <li>Mã SP: <span class="maSP">00${product.id}</span></li>
                </ul>
                <a class="mb-2" href="#" onclick="checkPrice()"
                  >Click đây để xem giá</a
                >
                <button onclick="addToCart(${
                  product.codeProduct
                })" class="btn-gold-blue">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
    `
    );
  }, "");

  document.getElementById("productInformation").innerHTML = html;
}

//Hàm hiển thị Đơn hàng ra giao diện
function renderTable(cartArray) {
  let html = cartArray.reduce((result, productCart, index) => {
    return (
      result +
      `
          <tr>
          <td>${productCart.id}</td>
          <td>${productCart.name}</td>
          <td>
            <img src="${productCart.img}" with="70" height="70" />
          </td>
          <td>
          <button type='button' class='btn decrease' onclick="decreaseQuantity(${
            productCart.id
          })">-</button>
          <span id="numberCart">${productCart.quantity}</span>
          <button type='button' class='btn increase' onclick="increaseQuantity(${
            productCart.id
          })">+</button>
          </td>
          <td>  ${new Intl.NumberFormat("vn-VN").format(productCart.price)}</td>
          <td>${calculateCost(productCart.price, productCart.quantity)}</td>
          <td>
          <button
          class="btn btn-danger"
          onclick="deleteProduct('${productCart.id}')"
          >Xóa
          </button>
          </td>
        </tr>
      `
    );
  }, "");
  document.getElementById("orderList").innerHTML = html;
  // calculate payment
  const subTotal = 30000;
  const bankCharge = 10000;
  getElement("#totalPayment").innerHTML = `
      <tr>
          <th class='text-end' colspan='5'>Phí Ship (nếu có): </th>
          <td>${new Intl.NumberFormat("vn-VN").format(subTotal)} (VNĐ)</td>
      </tr>
      <tr>
          <th class='text-end' colspan='5'>Phí Ngân Hàng</th>
          <td scope='col'>${new Intl.NumberFormat("vn-VN").format(
            bankCharge
          )} (VNĐ)</td>
      </tr>
      <tr>
          <th class='text-end' colspan='5'>
              <i class="fa fa-arrow-right"></i> Tổng chi phí: 
          </th>
          <td scope='col'> ${new Intl.NumberFormat("vn-VN").format(
            calculateTotalCost() + subTotal + bankCharge
          )} (VNĐ)
          </td>
      </tr>
  `;
  // setup and update the total quantity of products in UI cart
  getElement(".totalQuantity").innerHTML = calculateTotalQuantity().toString();
}

//Hàm thanh toán Đơn hàng
function orderPayment() {
  if (!cartArray.length) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your cart is empty!",
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your order is done !",
      showConfirmButton: false,
      timer: 1500,
    });
    cartArray = [];
    storeProductsInCart();
  }
}

//Hàm Reset toàn bộ giỏ hàng
function resetCart() {
  cartArray = [];
  renderTable(cartArray);
  localStorage.clear();
}

//Hàm tính Tổng số sản phẩm trong giỏ hàng
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalQuantity += +cartArray[i].quantity.toString();
  }
  return totalQuantity;
}

//Hàm tính chi phí tổng tiền theo sản phẩm
function calculateCost(productCartPrice, productCartQuantity) {
  let totalCostProduct = new Intl.NumberFormat("vn-VN").format(
    productCartPrice * productCartQuantity
  );
  return totalCostProduct;
}

//Hàm tính tổng tiền của Đơn hàng
function calculateTotalCost() {
  let totalOrderExpense = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalOrderExpense += cartArray[i].price * cartArray[i].quantity;
  }
  return totalOrderExpense;
}

//Hàm xóa sản phẩm trong giỏ hàng theo Id
function deleteProduct(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray.splice(index, 1);
  storeProductsInCart();
}

//Hàm button tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray[index].quantity = +cartArray[index].quantity + 1;
  storeProductsInCart();
}

//Hàm button giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productCartId) {
  let index = cartArray.findIndex((productCart) => {
    return productCart.id == productCartId;
  });
  cartArray[index].quantity = +cartArray[index].quantity - 1;
  // renderTable(cartArray);
  storeProductsInCart();
}

//productList: Mảng chứa sản phẩm của cửa hàng
function addToCart(productCode) {
  let count = 0;
  let index = productList.findIndex((product) => {
    return product.codeProduct == productCode;
  });
  let productCart = productList[index]; //Sp muốn thêm vào giỏ
  for (let i = 0; i < cartArray.length; i++) {
    if (productCart.codeProduct === cartArray[i].codeProduct) {
      // getProductCart();
      cartArray[i].quantity = +cartArray[i].quantity + 1;
      count++;
      break;
    }
  }
  if (!count) {
    cartArray.push(productCart);
    productCart.quantity = 1;
  }
  // renderTable(cartArray);
  storeProductsInCart();
}

function openModal() {
  getElement("#cartModal").style.display = "block";
}

function closeButton() {
  getElement("#cartModal").style.display = "none";
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}

// =================Local Storage======================
// Lấy dữ liệu từ Local Storage
// cartArray = [];
function getProductsInCart() {
  const json = localStorage.getItem("cartArray");
  if (!json) {
    return [];
  }

  let cartArray = JSON.parse(json);
  for (let i = 0; i < cartArray.length; i++) {
    let productCart = cartArray[i];
    cartArray[i] = new Product(
      productCart.id,
      productCart.name,
      productCart.price,
      productCart.goldPurity,
      productCart.weight,
      productCart.size,
      productCart.img,
      productCart.description,
      productCart.quantity,
      productCart.codeProduct
    );
  }
  return cartArray;
}

//Lưu dữ liệu giỏ hàng vào Local Storage
function storeProductsInCart() {
  debugger;
  const json = JSON.stringify(cartArray);
  localStorage.setItem("cartArray", json);
  renderTable(cartArray);
}
