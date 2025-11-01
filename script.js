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


const recipeHTML = document.getElementById('main_dishes');  // Zugreifen auf den Bereich der Hauptgerichte
let cart = [];                                              // Leeres Array für den Warenkorb
const deliveryCost = 5.00;                                  // Konstanter Wert für die Lieferkosten

// Overlay-Elemente
const cartOverlay = document.getElementById('cart_overlay'); // Zugreifen auf Warenkorb Overlay

function toggleCart() {                                     // Funktion um Warenkorb Overlay zu öffnen oder zu schließen
    cartOverlay.classList.toggle('d_none');                 // Fügt CSS Klasse d_none hinzu oder entfernt sie (toogle)
}

function init() {                                           // init Function, welche beim Laden der Seite die Gerichte dynamisch auf die Seite bringt                     
   recipes.forEach((recipe, index) => {                     // Schleife geht durch alle Rezept, übergibt sie ans HTML mit dem Index
      recipeHTML.innerHTML += getRecipeHTML(recipe, index);
   });
   updateCart();
}


function addToCart(index) {                                 // Funktion um ein Gericht in den Warenkorb zu legen
   let selectedRecipe = recipes[index];                     // Gericht aus dem recipes Array suchen
   let existingElement = cart.find(element => element.name === selectedRecipe.name);   // Schauen ob es im Cart bereits ist
   if (existingElement) {                                      // Wenn ja,
      existingElement.quantity++;                              // Menge erhöhen
   } else {                                                 // Ansonsten, 
      cart.push({ ...selectedRecipe, quantity: 1 });        // Neues Objekt mit Menge 1 hinzufügen
   }
   updateCart();                                            // Ruft funktion auf um Warenkorb zu aktualisieren
}

function removeFromCart(index) {                            // Beim auf das '-' klicken wird die Funktion aufgerufen, verringert Menge bzw. entfernt bei 0 das Gericht
   let element = cart[index];
   element.quantity--;
   if (element.quantity <= 0) {                             // Prüft, ob Menge kleinergleich 0, wenn ja, 
      cart.splice(index, 1);                                // Aus Cart Array entfernen
   }
   updateCart();                                            // Funktion aufrufen um Cart zu updaten
}

function deleteFromCart(index) {                            // Beim auf den Mülleimer wird die Funktion aufgerufen, entfernt das Gericht aus dem Warenkorb
   cart.splice(index, 1);                                   // Komplettes Rezept aus dem Warenkorb entfernen
   updateCart();                                            // Funktion aufrufen um Cart zu updaten
}

function updateCart() {
    const cartAreas = [
        document.getElementById('cart_sidebar'),
        document.getElementById('cart_overlay_content')
    ];

    cartAreas.forEach(area => {
        if (!area) return;                                          // falls der Bereich nicht existiert
        area.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {                             // Alle Cart-Items einfügen
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            area.innerHTML += getCartHTML(item, index, itemTotal);
        });
      
        if (cart.length > 0) {                                      // Gesamtsumme / Liefersumme
            let total = subtotal + deliveryCost;
            area.innerHTML += cartSumHTML(subtotal, deliveryCost, total);
        } else {
            area.innerHTML += elseHtml();
        }
    });
};

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