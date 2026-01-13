# 🎸 Air Guitar Emporium

A satirical e-commerce website for purchasing air guitars and air guitar parts. Built with HTML, CSS, JavaScript, and Stripe integration.

## Features

- **Complete Product Catalog:**
  - Fully Built Air Guitars (Stratocaster, Les Paul, Telecaster)
  - Air Guitar Bodies (Strat, Custom Shop)
  - Air Guitar Necks (Maple, Rosewood)
  - Air Pickups (Single Coil, Humbucker, Premium Sets)
  - Air Bridges (Tremolo, Fixed)
  - Air Strings (Light, Medium, Heavy Gauge)

- **Shopping Cart:**
  - Add/remove items
  - Adjust quantities
  - Persistent cart (localStorage)
  - Real-time total calculation

- **Stripe Integration:**
  - Ready for Stripe Checkout
  - Secure payment processing setup
  - Demo mode with instructions

- **Disclaimer:**
  - Clear warning that this is satirical
  - Acknowledgment that no physical products ship

## Getting Started

### View the Website

Simply open `index.html` in your web browser:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or just open the file directly
open index.html
```

Then navigate to `http://localhost:8000` in your browser.

### Setting Up Stripe Integration (Optional)

To enable real Stripe payments:

1. **Get Stripe API Keys:**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your publishable key from the Dashboard

2. **Update the Publishable Key:**
   - Open `script.js`
   - Replace the placeholder key on line 6:
     ```javascript
     const stripe = Stripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY');
     ```

3. **Set Up Backend Server:**
   
   The frontend is ready, but you need a backend to create Stripe Checkout sessions.
   
   Example using Node.js/Express:

   ```javascript
   const express = require('express');
   const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
   const app = express();

   app.use(express.json());
   app.use(express.static('.'));

   app.post('/create-checkout-session', async (req, res) => {
     const { items } = req.body;
     
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items: items.map(item => ({
         price_data: {
           currency: 'usd',
           product_data: {
             name: item.name,
           },
           unit_amount: item.price,
         },
         quantity: item.quantity,
       })),
       mode: 'payment',
       success_url: 'http://localhost:8000/success.html',
       cancel_url: 'http://localhost:8000/cancel.html',
     });

     res.json({ id: session.id });
   });

   app.listen(8000, () => console.log('Server running on port 8000'));
   ```

4. **Install Dependencies:**
   ```bash
   npm install express stripe
   ```

5. **Run the Server:**
   ```bash
   node server.js
   ```

## Important Disclaimer

⚠️ **This is a satirical website.** While real purchases can be made through the payment system, please be aware that **NO PHYSICAL PRODUCTS WILL BE SHIPPED**. Air guitars are, by their very nature, intangible and exist only in the realm of imagination. Any payments made are for entertainment purposes only.

## File Structure

```
.
├── index.html      # Main HTML file with product catalog
├── styles.css      # Styling for the website
├── script.js       # Shopping cart and Stripe integration logic
└── README.md       # This file
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Stripe.js (Payment Processing)
- LocalStorage (Cart Persistence)

## License

This is a satirical project for demonstration purposes. Feel free to use and modify as needed.

---

**Made with ❤️ and a lot of air** 🎸