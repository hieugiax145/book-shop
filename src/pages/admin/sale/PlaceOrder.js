import React, { useState, useEffect } from "react";
import TableData from "../../../components/TableData";
import SearchBox from "../../../components/SearchBox";
import "../../../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import apiServices from "../../../services/apiServices";
import CustomDialog from "../../../components/CustomDialog";
import { toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";

const tableColumns = [
  <th key="stt">STT</th>,
  <th key="action"></th>,
  <th key="sku">ID</th>,
  <th key="name">TÊN</th>,
  <th key="stock">TỒN KHO</th>,
  <th key="quantity">SỐ LƯỢNG</th>,
  <th key="price">ĐƠN GIÁ</th>,
  <th key="total">THÀNH TIỀN</th>,
];

const paymentMethods = [
  { key: "CASH", label: "Tiền mặt" },
  { key: "BANK", label: "Chuyển khoản" },
];

const PlaceOrder = () => {
  const [selectedPayment, setSelectedPayment] = useState("CASH");
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    tenKhachHang: "",
    sdt: "",
    diaChi: "",
    ghiChu: "",
    khachTra: 0,
    tongTien: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    productId: null,
  });
  const [qrDialog, setQrDialog] = useState({
    open: false,
    countdown: 30,
  });

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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.productId) {
      handleDeleteProduct(deleteDialog.productId);
    }
    setDeleteDialog({ open: false, productId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null });
  };

  const handleQuantityChange = (sachId, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity) || 0;
    const book = books.find((b) => b.sachId === sachId);

    if (parsedQuantity > book.soLuong) {
      toast.error(`Số lượng vượt quá tồn kho (${book.soLuong})`);
      return;
    }

    if (parsedQuantity <= 0) {
      setDeleteDialog({
        open: true,
        productId: sachId,
      });
      return;
    }

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.sachId === sachId ? { ...book, quantity: parsedQuantity } : book
      )
    );
  };

  const handleProductSelect = (selectedBook) => {
    // Check if product already exists in the list
    const existingBook = books.find((b) => b.sachId === selectedBook.sachId);

    if (existingBook) {
      // If product exists, increase its quantity by 1
      handleQuantityChange(selectedBook.sachId, existingBook.quantity + 1);
    } else {
      // If product doesn't exist, add it to the list with quantity 1
      setBooks((prevBooks) => [
        ...prevBooks,
        {
          ...selectedBook,
          quantity: 1,
          batch: `${new Date().toLocaleDateString()} - SL: 1`,
        },
      ]);
    }
  };

  const handleFindBook = async (searchTerm) => {
    try {
      const response = await apiServices.findBook({
        search: searchTerm,
      });
      if (response.success) {
        return response.data.sachs;
      }
      return [];
    } catch (error) {
      console.error("Error searching books:", error);
      return [];
    }
  };


  const handleDeleteProduct = (productId) => {
    setBooks((prevBooks) => prevBooks.filter((p) => p.sachId !== productId));
  };

  const tableRows = books.map((book, idx) => [
    <td key={`stt-${book.sachId}`}>{idx + 1}</td>,
    <td key={`action-${book.sachId}`}>
      <IconButton
        variant="contained"
        color="error"
        sx={{ borderRadius: "5px" }}
      >
        <DeleteIcon
          onClick={() =>
            setDeleteDialog({ open: true, productId: book.sachId })
          }
        />
      </IconButton>
    </td>,
    <td key={`sku-${book.sachId}`}>{book.sachId}</td>,
    <td key={`name-${book.sachId}`}>{book.ten}</td>,
    <td key={`stock-${book.sachId}`}>{book.soLuong}</td>,
    <td key={`quantity-${book.sachId}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <button
          onClick={() => handleQuantityChange(book.sachId, book.quantity - 1)}
          style={{
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            background: "#f5f5f5",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={book.soLuong}
          value={book.quantity}
          onChange={(e) => handleQuantityChange(book.sachId, e.target.value)}
          style={{
            width: "60px",
            padding: "4px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            textAlign: "center",
          }}
        />
        <button
          onClick={() => handleQuantityChange(book.sachId, book.quantity + 1)}
          style={{
            padding: "4px 8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            background: "#f5f5f5",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          +
        </button>
      </div>
    </td>,
    <td key={`price-${book.sachId}`}>{CommonUtils.formatPrice(book.donGia)}</td>,
    <td key={`total-${book.sachId}`}>
      {CommonUtils.formatPrice(book.donGia * book.quantity)}
    </td>,
  ]);

  const total = books.reduce(
    (sum, book) => sum + book.donGia * book.quantity,
    0
  );

  const moneyChange = (money) => {
    return money - total > 0 ? money - total : 0;
  };

  const handlePayment = async () => {
    if (total === 0) {
      toast.error("Vui lòng thêm sách vào đơn hàng!");
      return;
    }
    if (selectedPayment === "bank") {
      setQrDialog({
        open: true,
        countdown: 30,
      });
    } else {
      const response = await apiServices.adminSale({
        ...formData,
        tenKhachHang: formData.tenKhachHang??"Khách lẻ",
        tongTien: total,
        phuongThucThanhToan: selectedPayment,
        chiTietDonHang: books.map((book) => {
          return {
            sachId: book.sachId,
            soLuong: book.quantity,
            donGia: book.donGia,
          };
        }),
      });
      if (response.success) {
        toast.success("Thanh toán thành công!");
        setFormData({
          tenKhachHang: "",
          sdt: "",
          diaChi: "",
          ghiChu: "",
          khachTra: 0,
          tongTien: 0,
        });
        setBooks([]);
      }
    }
  };

  return (
    <div className="sale-screen">
      <div className="sale-content">
        <div className="sale-list-book">
          <SearchBox
            placeholder="Thêm sách mới vào đơn"
            onSelect={handleProductSelect}
            onSearch={handleFindBook}
          />
          <div style={{ marginTop: 16 }}>
            <TableData tableColumns={tableColumns} tableRows={tableRows} />
          </div>
        </div>
        <div className="sale-info">
          <div className="sale-info-form">
            <div className="form-group">
              <label>Tên khách hàng</label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng"
                name="tenKhachHang"
                value={formData.tenKhachHang}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>SĐT</label>
              <input
                type="text"
                placeholder="Nhập sđt"
                name="sdt"
                value={formData.sdt}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Ghi chú</label>
              <input
                type="text"
                placeholder="Nhập ghi chú"
                name="ghiChu"
                value={formData.ghiChu}
                onChange={handleChange}
              />
            </div>
            <hr
              style={{
                margin: "16px 0",
                border: "none",
                borderTop: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div className="sale-info-total">
            <div style={{ fontWeight: 600 }}>
              Tổng tiền
              <span style={{ float: "right" }}>{CommonUtils.formatPrice(total)}</span>
            </div>
            <hr
              style={{
                margin: "16px 0",
                border: "none",
                borderTop: "1px solid #e0e0e0",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 600 }}>
                KHÁCH PHẢI TRẢ
                <span style={{ float: "right", color: "#d32f2f" }}>
                  {CommonUtils.formatPrice(total)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>Tiền khách đưa</div>
                <input
                  style={{
                    width: 100,
                    padding: 1,
                    fontSize: 16,
                    border: "none",
                    borderBottom: "1px solid #2196f3",
                    textAlign: "right",
                    outline: "none",
                  }}
                  type="number"
                  value={formData.khachTra}
                  onChange={handleChange}
                  name="khachTra"
                  min={0}
                  required
                />
              </div>

              <div>
                Tiền thừa trả khách{" "}
                <span style={{ float: "right" }}>
                  {CommonUtils.formatPrice(moneyChange(formData.khachTra))}
                </span>
              </div>
            </div>
            <hr
              style={{
                margin: "16px 0",
                border: "none",
                borderTop: "1px solid #e0e0e0",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 600 }}>Phương thức thanh toán</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {paymentMethods.map((method) => (
                  <button
                    key={method.key}
                    onClick={() => setSelectedPayment(method.key)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: 8,
                      border:
                        selectedPayment === method.key
                          ? "2px solid #d32f2f"
                          : "1px solid #e0e0e0",
                      background:
                        selectedPayment === method.key ? "#ffeaea" : "#fff",
                      color:
                        selectedPayment === method.key ? "#d32f2f" : "#333",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handlePayment}
              style={{
                width: "100%",
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "1rem",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <CustomDialog
        open={deleteDialog.open}
        title="Xóa sách"
        children="Bạn có muốn xóa sách này khỏi đơn hàng?"
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
      <CustomDialog
        open={qrDialog.open}
        title="Quét mã QR để thanh toán"
        onClose={() => setQrDialog((prev) => ({ ...prev, open: false }))}
        children={
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={`https://qr.sepay.vn/img?bank=Vietcombank&acc=9988203392&template=compact&amount=${total}&des=`}
              alt="QR Code"
              style={{
                width: "200px",
                height: "200px",
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

export default PlaceOrder;
