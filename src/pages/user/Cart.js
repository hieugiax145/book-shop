import React, { useState } from "react";
import "./Cart.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const mockCart = [
  {
    sachId: 1,
    ten: "Dế mèn phiêu lưu ký",
    price: 20000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
    quantity: 1,
  },
  {
    sachId: 2,
    ten: "Tắt đèn",
    price: 78000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
    quantity: 1,
  },
  {
    sachId: 3,
    ten: "Chiếc lược ngà",
    price: 50000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
    quantity: 1,
  },
];

const formatCurrency = (num) => num.toLocaleString("vi-VN") + "đ";

const Cart = () => {
  const [cart, setCart] = useState(mockCart);

  const handleQuantity = (id, value) => {
    const newQuantity =
      typeof value === "number"
        ? Math.max(1, value)
        : Math.max(1, parseInt(value) || 1);

    setCart((prev) =>
      prev.map((item) =>
        item.sachId === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.sachId !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">SẢN PHẨM ĐÃ THÊM</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.sachId} className="cart-item">
            <img
              src={item.hinhAnh}
              alt={item.ten}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.ten}</div>
              <div className="cart-item-price">
                {formatCurrency(item.price)}
              </div>
            </div>
            <div className="cart-item-quantity-controls">
              <button
                onClick={() => handleQuantity(item.sachId, item.quantity - 1)}
                className="cart-qty-btn"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantity(item.sachId, e.target.value)}
                className="cart-qty-input"
              />
              <button
                onClick={() => handleQuantity(item.sachId, item.quantity + 1)}
                className="cart-qty-btn"
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              {formatCurrency(item.price * item.quantity)}
            </div>
            <IconButton
              variant="contained"
              color="error"
              sx={{ borderRadius: "5px" }}
              onClick={() => handleRemove(item.sachId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          Tổng tiền :{" "}
          <span className="cart-total-value">{formatCurrency(total)}</span>
        </div>
        <div className="cart-actions">
          <button className="cart-action-btn cart-continue-btn">
            Tiếp Tục Mua Hàng
          </button>
          <button className="cart-action-btn cart-confirm-btn">
            <Link to="/payment">Xác Nhận</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
