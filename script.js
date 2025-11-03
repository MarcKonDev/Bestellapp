let recipes = [{
   'name': 'Nudeln mit Huhn',
   'description': 'gebratene Nudeln mit Hähnchen und Gemüse',
   'price': 9.50
},
{
   'name': 'Nudeln mit Rind',
   'description': 'gebratene Nudeln mit Rind und Gemüse',
   'price': 10.90
},
{
   'name': 'Nudeln mit Ente',
   'description': 'gebratene Nudeln mit Ente und Gemüse',
   'price': 12.50
},
{
   'name': 'Nudeln vegetarisch',
   'description': 'gebratene Nudeln mit Ei und Gemüse',
   'price': 8.90
},
{
   'name': 'Nudeln vegan',
   'description': 'gebratene Nudeln mit Gemüse',
   'price': 8.00
}
];


const recipeHTML = document.getElementById('main_dishes');  
let cart = [];                                              
const deliveryCost = 5.00;                               
const cartOverlay = document.getElementById('cart_overlay');

function toggleCart() {                                     
    cartOverlay.classList.toggle('d_none');                 
}

function init() {                                                            
   recipes.forEach((recipe, index) => {                     
      recipeHTML.innerHTML += getRecipeHTML(recipe, index);
   });
   updateCart();
}


function addToCart(index) {                                 
   let selectedRecipe = recipes[index];                     
   let existingElement = cart.find(element => element.name === selectedRecipe.name);  
   if (existingElement) {                                      
      existingElement.quantity++;                              
   } else {                                                
      cart.push({ ...selectedRecipe, quantity: 1 });        
   }
   updateCart();                                           
}

function removeFromCart(index) {                           
   let element = cart[index];
   element.quantity--;
   if (element.quantity <= 0) {                             
      cart.splice(index, 1);                               
   }
   updateCart();                                           
}

function deleteFromCart(index) {                            
   cart.splice(index, 1);                                   
   updateCart();                                            
}

function updateCart() {
    const cartAreas = [
        document.getElementById('cart_sidebar'),
        document.getElementById('cart_overlay_content')
    ];

    for (let index = 0; index < cartAreas.length; index++) {
        const area = cartAreas[index];
        if (!area) continue;
        renderCartCost(area);
    }
}

function renderCartCost(area) {
    area.innerHTML = '';
    const subtotal = renderCartHTML(area);

    if (cart.length > 0) {
        const total = subtotal + deliveryCost;
        area.innerHTML += cartSumHTML(subtotal, deliveryCost, total);
    } else {
        area.innerHTML += elseHtml();
    }
}

function renderCartHTML(area) {
    let subtotal = 0;
    for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        area.innerHTML += getCartHTML(item, index, itemTotal);
    }
    return subtotal;
}

function checkout() {
    cart = [];
    updateCart();
    
    const cartAreas = [
        document.getElementById('cart_sidebar'),
        document.getElementById('cart_overlay_content')
    ];

    cartAreas.forEach(area => {
        if (!area) return;
        area.innerHTML = orderConfHTML();
    });
}

window.addEventListener('resize', () => {
    const breakpoint = 500;
    if (window.innerWidth >= breakpoint) {
        if (!cartOverlay.classList.contains('d_none')) {            // Overlay schließen, wenn es geöffnet ist
            cartOverlay.classList.add('d_none');
        }
    }
});