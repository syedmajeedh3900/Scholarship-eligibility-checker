import { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (!name.trim() || !price) return;

    const newItem = {
      id: Date.now(),
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price),
    };

    setItems((prev) => [...prev, newItem]);

    setName("");
    setQuantity(1);
    setPrice("");
  };

  const updateQuantity = (id, change) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div className="title">
          <ShoppingCart size={32} />
          <div>
            <h1>Grocery Shopping List</h1>
            <p>Plan your groceries easily</p>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="add-section">
          <h2>Add Grocery Item</h2>

          <div className="form">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="price-input">
              <IndianRupee size={18} />
              <input
                type="number"
                min="0"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <button className="add-button" onClick={addItem}>
              <Plus size={20} />
              Add Item
            </button>
          </div>
        </section>

        <section className="list-section">
          <div className="section-heading">
            <h2>Your Grocery List</h2>
            <span>{items.length} items</span>
          </div>

          {items.length === 0 ? (
            <div className="empty">
              <ShoppingCart size={50} />
              <h3>No items added yet</h3>
              <p>Add your first grocery item above.</p>
            </div>
          ) : (
            <div className="items">
              {items.map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={16} />
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <strong className="item-total">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </strong>

                  <button
                    className="delete"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="total-section">
          <span>Total</span>
          <strong>₹{total.toFixed(2)}</strong>
        </section>
      </main>
    </div>
  );
}

export default App;