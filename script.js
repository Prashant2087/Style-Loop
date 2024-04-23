document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.querySelector("form");
  const emailInput = document.getElementById("form2Example1");
  const passwordInput = document.getElementById("form2Example2");
  const signInButton = document.querySelector(".btn-primary");

  signInButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (
      emailInput.value === "prashantyadav2069@gmail.com" &&
      passwordInput.value === "19697"
    ) {
      alert("Login Successfully");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = scrollLink.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      const offset = targetElement.offsetTop;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });
});

let listProductHTML = document.querySelectorAll(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductHTML.forEach((list) => {
    list.addEventListener("click", (event) => {
      let positionClick = event.target;
      if (positionClick.classList.contains("addCart")) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
      }
    });
  });
};

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let productElement = document.querySelector(
        `.item[data-id="${item.product_id}"]`
      );
      let info = {
        image: productElement.querySelector("img").src,
        name: productElement.querySelector("p").textContent,
        price: parseFloat(
          productElement.querySelector(".price").textContent.replace("₹", "")
        ),
      };

      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
          <div class="image">
                  <img src="${info.image}">
              </div>
              <div class="name">
              ${info.name}
              </div>
              <div class="totalPrice">₹${info.price * item.quantity}</div>
              <div class="quantity">
                  <span class="minus"><</span>
                  <span>${item.quantity}</span>
                  <span class="plus">></span>
              </div>
          `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  addDataToHTML();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    addCartToHTML();
  }
};

initApp();
