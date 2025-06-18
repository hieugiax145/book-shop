import "./Payment.css";
import { useEffect, useState } from "react";
import CustomDialog from "../../components/CustomDialog";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import apiServices from "../../services/apiServices";
import CommonUtils from "../../utils/CommonUtils";

const paymentMethods = [
  { key: "COD", label: "Thanh toán khi nhận hàng (COD)" },
  { key: "BANK", label: "Thanh toán chuyển khoản" },
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    tenKhachHang: "",
    sdt: "",
    email: "",
    diaChiNhanHang: "",
    phuongThucThanhToan: "",
    tongTien: 0,
    ghiChu: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [qrDialog, setQrDialog] = useState({ open: false, countdown: 30 });
  const [error, setError] = useState({
    tenKhachHang: "",
    sdt: "",
    email: "",
    diaChiNhanHang: "",
  });

  useEffect(() => {
    if (location.state?.cartItems?.length === 0) {
      navigate("/cart");
      return;
    }
    setBooks(location.state.cartItems);
  }, [location.state, navigate]);

  useEffect(() => {
    let timer;
    if (qrDialog.open && qrDialog.countdown > 0) {
      timer = setInterval(() => {
        setQrDialog((prev) => ({
          ...prev,
          countdown: prev.countdown - 1,
        }));
      }, 1000);
    } else if (qrDialog.countdown === 0 && qrDialog.open) {
      setQrDialog((prev) => ({ ...prev, open: false }));
      toast.error("Mã QR đã hết hạn. Vui lòng tạo lại!");
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [qrDialog.countdown, qrDialog.open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
    // Clear error for the field being typed in
    setError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const total = books.reduce(
    (sum, book) => sum + book.sach.donGia * book.soLuong,
    0
  );

  const handleConfirmPayment = async () => {
    const response = await apiServices.placeOrder({
      ...form,
      phuongThucThanhToan: paymentMethod,
      tongTien: total,
      chiTietDonHang: books.map((book) => {
        return {
          sachId: book.sachId,
          soLuong: book.soLuong,
          donGia: book.sach.donGia,
        };
      }),
    });
    if (response.success) {
      toast.success("Thanh toán thành công!");
      navigate("/orders", { replace: true });
    } else {
      toast.error(response.message);
    }
  };


  const handlePayment = async (e) => {
    e.preventDefault();
    const error = handleValidate(form);
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }
    if (paymentMethod === "BANK") {
      setQrDialog({
        open: true,
        countdown: 30,
      });

    } else {
      const response = await apiServices.placeOrder({
        ...form,
        phuongThucThanhToan: paymentMethod,
        tongTien: total,
        chiTietDonHang: books.map((book) => {
          return {
            sachId: book.sachId,
            soLuong: book.soLuong,
            donGia: book.sach.donGia,
          };
        }),
      });
      if (response.success) {
        toast.success("Thanh toán thành công!");
        navigate("/orders", { replace: true });
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleValidate = (data) => {
    let error = {};
    if (!data.tenKhachHang) {
      error.tenKhachHang = "Tên không được để trống";
    }
    if (!data.sdt) {
      error.sdt = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(data.sdt)) {
      error.sdt = "Số điện thoại không hợp lệ";
    }
    if (!data.email) {
      error.email = "Email không được để trống";
    } else if (!emailRegex.test(data.email)) {
      error.email = "Email không hợp lệ";
    }
    if (!data.diaChiNhanHang) {
      error.diaChiNhanHang = "Địa chỉ không được để trống";
    }
    return error;
  };

  const phoneRegex = /^0[0-9]{9}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="payment-container">
      <h1 className="payment-title">THÔNG TIN THANH TOÁN</h1>
      <div className="payment-content">
        <div className="payment-list-book">
          <h2>Sách đã chọn</h2>
          {books.map((book) => (
            <div key={book.sachId} className="payment-list-book-item">
              <img
                src={`${process.env.REACT_APP_API_URL}/${book.sach.hinhAnh}`}
                alt={book.sach.ten}
                className="payment-list-book-item-image"
              />
              <div className="payment-list-book-item-info">
                <div className="payment-list-book-item-name">
                  {book.sach.ten}
                </div>
                <div className="payment-list-book-item-price">
                  {CommonUtils.formatPrice(book.sach.donGia)}
                </div>
              </div>
              <div className="payment-list-book-item-quantity">
                x{book.soLuong}
              </div>
              <div className="payment-list-book-item-total">
                {CommonUtils.formatPrice(book.sach.donGia * book.soLuong)}
              </div>
            </div>
          ))}
          <hr
            style={{
              margin: "8px 0",
              border: "none",
              borderTop: "1px solid #e0e0e0",
            }}
          />
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            Tổng tiền:
            <span
              style={{
                textAlign: "right",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#1976d2",
              }}
            >
              {CommonUtils.formatPrice(
                books.reduce(
                  (total, book) => total + book.sach.donGia * book.soLuong,
                  0
                )
              )}
            </span>
          </div>
        </div>
        <div className="payment-info">
          <div className="payment-info-customer">
            <h2>Thông tin thanh toán</h2>

            <div className="form-group">
              <label htmlFor="name">Tên khách hàng</label>
              <input
                type="text"
                id="name"
                name="tenKhachHang"
                onChange={handleChange}
                required
              />
              {error.tenKhachHang && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {error.tenKhachHang}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                id="phone"
                name="sdt"
                onChange={handleChange}
                required
              />
              {error.sdt && (
                <span style={{ color: "red", fontSize: 12 }}>{error.sdt}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
              {error.email && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {error.email}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="diaChiNhanHang"
                onChange={handleChange}
                required
              />
              {error.diaChiNhanHang && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {error.diaChiNhanHang}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="note">Ghi chú</label>
              <input
                type="text"
                id="note"
                name="ghiChu"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Payment Method Selection */}
          <div className="payment-method-group">
            <h2>Phương thức thanh toán</h2>

            <div
              style={{
                border: "1px solid #90caf9",
                borderRadius: 12,
                padding: 12,
                marginBottom: "2px",
                background: paymentMethod === "COD" ? "#e3f2fd" : "#fff",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  style={{ marginRight: 8 }}
                />
                {paymentMethods.find((method) => method.key === "COD").label}
              </label>
              {paymentMethod === "COD" && (
                <div
                  style={{
                    marginLeft: 28,
                    marginTop: 8,
                    background: "#f5f5f5",
                    padding: 8,
                    borderRadius: 6,
                  }}
                >
                  Khi chọn phương thức này, các bạn sẽ thanh toán trực tiếp cho
                  nhân viên khi nhận hàng!
                </div>
              )}
            </div>
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: 12,
                background: paymentMethod === "BANK" ? "#e3f2fd" : "#fff",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="BANK"
                  checked={paymentMethod === "BANK"}
                  onChange={() => setPaymentMethod("BANK")}
                  style={{ marginRight: 8 }}
                />
                {paymentMethods.find((method) => method.key === "BANK").label}
              </label>
            </div>
          </div>
          <button
            className="payment-button"
            style={{
              width: "100%",
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "1rem",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={handlePayment}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      <CustomDialog
        open={qrDialog.open}
        title="Quét mã QR để thanh toán"
        onClose={() => setQrDialog((prev) => ({ ...prev, open: false }))}
        onConfirm={handleConfirmPayment}
        children={
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={`https://qr.sepay.vn/img?bank=Vietcombank&acc=9988203392&template=compact&amount=${total}&des=`}
              alt="QR Code"
              style={{
                width: "300px",
                height: "300px",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                fontSize: "16px",
                color: "#666",
                marginBottom: "8px",
              }}
            >
              Số tiền: {CommonUtils.formatPrice(total)}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#d32f2f",
                fontWeight: 500,
              }}
            >
              Thời gian còn lại: {qrDialog.countdown}s
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Payment;
