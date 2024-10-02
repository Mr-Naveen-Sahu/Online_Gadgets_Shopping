

const productTemplate = document.querySelector("#productTemplate");
const ProductContainer = document.querySelector(".max");



fetch('./product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(productss => {
    showProductContainer(productss);
    
    //myFucn(productss);
  })
  .catch(error => console.log('Error fetching the JSON file:', error));


// ===========================show contain======================
const showProductContainer = (param) => {

  ProductContainer.innerHTML = param.map((m) =>

    ` 
    
    <div class="Product-container">

      <div id="product-info">

        <div class="cards" id="cardValue">


          <span class="category" style="background-color: plum; border-radius: 7px; border: 1px solid rgb(32, 28, 29); padding: 2px 3px;">${m.Category}</span>

          <div class="image-container" style="padding: 5px 5px; display:flex; justify-content:center; aline-item:centr; ">
            <img class="product-image" src="${m.photo}" width="150px" height="150px" alt="" />
          </div>
                                    
          <h3 class="product-name">${m.name}</h3><br>

          <div class="product-rating">
            <i class="fa-solid fa-star fa-sm" style="color: blue"></i>
            <i class="fa-solid fa-star fa-sm" style="color: blue"></i>
            <i class="fa-solid fa-star fa-sm" style="color: blue"></i>
            <i class="fa-solid fa-star fa-sm" style="color: blue"></i>
            <i class="fa-solid fa-star fa-sm" style="color: blue"></i>
          </div>

          <p class="product-dercription"  >${m.Description}</p><br>

          <div class="product-element" style="display: flex; gap:15px">
            <p class="product-price" style="font-weight: bold;">₹${m.Price}</p>
            <p class="product-actual-price" style="font-weight: bold;  text-decoration: line-through;">₹${m.Price * 8}</p>
          </div><br>

          <div class="product-Stock-element" style="display: flex; gap:14px; font-weight: bold">
            <p class="product-property">Total Stocks Available:</p>
            <p class="product-stock">${m.Stock}</p>
          </div><br>

          <div class="product-quantity-element">
          <div><p class="product-property">Quantity(prices)</p> </div>
            <div class="stock-elemnt">
              <button class="cart-increment">+</button>
               <p style="font-size: 21px; margin-bottom: 22px;" class="product-quantity" data-quantity="1" >0<p>
              <button class="cart-decrement">-</button>
            </div>
          </div><br>

          <div class="add-to-cart " style="background-color: grey; width:52%; border-radius:6px;">
            <button class="button" style="padding: 5px 3px; border-radius: 6px;background-color: transparent; "><i class="fa-solid fa-cart-shopping fa-l">Add To Cart</i></button>

          </div>


        </div>

      </div>

    </div>
    `
  );

 
  param.map((v) => {
    const cardElement = document.querySelector("#cardValue");
    cardElement.setAttribute("id", `card${v.id}`);
    const stockElement = cardElement.querySelector(".stock-elemnt");
    stockElement.addEventListener('click', (event) => {
      hoeQuantityToggle(event, v.id, v.Stock);
    });

  });


  param.map((v) => {
    const cardElement = document.querySelector(`#card${v.id}`);
    // console.log(cardElement)
    const add = cardElement.querySelector(".add-to-cart");
    //console.log(add);


    add.addEventListener("click", (e) => {
      addToCart(e, v.id, v.Stock);
    });
  });


};

// ===========================show contain======================




 
   
// ====================Addto card function==========
getCartProductFromLs();
 // ==================== Add to Cart Function ===========
function addToCart(e, id, stock) {
  let arLocalStorageProduct = getCartProductFromLs();
  const currentCard = document.querySelector(`#card${id}`);
  let quantity = currentCard.querySelector(".product-quantity").innerText;
  let price = currentCard.querySelector(".product-price").innerText;
  price = price.replace("₹", "");

  // check if user click same item then it will show
  let existingProduct = arLocalStorageProduct.find((curr) => curr.id === id);

  if (existingProduct && quantity > 1) {
     quantity = Number(existingProduct.quantity) + Number(quantity);
     price = Number(price * quantity);
     price = price.toFixed(2);
     let update = {id,quantity,price};
     update = arLocalStorageProduct.map((cu)=>{
      return cu.id === id ? update : cu;
     });

     localStorage.setItem("cartProductLS",JSON.stringify(update));
    
  }

  if(existingProduct){
    return false;
  }

  

  price = Number(price) * Number(quantity);
  price = price.toFixed(2);
  quantity = Number(quantity);

  arLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem(`cartProductLS`, JSON.stringify(arLocalStorageProduct));
  updateCartValue(arLocalStorageProduct);
}

function updateCartValue(cart) {
  const cartIcon = document.querySelector(".nav-link");
  cartIcon.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${cart.length} </i>`;
}

function getCartProductFromLs() {
  let cartProduct = localStorage.getItem("cartProductLS");

  if (!cartProduct) {
    updateCartValue([]);
    return [];
  }

  const parsedCartProduct = JSON.parse(cartProduct);
  updateCartValue(parsedCartProduct);
  return parsedCartProduct;
}





 




// ===============choosing the quentity==========================
const hoeQuantityToggle = (e, id, stock) => {
  const currentEl = document.querySelector(`#card${id}`);
  // console.log(currentEl);

  const productQuentity = currentEl.querySelector(".product-quantity");
  //console.log(productQuentity);
  let quantity = parseInt(productQuentity.getAttribute("data-quantity")) || 1;
  //console.log(quantity);
  if (e.target.className === "cart-increment") {

    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
    }
  }

  if ((e.target.className === "cart-decrement")) {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  productQuentity.innerText = quantity;
  productQuentity.setAttribute("data-quantity", quantity.toString());
  return quantity;

};
// ========================end of the code==========================


