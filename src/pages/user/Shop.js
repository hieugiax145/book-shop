import React, { useState, useEffect } from "react";
import "./Shop.css";
import apiServices from "../../services/apiServices";
import { toast } from "react-toastify";
import CommonUtils from "../../utils/CommonUtils";

const Shop = () => {
  const [quantities, setQuantities] = useState({});
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiServices.shopGetBooks();
      if (response.success) {
        setBooks(response.data.sachs);
      }
    } catch (error) {
      toast.error("Không thể lấy danh sách sách");
    }
  };

  const handleAddToCart = async (id) => {
    const response = await apiServices.addToCart({
      sachId: id,
      soLuong: 1,
    });
    if (response.success) {
      toast.success("Thêm vào giỏ hàng thành công");
    }
  };

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
                {CommonUtils.formatPrice(book.donGia)}
              </div>
              <img
                className="book-image"
                src={`${process.env.REACT_APP_API_URL}/${book.hinhAnh}`}
                alt={book.ten}
              />
              <div className="book-title">{book.ten}</div>
              <div className="book-info">
                <div>
                  <span>{book.tacGia}</span>
                </div>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(book.sachId)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
