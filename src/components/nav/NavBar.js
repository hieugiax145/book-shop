import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import UserIcon from '@mui/icons-material/Person';
import "./NavBar.css";

const NavBar = ({ title, isSidebarVisible, setIsSidebarVisible }) => {
    const location = useLocation();

    const getTitle = () => {
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
        const mainRoute = pathSegments[1] || '';

        switch (mainRoute) {
            case 'books':
                return 'Quản lý sách';
            case 'place-order':
                return 'Bán hàng';
            case 'orders':
                return 'Quản lý đơn hàng';
            default:
                return mainRoute || 'Trang chủ';
        }
    }

    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('nguoiDungId');
        localStorage.removeItem('vaiTro');
        window.location.href = '/login';
    }

    return (
        <>
            <div className="nav-bar">
                <div className={`top-bar ${isSidebarVisible ? '' : 'hidden'}`}>
                    <div className="header-title">
                        {title ?? getTitle()}
                    </div>
                    <div className="user-menu">
                        <div className="user-icon">
                            <UserIcon />
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={handleLogout}>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
                    <div className="sidebar-header">
                        <span>Admin</span>
                        <IconButton onClick={setIsSidebarVisible} color="inherit">{isSidebarVisible ? <MenuOpenIcon /> : <MenuIcon />}</IconButton>
                    </div>
                    <div className="sidebar-menu">
                        <Link
                            to="/sale"
                            className={`sidebar-link ${location.pathname.startsWith('/admin/place-order') ? 'active' : ''}`}
                        >
                            <ShoppingCartIcon />
                            <span>Bán hàng</span>
                        </Link>
                        <Link
                            to="/admin/books"
                            className={`sidebar-link ${location.pathname.startsWith('/admin/books') ? 'active' : ''}`}
                        >
                            <LibraryBooksSharpIcon />
                            <span>Quản lý sách</span>
                        </Link>
                        <Link
                            to="/admin/orders"
                            className={`sidebar-link ${location.pathname.startsWith('/admin/orders') ? 'active' : ''}`}
                        >
                            <ReceiptLongIcon />
                            <span>Quản lý đơn hàng</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar;