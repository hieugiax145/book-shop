import SearchBox from "../../../components/SearchBox";
import TableData from "../../../components/TableData";
import { useState } from "react";

const ManageOrders = () => {
  const [listOrders, setListOrders] = useState([]);

  const tableColumns = [
    <th>Mã đơn</th>,
    <th>Thời gian</th>,
    <th>Khách hàng</th>,
    <th>Phân loại</th>,
    <th>Tổng tiền</th>,
    <th>Phương thức thanh toán</th>,
    <th>Khách đã trả</th>,
    <th>Trạng thái</th>,
  ];

  const tableRows = [
    [
      <td>1</td>,
      <td>2025-05-26</td>,
      <td>Nguyễn Văn A</td>,
      <td>In-store</td>,
      <td>780000</td>,
      <td>Thanh toán tiền mặt</td>,
      <td>780000</td>,
      <td>
        <div className="status-memu">
          <div className="status-container completed">Hoàn thành</div>
          <div className="status-dropdown">
            <div className="status-item">Chờ xác nhận</div>
            <div className="status-item">Đã xác nhận</div>
            <div className="status-item">Đang giao hàng</div>
            <div className="status-item">Đã giao hàng</div>
            <div className="status-item">Đã hủy</div>
          </div>
        </div>
      </td>,
    ],
    [
      <td>1</td>,
      <td>2025-05-26</td>,
      <td>Nguyễn Văn A</td>,
      <td>Online</td>,
      <td>156000</td>,
      <td>Thanh toán chuyển khoản QR</td>,
      <td>156000</td>,
      <td>
        <div className="status-memu">
          <div className="status-container ">Chờ xác nhận</div>
          <div className="status-dropdown">
            <div className="status-item">Chờ xác nhận</div>
            <div className="status-item">Đã xác nhận</div>
            <div className="status-item">Đang giao hàng</div>
            <div className="status-item">Đã giao hàng</div>
            <div className="status-item">Đã hủy</div>
          </div>
        </div>
      </td>,
    ],
  ];

  return (
    <>
      <div className="content-container">
        <SearchBox placeholder="Tìm kiếm đơn hàng" />

        {listOrders.length != 0 ? (
          <div className="text-center mt-4 text-gray-500">
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
