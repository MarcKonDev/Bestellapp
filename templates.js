function getRecipeHTML(recipe, index) {
    return `
                <div class="recipe_design">
                    <span onclick="addToCart(${index})" class="add_to_cart">+</span>
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description}</p>
                    <p class="price_design">${recipe.price.toFixed(2).replace('.', ',')}€</p>
                </div>
            `;
};

function getCartHTML(item, index, itemTotal) {
    return `
                <div class="cart-item">
                    <div class="cart-item-line">
                        <span class="cart-name">${item.name}</span>
                        <span class="cart-price">${itemTotal.toFixed(2).replace('.', ',')}€</span>
                    </div>
                    <div class="cart-controls">
                        <button class="minus" onclick="removeFromCart(${index})">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="plus" onclick="addToCart(${recipes.findIndex(r => r.name === item.name)})">+</button>
                        <button class="delete" onclick="deleteFromCart(${index})">🗑️</button>
                    </div>
                </div>
            `;
    
};

function cartSumHTML(subtotal, deliveryCost, total) {
    return  `
                <hr>
                <div class="cart-summary">
                    <div class="subtotal"><strong>Zwischensumme:</strong> ${subtotal.toFixed(2).replace('.', ',')}€</div>
                    <div class="delivery"><strong>Lieferkosten:</strong> ${deliveryCost.toFixed(2).replace('.', ',')}€</div>
                    <div class="total"><strong>Gesamt:</strong> ${total.toFixed(2).replace('.', ',')}€</div>
                </div>
                <div class="cart-actions">
                    <button class="checkout-button" onclick="checkout()">Jetzt bestellen</button>
                </div>
            `;
    
};

function elseHtml() {
    return `<p class="cart_note">Dein Warenkorb ist leer..</p>`;
};