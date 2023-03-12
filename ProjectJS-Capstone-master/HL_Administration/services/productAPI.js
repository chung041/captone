URL1 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/products";
URL2 = "https://63f47a4c55677ef68bbcc8ea.mockapi.io/mihong"; //Price

function apiCreateProduct(product) {
  return axios({
    method: "POST",
    url: URL1,
    data: product,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    method: "DELETE",
    url: `${URL1}/${productId}`,
  });
}

function apiGetProductById(productId) {
  return axios({
    method: "GET",
    url: `${URL1}/${productId}`,
  });
}

function apiUpdateProduct(productId, product) {
  return axios({
    method: "PUT",
    url: `${URL1}/${productId}`,
    data: product,
  });
}
