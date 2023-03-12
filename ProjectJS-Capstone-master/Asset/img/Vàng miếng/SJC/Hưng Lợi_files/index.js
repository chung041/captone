function getProducts() {
  let productType = +document.getElementById("productType").value;
  console.log(productType);
  if (!productType) {
    alert("Bạn chưa chọn sản phẩm");
    return;
  } else if (productType === 1) {
    getElement(".nhanSjc").classList.remove("d-none");
    getElement(".miengSjc").classList.add("d-none");
    getElement(".miengThanTai").classList.add("d-none");
  } else if (productType === 2) {
    getElement(".miengSjc").classList.remove("d-none");
    getElement(".miengThantai").classList.remove("d-none");
    getElement(".nhanSjc").classList.add("d-none");
  } else {
    getElement(".miengThantai").classList.remove("d-none");
    getElement(".nhanSjc").classList.add("d-none");
    getElement(".miengSjc").classList.add("d-none");
  }
}

function getElement(selector) {
  return document.querySelectorAll(selector);
}
