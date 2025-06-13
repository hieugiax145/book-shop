import React, { useState } from "react";
import "./Shop.css";

const books = [
  {
    sachId: 1,
    ten: "Dế mèn phiêu lưu ký",
    tacGia: "Tô Hoài",
    nhaXuatBan: "Kim Đồng",
    namXuatBan: 2000,
    donGia: 20000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
  },
  {
    sachId: 2,
    ten: "Tắt đèn",
    tacGia: "Ngô Tất Tố",
    nhaXuatBan: "Bibi",
    namXuatBan: 2009,
    donGia: 78000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
  },
  {
    sachId: 3,
    ten: "Chiếc lược ngà",
    tacGia: "Nguyễn Quang Sáng",
    nhaXuatBan: "Hạnh Phúc",
    namXuatBan: 2022,
    donGia: 50000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
  },
  {
    sachId: 4,
    ten: "Chiếc lược ngà",
    tacGia: "Nguyễn Quang Sáng",
    nhaXuatBan: "Hạnh Phúc",
    namXuatBan: 2022,
    donGia: 50000,
    hinhAnh:
      "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/21/base64-17478176868771275704421.png",
  },
];

const Shop = () => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  return (
    <div className="shop-container">
      <h1 className="shop-title">SÁCH MỚI NHẤT</h1>
      <div className="book-container">
        <div className="book-list">
          {books.map((book) => (
            <div className="book-card" key={book.sachId}>
              <div className="book-price">
                {book.donGia.toLocaleString("vi-VN", {
                  minimumFractionDigits: 0,
                })}
                VNĐ
              </div>
              <img className="book-image" src={book.hinhAnh} alt={book.ten} />
              <div className="book-title">{book.ten}</div>
              <div className="book-info">
                <div>
                  <span>{book.tacGia}</span>
                </div>
              </div>
              <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
