import React, { useState, useEffect } from "react";
import "./Cart.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import apiServices from "../../services/apiServices";
import { toast } from "react-toastify";
import CommonUtils from "../../utils/CommonUtils";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const response = await apiServices.getCart();
    if (response.success) {
      setCart(response.data.giohangs);
    }
  };

  const handleQuantity = async (id, value) => {
    const newQuantity =
      typeof value === "number"
        ? Math.max(1, value)
        : Math.max(1, parseInt(value) || 1);

    try {
      const response = await apiServices.addToCart({
        sachId: id,
        soLuong: newQuantity,
      });
      if (response.success) {
        // toast.success("Cập nhật số lượng thành công");
        setCart((prev) =>
          prev.map((item) =>
            item.sachId === id ? { ...item, soLuong: newQuantity } : item
          )
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sách vào giỏ hàng");
      return;
    }
    navigate("/payment", { state: { cartItems: cart, total: total } });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.sachId !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.sach.donGia * item.soLuong,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">SÁCH ĐÃ THÊM VÀO GIỎ HÀNG</h1>
      <div className="cart-list">
        {cart.length === 0 ? (
          <div className="cart-empty" style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "red" }}>Giỏ hàng trống</div>
        ) : (
          <>
        {cart.map((item) => (
          <div key={item.sachId} className="cart-item">
            <img
              src={`${process.env.REACT_APP_API_URL}/${item.sach.hinhAnh}`}
              alt={item.sach.ten}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.sach.ten}</div>
              <div className="cart-item-price">
                {CommonUtils.formatPrice(item.sach.donGia)}
              </div>
            </div>
            <div className="cart-item-quantity-controls">
              <button
                onClick={() => handleQuantity(item.sachId, item.soLuong - 1)}
                className="cart-qty-btn"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.soLuong}
                onChange={(e) => handleQuantity(item.sachId, e.target.value)}
                className="cart-qty-input"
              />
              <button
                onClick={() => handleQuantity(item.sachId, item.soLuong + 1)}
                className="cart-qty-btn"
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              {CommonUtils.formatPrice(item.sach.donGia * item.soLuong)}
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
        </>
        )}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          Tổng tiền :{" "}
          <span className="cart-total-value">{CommonUtils.formatPrice(total)}</span>
        </div>
        <div className="cart-actions">
          <button
            className="cart-action-btn cart-confirm-btn"
            onClick={handlePayment}
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
