const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let products = [
  {
    id: crypto.randomUUID(),
    name: "Grapes",
    price: 1.88,
    image: "https://picsum.photos/id/75/250",
  },
  {
    id: crypto.randomUUID(),
    name: "Raspberry",
    price: 1.99,
    image: "https://picsum.photos/id/429/250",
  },
  {
    id: crypto.randomUUID(),
    name: "Oranges",
    price: 2.88,
    image:
      "https://th.bing.com/th/id/OIP.YYoiK9cpWHYIom8yvESP3gHaFi?pid=ImgDetMain",
  },
  {
    id: crypto.randomUUID(),
    name: "Bananas",
    price: 0.59,
    image:
      "https://th.bing.com/th/id/R.38968ac83fd4f68db0e776f2db31ef70?rik=iko4t%2bG%2frQ1dOw&pid=ImgRaw&r=0",
  },
];
// display all products
app.get("/products", (req, res) => {
  res.render("products/index", { products });
});
// display form to create a new product
app.get("/products/new", (req, res) => {
  res.render("products/new");
});
// create new product
app.post("/products", (req, res) => {
  const { name, price, image } = req.body;
  products.push({ name, price, image, id: crypto.randomUUID() });
  res.redirect("/products");
});
// display single product details
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  res.render("products/show", { product });
});
// display form to edit a product
app.get("/products/:id/edit", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  res.render("products/edit", { product });
});
// Handle the form submission to update a product
app.post("/products/:id/edit", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const product = products.find((p) => p.id === id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
  }

  res.redirect("/products");
});
/// Handle the form submission to update a product
app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const product = products.find((p) => p.id === id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
  }

  res.redirect(`/products/${id}`);
});
// Handle the form submission to delete a product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProductList = products.filter((p) => p.id !== id);
  products = updatedProductList;
  res.redirect("/products");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
