import SearchBox from "../../../components/SearchBox";
import TableData from "../../../components/TableData";
import { useState, useEffect } from "react";
import apiServices from "../../../services/apiServices";
import InfoRow from "../../../components/common/InfoRow";
import { toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";

const tableColumns = [
  <th>Mã đơn</th>,
  <th>Thời gian</th>,
  <th>Khách hàng</th>,
  // <th>Phân loại</th>,
  <th>Tổng tiền</th>,
  <th>Hình thức thanh toán</th>,
  // <th>Khách đã trả</th>,
  <th>Trạng thái</th>,
];

const orderStatus = [
  { key: "pending", label: "Chờ xác nhận" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "shipping", label: "Đang giao hàng" },
  { key: "delivered", label: "Đã giao hàng" },
  { key: "completed", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã hủy" },
];

const ManageOrders = () => {
  const [listOrders, setListOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await apiServices.adminGetOrders();
      if (response.success) {
        setListOrders(response.data.donhangs);
        console.log(response.data.donhangs);
      }
    };
    fetchOrders();
  }, []);

  const handleRowClick = async (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleChangeStatus = async (orderId, status) => {
    const response = await apiServices.adminUpdateOrder(orderId, {
      trangThai: status,
    });
    if (response.success) {
      toast.success("Cập nhật trạng thái thành công");
      const updatedOrders = listOrders.map((order) =>
        order.donHangId === orderId ? { ...order, trangThai: status } : order
      );
      setListOrders(updatedOrders);
    }
  };

  const tableRows = listOrders.flatMap((order) => {
    const isExpanded = expandedOrderId === order.donHangId;
    const mainRow = [
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        {order.donHangId}
      </td>,
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        {CommonUtils.formatDate(order.ngayDat)}
      </td>,
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        {order.tenKhachHang}
      </td>,
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        {CommonUtils.formatPrice(order.tongTien)}
      </td>,
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        {order.hinhThucThanhToan === "COD"
          ? "Thanh toán khi nhận hàng"
          : order.hinhThucThanhToan === "BANK"
          ? "Thanh toán chuyển khoản"
          : "Tiền mặt"}
      </td>,
      <td
        onClick={() => handleRowClick(order.donHangId)}
        style={{ cursor: "pointer" }}
      >
        <div className="status-memu">
          <div
            className={`status-container ${
              orderStatus.find((status) => status.key === order.trangThai)
                ? order.trangThai
                : ""
            }`}
          >
            {orderStatus.find((status) => status.key === order.trangThai)
              ?.label || "Không xác định"}
          </div>
          {/* <div className="status-dropdown">
            {orderStatus.map((status) => (
              <div className="status-item" key={status.key}>
                {status.label}
              </div>
            ))}
          </div> */}
        </div>
      </td>,
    ];

    if (isExpanded) {
      const detailsRow = [
        <td
          colSpan={tableColumns.length}
          style={{ padding: "20px", backgroundColor: "#f8f9fa" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{ fontWeight: "bold" }}>Thông tin đơn hàng</p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <InfoRow label="Mã đơn" value={order.donHangId} />
                <InfoRow
                  label="Thời gian đặt"
                  value={CommonUtils.formatDate(order.ngayDat)}
                />
                <InfoRow label="Khách hàng" value={order.tenKhachHang} />
                <InfoRow label="Địa chỉ" value={order.diaChiNhanHang} />
                <InfoRow label="Số điện thoại" value={order.sdt} />
                {/* <InfoRow label="Email" value={order.email} /> */}
                <InfoRow label="Ghi chú" value={order.ghiChu} />
                <InfoRow label="Tổng tiền" value={CommonUtils.formatPrice(order.tongTien)} />
                <InfoRow
                  label="Hình thức thanh toán"
                  value={
                    order.hinhThucThanhToan === "COD"
                      ? "Thanh toán khi nhận hàng"
                      : order.hinhThucThanhToan === "BANK"
                      ? "Thanh toán chuyển khoản"
                      : "Tiền mặt"
                  }
                />
                <InfoRow
                  label="Trạng thái"
                  value={
                    orderStatus.find((status) => status.key === order.trangThai)
                      ?.label || "Không xác định"
                  }
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{ fontWeight: "bold" }}>Danh sách sản phẩm</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {order.chitietdonhangs?.map((item) => (
                  <div key={item.sachId} style={{width: "50%", display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${item.sach?.hinhAnh}`}
                      alt={item.sach?.ten}
                      style={{ width: "60px", height: "60px", objectFit: "cover",borderRadius: "8px" }}
                    />
                    <div style={{flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ fontWeight: "bold" }}>{item.sach?.ten}</div>
                      <div style={{ fontSize: "12px" }}>x{item.soLuong}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <span style={{ fontWeight: "bold" }}>
                        {CommonUtils.formatPrice(item.donGia)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              {order.trangThai === "pending" ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#2196f3",
                      border: "none",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChangeStatus(order.donHangId, "confirmed")
                    }
                  >
                    Xác nhận đơn hàng
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid red",
                      color: "red",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChangeStatus(order.donHangId, "cancelled")
                    }
                  >
                    Hủy đơn hàng
                  </button>
                </>
              ) : order.trangThai === "confirmed" ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#2196f3",
                      border: "none",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChangeStatus(order.donHangId, "shipping")
                    }
                  >
                    Giao hàng
                  </button>
                </>
              ) : order.trangThai === "shipping" ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#2196f3",
                      border: "none",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChangeStatus(order.donHangId, "delivered")
                    }
                  >
                    Đã giao hàng
                  </button>
                </>
              ) : order.trangThai === "delivered" ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#2196f3",
                      border: "none",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChangeStatus(order.donHangId, "completed")
                    }
                  >
                    Hoàn thành
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </td>,
      ];
      return [mainRow, detailsRow];
    }
    return [mainRow];
  });

  return (
    <>
      <div className="content-container">
        <SearchBox placeholder="Tìm kiếm đơn hàng" />

        {listOrders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 20,
              color: "red",
              fontSize: 20,
            }}
          >
            <p>Không có đơn hàng nào</p>
          </div>
        ) : (
          <TableData tableColumns={tableColumns} tableRows={tableRows} />
        )}
      </div>
    </>
  );
};

export default ManageOrders;
