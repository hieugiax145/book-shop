import { Button, IconButton } from "@mui/material";
import SearchBox from "../../../components/SearchBox";
import TableData from "../../../components/TableData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";
import CustomDialog from "../../../components/CustomDialog";

const tableColumns = [
  <th>ID</th>,
  <th className="expand-column">Tên</th>,
  <th className="expand-column">Tác giả</th>,
  <th>Số lượng</th>,
  <th>Giá</th>,
  <th>Thao tác</th>,
];

const ManageBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    bookId: null,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchBooks();
  }, []);


  const fetchBooks = async () => {
    const response = await apiServices.adminGetBooks();
    if (response.success) {
      setBooks(response.data.sachs);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.bookId) {
      const response = await apiServices.adminDeleteBook(deleteDialog.bookId);
      if (response.success) {
        toast.success("Xóa sách thành công");
        fetchBooks();
      }
    }
    setDeleteDialog({ open: false, bookId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, bookId: null });
  };

  const handleDelete = (id) => {
    apiServices.adminDeleteBook(id).then((res) => {
      if (res.success) {
        toast.success("Xóa sách thành công");
        fetchBooks();
      }
    });
  };

  const handleSearch = async (search) => {
    const response = await apiServices.adminSearchBook({ search });
    if (response.success) {
      setBooks(response.data.sachs);
    }
  };

  const tableRows = books.map((book) => {
    return [
      <td>{book.sachId}</td>,
      <td>{book.ten}</td>,
      <td>{book.tacGia}</td>,
      <td>{book.soLuong}</td>,
      <td>{CommonUtils.formatPrice(book.donGia)}</td>,
      <td>
        <IconButton
          variant="contained"
          color="success"
          sx={{ borderRadius: "5px" }}
          onClick={() => navigate(`/admin/books/${book.sachId}`)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          variant="contained"
          color="error"
          sx={{ borderRadius: "5px" }}
          onClick={() => setDeleteDialog({ open: true, bookId: book.sachId })}
        >
          <DeleteIcon />
        </IconButton>
      </td>,
    ];
  });

  return (
    <>
      <div className="content-header">
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: "5px" }}
          onClick={() => navigate("/admin/books/add")}
        >
          Thêm sách
        </Button>
      </div>
      <div className="content-container">
        <SearchBox placeholder="Tìm kiếm sách" onSearch={handleSearch} isSearchBox={true} value={search} />
        {books && books.length > 0 ? (
          <TableData
            isSelectable={true}
            tableColumns={tableColumns}
            tableRows={tableRows}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: 20,
              color: "red",
              fontSize: 20,
            }}
          >
            <p>Không có sách nào</p>
          </div>
        )}
      </div>
      <CustomDialog
        open={deleteDialog.open}
        title="Xóa sách"
        children="Bạn có muốn xóa sách này khỏi hệ thống?"
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
    </>
  );
};

export default ManageBooks;
