import "./Payment.css";
import { useState } from "react";

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

const Payment = () => {
  const [cart, setCart] = useState(mockCart);
  return (
    <div className="payment-container">
      <h1 className="payment-title">THÔNG TIN THANH TOÁN</h1>
      <div className="payment-content">
        <div className="payment-list-book">
          <h2>Sản phẩm đã chọn</h2>
          {cart.map((book) => (
            <div className="payment-list-book-item">
              <img
                src={book.hinhAnh}
                alt={book.ten}
                className="payment-list-book-item-image"
              />
              <div className="payment-list-book-item-info">
                <div className="payment-list-book-item-name">{book.ten}</div>
                <div className="payment-list-book-item-price">
                  {book.price.toLocaleString("vi-VN", {
                    minimumFractionDigits: 0,
                  })}
                  VNĐ
                </div>
              </div>
              <div className="payment-list-book-item-quantity">
                x{book.quantity}
              </div>
              <div className="payment-list-book-item-total">
                {(book.price * book.quantity).toLocaleString("vi-VN", {
                  minimumFractionDigits: 0,
                })}
                VNĐ
              </div>
            </div>
          ))}
        </div>
        <div className="payment-info">
          <h2>Thông tin khách hàng</h2>
        </div>
      </div>
    </div>
  );
};

export default Payment;
