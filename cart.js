// Simple cart helper using localStorage
const CART_KEY = 'office_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const found = cart.find(i => i.id === id);
  if (found) {
    found.qty = Number(found.qty) + Number(qty);
  } else {
    cart.push({ id: id, qty: Number(qty) });
  }
  saveCart(cart);
  showCartAddedToast();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = getCart();
  const found = cart.find(i => i.id === id);
  if (found) {
    found.qty = Number(qty);
    if (found.qty <= 0) removeFromCart(id);
  }
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function formatCurrencyBR(value) {
  // value is number (BRL) - returns string like 'R$ 1.234,56'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// compute totals given a products map { id: { priceNumber } }
function computeTotals(productsMap) {
  const cart = getCart();
  let subtotal = 0;
  cart.forEach(item => {
    const p = productsMap[item.id];
    const price = p && p._priceNumber != null ? p._priceNumber : parsePriceBR(p && p.price);
    subtotal += price * item.qty;
  });
  // Placeholder: no taxes, no shipping for now
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;
  return { subtotal, shipping, discount, total };
}

function parsePriceBR(str) {
  // Accept 'R$ 1.234,56' or 'R$1.234,56' or '149,90' etc.
  if (!str && str !== 0) return 0;
  try {
    return Number(String(str).replace(/[^0-9,-]+/g, '').replace('.', '').replace(',', '.'));
  } catch (e) {
    return 0;
  }
}

function showCartAddedToast() {
  const el = document.createElement('div');
  el.className = 'cart-toast';
  el.textContent = 'Produto adicionado ao carrinho';
  document.body.appendChild(el);
  // show animation
  setTimeout(() => { el.classList.add('show'); }, 10);
  setTimeout(() => { el.classList.remove('show'); setTimeout(()=>el.remove(),300); }, 1800);
}

// expose for pages
window.getCart = getCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.clearCart = clearCart;
window.formatCurrencyBR = formatCurrencyBR;
window.computeTotals = computeTotals;
window.parsePriceBR = parsePriceBR;