// =========================add to cart js==========

fetch('./product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(productss => {
     
    myFucn(productss);
  })
  .catch(error => console.log('Error fetching the JSON file:', error));


  const myFucn = (cu) => {
    const comeOut = document.querySelector(".come-out");
     //remove.addEventListener('click',removeCart(cu.id));
  
    if (!comeOut) {
      console.log("Element with class 'come-out' not found!");
      return;
    }
  
    let cartProduct = getCartProductFromLs();
    
    let filterProducts = cu.filter((n) => {
      return cartProduct.some((m) => m.id === n.id);
    });
  
    comeOut.innerHTML = filterProducts.map((g) => {
      let { quantity, price } = getOriginalQuantityAndPrice(g.id);
  
      return `
        <div class="cards" id="cardValue" style="display: flex; width: 100%; gap:35px; border: 1px solid pink; justify-content: center; align-items: center;">
          <div> 
            <span class="category" style="background-color: plum; border-radius: 7px; border: 1px solid rgb(32, 28, 29); padding: 2px 3px;">${g.Category}</span>
          </div>

          <div class="image-container" style="padding: 5px 5px;">
            <img class="product-image" src="${g.photo}" width="100px" alt="${g.name}" />
          </div>

          <h2 class="product-name">${g.name}</h2><br>

          <div class="product-element" style="display: flex; gap:15px">
            <p class="product-price" style="font-weight: bold;">${price !== null ? price : g.Price}</p>
          </div><br>
          
       
            <div class="stock-elemnt" style="width: 150px;">
              <button class="cart-increment" style="width: 25%;">+</button>
              <div><span style="width: 25%; margin-right: 19px; text-align: center;" class="product-quantity">${quantity}</span></div>
              <button class="cart-decrement" style="width: 25%;">-</button>
            </div>
            
     

          <div class="add-to-cart remove-cart-button">
            <button  style="padding: 10px 5px; border-radius: 6px; width: 150px; height: 28px; text-align: center;">Remove</button>
          </div>
          
        </div>
      `;
    }).join('');
       
     filterProducts.forEach((curr)=>{
     
      const {Category,id,photo,name, Stock,Price}=curr;
     
        const cardElement = document.querySelector("#cardValue");
        cardElement.setAttribute("id", `card${id}`);
        const stockElement = cardElement.querySelector(".remove-cart-button");
        stockElement.addEventListener("click", ()=>removeCart(id));
        
    
     })

     filterProducts.forEach((curr)=>{
     
      const {Category,id,photo,name, Stock,Price}=curr;
     
        const cardElement = document.querySelector(`#card${id}`);
        const stockElement = cardElement.querySelector(".stock-elemnt");
        stockElement.addEventListener("click", (e)=>{
               incrementDecrement(e,id,Stock,Price);
        });
        
    
     })

     updateCartProductTotal();
  
  };
  


const getOriginalQuantityAndPrice = (id) => {
  let cartProducts = getCartProductFromLs();
  let product = cartProducts.find((item) => item.id === id);

  if (product) {
    return {
      quantity: product.quantity,
      price: product.price
    };
  } else {
    return {
      quantity: 1, // Default quantity
      price: null  // Default price or handle as you wish
    };
  }
};



const removeCart = (e)=>{
   console.log("naveen")
  let cartProduct = getCartProductFromLs();
  cartProduct = cartProduct.filter((cu)=> cu.id !== e);
  localStorage.setItem("cartProductLS", JSON.stringify(cartProduct));
  let removeDiv = document.getElementById(`card${e}`);
  if(removeDiv){
    removeDiv.remove();
  }
  updateCartValue(cartProduct);
}


const incrementDecrement = (e,id,stock,price)=>{
    console.log("nan")
     const currentCard = document.querySelector(`#card${id}`);
     const product = currentCard.querySelector(".product-quantity");
     const productPrice = currentCard.querySelector(".product-price");

     let quantity = 1;
     let localStoragePrice = 0;
     let cartProduct = getCartProductFromLs();
     let exit = cartProduct.find((curr)=> curr.id ===id);

     if(exit){
       quantity = exit.quantity;
       localStoragePrice = exit.price;
     } else {
          localStoragePrice = price;
          price = price;
     }

     if (e.target.className === "cart-increment") {

      if (quantity < stock) {
        quantity += 1;
      } else if (quantity === stock) {
        quantity = stock;
        localStoragePrice = price * stock;
      }
    }

    if ((e.target.className === "cart-decrement")) {
      if (quantity > 1) {
        quantity -= 1;
      }
    }

    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice);

    let updateCart = { id, quantity, price : localStoragePrice};
    updateCart = cartProduct.map((cu)=>{
      return cu.id === id ? updateCart : cu;
    });

    localStorage.setItem("cartProductLS", JSON.stringify(updateCart));
  
  product.innerHTML = quantity;
  productPrice.innerHTML = localStoragePrice;
  updateCartProductTotal();
}

const updateCartProductTotal =  ()=>{
  let localProduct = getCartProductFromLs();
  const init = document.querySelector(".init");
  const final = document.querySelector(".final");
  let initial = 0;
  let totalPricse = localProduct.reduce((accum,cur)=>{
    let productPrice = parseInt(cur.price) || 0;
    return accum + productPrice;
  }, initial);

  init.textContent = `₹${totalPricse}`;
  final.textContent = totalPricse + 50;
}