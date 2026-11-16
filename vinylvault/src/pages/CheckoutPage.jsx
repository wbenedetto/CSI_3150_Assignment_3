import { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    rewardsNumber: "",
    email: "",
    shippingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const taxes = (subtotal - discount) * 0.06;
  const total = subtotal - discount + taxes;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() !== "") {
      setPromoApplied(true);
      setPromoMessage("Promo code applied.");
    } else {
      setPromoApplied(false);
      setPromoMessage("Please enter a promo code.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          Thank you, {formData.fullName}! Your order has been successfully
          placed. A confirmation email will be sent to {formData.email}. Your
          order will be shipped to {formData.shippingAddress}, {formData.city},{" "}
          {formData.state} {formData.zipCode}. Thank you for shopping at
          VinylVault. For questions please contact questions@vinylvault.com.
        </p>
        <Link className="btn btn-primary" to="/">
          Return to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2> Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout and Order Confirmation</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="fullName">
              {" "}
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rewardsNumber"> Rewards Number (8 digits)</label>
            <input
              type="text"
              name="rewardsNumber"
              id="rewardsNumber"
              pattern="[0-9]{8}"
              value={formData.rewardsNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              {" "}
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">
              {" "}
              Shipping Address <span className="required">*</span>
            </label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">
              State <span className="required">*</span>
            </label>
            <input
              type="text"
              name="state"
              id="state"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">
              {" "}
              Zip Code<span className="required">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              required
              pattern="[0-9]{5}"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <h2>Payment Information</h2>

          <div className="form-group">
            <label htmlFor="cardNumber">
              Card Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              inputMode="numeric"
              pattern="[0-9]{13,19}"
              required
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiration">
              Expiration (MM/YY) <span className="required">*</span>
            </label>
            <input
              type="text"
              name="expiration"
              id="expiration"
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              required
              value={formData.expiration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">
              CVV <span className="required">*</span>
            </label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              inputMode="numeric"
              pattern="[0-9]{3,4}"
              required
              value={formData.cvv}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
        </form>

        <aside className="order-summary-card">
          <h3>Order Summary</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />

          <div className="promo-code">
            <label htmlFor="promoCode">Promo Code</label>
            <div className="promo-row">
              <input
                type="text"
                id="promoCode"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoApplied(false);
                  setPromoMessage("");
                }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            </div>
            <p>{promoMessage}</p>
          </div>
          <div className="summary-row">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>

          {promoApplied && (
            <div className="summary-row">
              <span>Discount (10%):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
