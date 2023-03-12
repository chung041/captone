// Định nghĩa Product constructor
function Product(
  id,
  name,
  price,
  goldPurity,
  weight,
  size,
  img,
  description,
  quantity,
  codeProduct
) {
  // Khai báo các thuộc tính (properties)
  this.id = id;
  this.name = name;
  this.price = price;
  this.goldPurity = goldPurity;
  this.weight = weight;
  this.size - size;
  this.img = img;
  this.description = description;
  this.quantity = quantity;
  this.codeProduct = codeProduct;
}

// Constructor Price
function Price(buyingPrice, sellingPrice, code, dateTime) {
  this.buyingPrice = buyingPrice;
  this.sellingPrice = sellingPrice;
  this.code = code;
  this.dateTime = dateTime;
}
