import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserIcon from '@mui/icons-material/Person';

const Header = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();

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
        <div className="header">
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
    )
}

export default Header;