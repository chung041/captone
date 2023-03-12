//Mảng trong giỏ hàng Cart
const URL3 = "https://63e8641bcbdc565873852dbf.mockapi.io/api/productInCart";

function apiGetProductsCart(productCart) {
  return axios({
    method: "GET",
    url: URL3,
    data: productCart,
  });
}

function apiCreateProductCart(productChoose) {
  return axios({
    method: "POST",
    url: URL3,
    data: productChoose,
  });
}

function apiDeleteProductCart(productCartId) {
  return axios({
    method: "DELETE",
    url: `${URL3}/${productCartId}`,
  });
}

function apiGetProductById(productId) {
  return axios({
    method: "GET",
    url: `${URL3}/${productId}`,
  });
}

function apiUpdateProductCart(productCartId, productCart) {
  return axios({
    method: "PUT",
    url: `${URL3}/${productCartId}`,
    data: productCart,
  });
}
