import "./Orders.css";
import { useState, useEffect } from "react";
import apiServices from "../../services/apiServices";
import CommonUtils from "../../utils/CommonUtils";

const orderStatus = [
  { key: "pending", label: "Chờ xác nhận" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "shipping", label: "Đang giao hàng" },
  { key: "delivered", label: "Đã giao hàng" },
  { key: "completed", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã hủy" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await apiServices.getOrders();
      if (response.success) {
        setOrders(response.data.donhangs);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">ĐƠN HÀNG CỦA BẠN</h1>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <div className="orders-item" key={order.donHangId || idx}>
              <div className="orders-item-header">
                <div className="orders-item-header-title">
                  Đơn hàng {order.donHangId}
                </div>
                <div className="orders-item-header-status">
                  {orderStatus.find((status) => status.key === order.trangThai)
                    ?.label}
                </div>
              </div>
              {order.chitietdonhangs?.map((item, itemIdx) => (
                <div className="orders-product" key={item.sachId || itemIdx}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${item.sach?.hinhAnh}`}
                    alt={item.sach?.ten}
                    className="orders-product-image"
                  />
                  <div className="orders-product-info">
                    <div className="orders-product-title">{item.sach?.ten}</div>
                    <div className="orders-product-qty">x{item.soLuong}</div>
                  </div>
                  <div className="orders-product-price">
                    <span className="orders-product-current-price">
                      {CommonUtils.formatPrice(item.donGia)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="orders-item-footer">
                <div className="orders-item-total">
                  Thành tiền: <span>{CommonUtils.formatPrice(order.tongTien)}</span>
                </div>
                {/* <div className="orders-item-actions">
                  <button>Liên Hệ Người Bán</button>
                  <button>Hủy Đơn Hàng</button>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <div className="orders-item">
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Không có đơn hàng
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
