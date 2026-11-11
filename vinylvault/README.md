# CSI 3150: Assignment 3A

**Bryce Benedetto**  
Professor Amartya Sen  
11-18-26

---

## Section 1: Project Setup & Execution Instructions

### Prerequisites

- Node.js v22.12 or newer
- npm (included with Node.js)
- Git
- Any web browser

### Installation Instructions

1. Clone the repository from GitHub using:

```bash
   git clone https://github.com/wbenedetto/CSI_3150_Assignment_3
```

2. Navigate to the project directory using `cd CSI_3150_Assignment_3/vinylvault`.
3. Install all required dependencies listed in `package.json` by running `npm install`.
4. Start the Vite development server by running `npm run dev` in the project directory.
5. Verify that the terminal displays a message indicating Vite is ready, along with the URL to visit (typically `http://localhost:5173/`).
6. Open the provided URL in a web browser and verify that the VinylVault storefront loads with the navigation bar, album catalog, and genre filters.
7. Test the application by filtering albums, opening an album's detail page, and navigating to checkout. Verify that each feature works without errors or full-page reloads.

### Project Directory Structure

The root directory contains `index.html`, `package.json`, `vite.config.js`, and `README.md`. The `src` folder contains `main.jsx`, `App.jsx`, and `styles.css`, which initialize, organize, and style the application. The `components` and `pages` folders contain reusable React components and the application's three main pages. The `data` folder contains `albums.js`, which stores the album information used throughout the application.

---

## Section 2: React Component Hierarchy & State Flow Architecture

- **`<App />`** : `src/App.jsx`  
  Calculates total cart item count and manages shared cart state.
  - **State:** `cart` (Array, stores albums and quantities), `isCartOpen` (Boolean, controls cart visibility).
  - **Callbacks:** `handleAddToCart(album, quantity)`, `handleUpdateQuantity(albumId, delta)`, `handleRemoveFromCart(albumId)`, `handleClearCart()`.

  - **`<Navbar>`** : `src/components/Navbar.jsx`  
    Displays VinylVault logo, catalog navigation, and cart button with item count.
    - **State:** None.
    - **Props:** `cartCount` (Number, total items in cart), `onOpenCart` (Function, opens cart drawer).
    - **Event:** `onOpenCart()` when cart button is clicked.

  - **`<Routes>`** : React Router  
    Determines which page appears based on URL.
    - **`<CatalogPage>`** — `src/pages/CatalogPage.jsx`  
      **Route:** `/`. Displays store title, description, genre filter buttons ("All", "Jazz", "Electronic", "Rock", "Classical"), and responsive album grid.
      - **State:** `selectedGenre` (String, currently selected genre, defaults to "All").
      - **Props:** `albums` (Array, available albums), `onAddToCart` (Function, adds selected album to cart).
      - **Event:** `setSelectedGenre(genre)` when filter button is clicked.

      - **`<AlbumCard>`** : `src/components/AlbumCard.jsx`  
        Rendered using `.map()` for each filtered album. Displays album cover, title, artist, genre, price, and Add to Cart button.
        - **State:** None.
        - **Props:** `album` (Object, individual album information), `onAddToCart` (Function, adds album to cart).
        - **Events:** `onAddToCart(album)` when button is clicked, `Link` navigates to `/album/:albumId` when album is selected.

    - **`<AlbumDetailPage>`** : `src/pages/AlbumDetailPage.jsx`  
      **Route:** `/album/:albumId`. Displays album cover, title, artist, price, description, pressing weight, catalog number, speed, and stock status.
      - **State:** `quantity` (Number, selected purchase quantity, defaults to 1).
      - **Props:** `albums` (Array, available albums), `onAddToCart` (Function, adds album to cart).
      - **Events:** `setQuantity(quantity)` when quantity changes, `onAddToCart(album, quantity)` when Add to Cart is clicked.
      - Uses `useParams()` to identify the selected album from the URL.

    - **`<CheckoutPage>`** : `src/pages/CheckoutPage.jsx`  
      **Route:** `/checkout`. Displays itemized order summary, calculated totals, shipping/payment form, and order confirmation.
      - **State:** `formData` (Object, stores full name, address, city, postal code, and card details), `isSubmitted` (Boolean, tracks successful order submission).
      - **Props:** `cart` (Array, current cart items), `onClearCart` (Function, empties cart).
      - **Events:** `handleChange(event)` updates form inputs, `handleSubmit(event)` prevents page reload, validates required fields, clears cart through `onClearCart()`, and displays confirmation.

  - **`<CartDrawer>`** : `src/components/CartDrawer.jsx`  
    Slide-over panel displaying cart items, quantities, individual prices, and calculated subtotal.
    - **State:** None.
    - **Props:** `cart` (Array, cart items), `isOpen` (Boolean, drawer visibility), `onClose` (Function, closes drawer), `onUpdateQuantity` (Function, changes item quantity), `onRemove` (Function, deletes item).
    - **Events:** `onClose()` closes drawer, `onUpdateQuantity(albumId, delta)` increases/decreases quantity, `onRemove(albumId)` removes album, `handleProceedToCheckout()` closes drawer and navigates to `/checkout` using `useNavigate()`.
