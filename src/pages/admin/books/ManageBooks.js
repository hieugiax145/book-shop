import { Button, IconButton } from "@mui/material";
import SearchBox from "../../../components/SearchBox";
import TableData from "../../../components/TableData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import apiServices from "../../../services/apiServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await apiServices.adminGetBooks();
      if (response.success) {
        setBooks(response.data.sachs);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    apiServices.adminDeleteBook(id).then((res) => {
      if (res.success) {
        toast.success("Xóa sách thành công");
      }
    });
  };

  const tableColumns = [
    <th>ID</th>,
    <th className="expand-column">Tên</th>,
    <th className="expand-column">Tác giả</th>,
    <th>Số lượng</th>,
    <th>Giá</th>,
    <th>Thao tác</th>,
  ];

  const tableRows = books.map((book) => {
    return [
      <td>{book.sachId}</td>,
      <td>{book.ten}</td>,
      <td>{book.tacGia}</td>,
      <td>{book.soLuong}</td>,
      <td>{book.donGia}</td>,
      <td>
        <IconButton variant="contained" color="success" sx={{ borderRadius: "5px" }} onClick={() => navigate(`/admin/books/${book.sachId}`)}>
          <EditIcon />
        </IconButton>
        <IconButton variant="contained" color="error" sx={{ borderRadius: "5px" }} onClick={() => handleDelete(book.sachId)}>
          <DeleteIcon />
        </IconButton>
      </td>,
    ];
  });

  // const tableRows = [
  //   [
  //     <td>1</td>,
  //     <td>Dế mèn phiêu lưu ký</td>,
  //     <td>Tô Hoài</td>,
  //     <td>3000</td>,
  //     <td>200000</td>,
  //     <td>
  //       <IconButton
  //         variant="contained"
  //         color="success"
  //         sx={{ borderRadius: "5px" }}
  //         onClick={() => navigate("/admin/books/1")}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton
  //         variant="contained"
  //         color="error"
  //         sx={{ borderRadius: "5px" }}
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     </td>,
  //   ],
  //   [
  //     <td>2</td>,
  //     <td>Tắt đèn</td>,
  //     <td>Ngô Tất Tố</td>,
  //     <td>67</td>,
  //     <td>78000</td>,
  //     <td>
  //       <IconButton
  //         variant="contained"
  //         color="success"
  //         sx={{ borderRadius: "5px" }}
  //         onClick={() => navigate("/admin/books/1")}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton
  //         variant="contained"
  //         color="error"
  //         sx={{ borderRadius: "5px" }}
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     </td>,
  //   ],
  //   [
  //     <td>3</td>,
  //     <td>Chiếc lược ngà</td>,
  //     <td>Nguyễn Quang Sáng</td>,
  //     <td>11</td>,
  //     <td>50000</td>,
  //     <td>
  //       <IconButton
  //         variant="contained"
  //         color="success"
  //         sx={{ borderRadius: "5px" }}
  //         onClick={() => navigate("/admin/books/1")}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton
  //         variant="contained"
  //         color="error"
  //         sx={{ borderRadius: "5px" }}
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     </td>,
  //   ],
  // ];

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
        <SearchBox placeholder="Tìm kiếm sách" />
        <TableData
          isSelectable={true}
          tableColumns={tableColumns}
          tableRows={tableRows}
        />
      </div>
      {/* <ModalBook isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  );
};

export default ManageBooks;
