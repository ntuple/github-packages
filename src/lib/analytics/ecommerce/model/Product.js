class Product {
  constructor({
    id,
    name,
    price,
    brand = null,
    category = null,
    variant = null,
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.brand = brand;
    this.category = category;
    this.variant = variant;
  }
}

export default Product;
