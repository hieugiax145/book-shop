import "./UserLayout.css";
import { Routes, Route, Navigate } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import Home from "./Home";
import Cart from "./Cart";
import Shop from "./Shop";
import Orders from "./Orders";
import Payment from "./Payment";

function UserLayout() {
  return (
    <div className="user-layout">
      <UserHeader />
      <div className="user-content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          {/* Add more user routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default UserLayout;
