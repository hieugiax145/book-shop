import "./nav/NavBar.css";
import { useLocation, Link } from "react-router-dom";
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from '@mui/material';
const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
    const location = useLocation();

    return (
        <aside className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
            <div className="sidebar-header">
                <span>Admin</span>
                <IconButton onClick={toggleSidebar} color="inherit">{isSidebarVisible ? <MenuOpenIcon /> : <MenuIcon />}</IconButton>
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
        </aside>
    )
}

export default Sidebar;