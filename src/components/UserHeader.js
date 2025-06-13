import { Link } from "react-router-dom";
import { useState } from "react";
import "./UserHeader.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBox from "./SearchBox";

const UserHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nguoiDungId");
    window.location.href = "/";
  };

  return (
    <div className="user-header">
      <div className="container">
        <Link to="/" className="logo">
          Book Shop Nhóm 7
        </Link>

        <nav className="navbar">
          {showSearch ? (
            <SearchBox />
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/shop">Cửa hàng</Link>
              <Link to="/orders">Đơn hàng</Link>
            </>
          )}
        </nav>

        <div className="icons">
          <div id="menu-btn" className="fas fa-bars"></div>
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon />
          </IconButton>
          <Link to="/cart">
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </Link>

          {localStorage.getItem("nguoiDungId") ? (
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Link to="/login">
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Link>
          )}

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "user-button",
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/profile">
              Hồ sơ
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/orders">
              Đơn hàng
            </MenuItem>

            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
