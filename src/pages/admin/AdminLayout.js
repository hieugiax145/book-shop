import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import ManageBooks from "./books/ManageBooks";
import PlaceOrder from "./sale/PlaceOrder";
import { useState, useEffect } from "react";
import BookAdd from "./books/BookAdd";
import ManageOrders from "./orders/ManageOrders";
import NavBar from "../../components/nav/NavBar";
import "./AdminLayout.css";
const AdminLayout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const handleSidebarVisible = () => {
        setIsSidebarVisible(!isSidebarVisible);
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', isSidebarVisible ? '240px' : '80px');
    }, [isSidebarVisible]);

    return (
        <div >
            <NavBar isSidebarVisible={isSidebarVisible} setIsSidebarVisible={handleSidebarVisible} />

            <div className={`main-content ${isSidebarVisible ? '' : 'hidden'}`}>
                {/* <Header /> */}
                <main className="content">
                    <Routes>
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/books" element={<ManageBooks />} />
                        <Route path="/books/add" element={<BookAdd />} />
                        <Route path="/books/:sachId" element={<BookAdd isEdit={true} />} />
                        <Route path="/orders" element={<ManageOrders />} />

                    </Routes>
                </main>

                {/* <Content /> */}
            </div>
        </div>
    )
}

export default AdminLayout;
