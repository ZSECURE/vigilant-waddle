// Shopping cart state
let cart = [];

// Initialize Stripe
// WARNING: This API key is exposed in client-side code. In a production environment,
// only use publishable keys (pk_test_* or pk_live_*), never secret keys (sk_*).
// The key below should be a Stripe PUBLISHABLE key only.
const stripe = Stripe('ABCD-1234-EFGH-5678');

// Cart functions
function addToCart(productId, productName, priceInCents) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: priceInCents,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutButton.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${(item.price / 100).toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutButton.disabled = false;
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${(total / 100).toFixed(2)}`;
    
    // Save cart to localStorage
    localStorage.setItem('airGuitarCart', JSON.stringify(cart));
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Stripe Checkout
async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    try {
        // Show loading state
        const checkoutButton = document.getElementById('checkout-button');
        const originalText = checkoutButton.textContent;
        checkoutButton.textContent = 'Processing...';
        checkoutButton.disabled = true;
        
        // In a real implementation, you would call your backend API here
        // to create a Stripe Checkout session
        // For this demo, we'll simulate the process
        
        // Simulated backend call
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart
            })
        }).catch(() => {
            // If backend doesn't exist, show demo message
            throw new Error('Backend not configured');
        });
        
        if (response.ok) {
            const session = await response.json();
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            
            if (result.error) {
                alert(result.error.message);
            }
        } else {
            throw new Error('Failed to create checkout session');
        }
        
    } catch (error) {
        console.error('Checkout error:', error);
        
        // Show demo message since we don't have a real backend
        alert(`Demo Mode: Stripe Checkout Integration Ready!

In a production environment, this would:
1. Send your cart to the backend server
2. Create a Stripe Checkout session
3. Redirect you to Stripe's secure payment page

Current cart total: ${document.getElementById('cart-total').textContent}

To implement full Stripe integration:
1. Set up a backend server (Node.js, Python, etc.)
2. Install Stripe SDK on your server
3. Create a /create-checkout-session endpoint
4. Add your Stripe secret key to the server
5. Replace the Stripe publishable key in this file

Cart items:
${cart.map(item => `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity / 100).toFixed(2)}`).join('\n')}

Remember: This is a satirical website - no physical products will be shipped! 🎸`);
        
        // Reset button
        const checkoutButton = document.getElementById('checkout-button');
        checkoutButton.textContent = 'Proceed to Checkout';
        checkoutButton.disabled = false;
    }
}

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('airGuitarCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCart);

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar.classList.contains('active') && 
        !cartSidebar.contains(e.target) && 
        !cartIcon.contains(e.target)) {
        // Don't close if clicking on cart buttons
        if (!e.target.closest('.cart-item-quantity') && 
            !e.target.closest('.remove-item') &&
            !e.target.closest('.checkout-button')) {
            const overlay = document.getElementById('cart-overlay');
            if (overlay.contains(e.target)) {
                toggleCart();
            }
        }
    }
});
