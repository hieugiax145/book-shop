import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiServices from "../../../services/apiServices";

const BookAdd = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { sachId } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ten: "",
    tacGia: "",
    theLoai: "",
    nhaXuatBan: "",
    namXuatBan: "",
    donGia: "",
    soLuong: "",
    moTa: "",
    hinhAnh: null,
  });

  useEffect(() => {
    if (isEdit) {
      fetchBook();
    }
  }, [isEdit]);

  const fetchBook = async () => {
    const response = await apiServices.adminGetBookById(sachId);
    if (response.success) {
      setFormData(response.data.sach);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "hinhAnh" && formData[key]) {
        formDataToSend.append("image", formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (isEdit) {
      const response = await apiServices.adminUpdateBook(sachId, formDataToSend);
      if (response.success) {
        toast.success("Cập nhật sách thành công");
        navigate(-1);
      }
    } else {
      const response = await apiServices.adminAddBook(formDataToSend);
      if (response.success) {
        toast.success("Thêm sách thành công");
        navigate(-1);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "ten",
      "tacGia",
      "theLoai",
      "nhaXuatBan",
      "namXuatBan",
      "donGia",
      "soLuong",
      "hinhAnh",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Vui lòng điền thông tin này";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="content-header-container">
        {isEdit ? "Cập nhật sách" : "Thêm sách"}
        <div className="content-header-container-button">
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "5px" }}
            onClick={() => navigate(-1)}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ borderRadius: "5px" }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </div>
      </div>
      <div className="content-container">
        <form onSubmit={handleSave}>
          <div
            className="form-group"
            style={{ display: "flex", flexDirection: "row", gap: "2rem" }}
          >
            <div
              className="form-group-item"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "70%",
              }}
            >
              <div className="form-group">
                <label htmlFor="title">Tên sách</label>
                <input
                  type="text"
                  id="title"
                  name="ten"
                  value={formData.ten}
                  onChange={handleChange}
                />
              </div>
              {errors.ten && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.ten}
                </span>
              )}
              <div className="form-group">
                <label htmlFor="author">Tác giả</label>
                <input
                  type="text"
                  id="tacGia"
                  name="tacGia"
                  value={formData.tacGia}
                  onChange={handleChange}
                />
                {errors.tacGia && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.tacGia}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category">Thể loại</label>
                <input
                  type="text"
                  id="theLoai"
                  name="theLoai"
                  value={formData.theLoai}
                  onChange={handleChange}
                />
                {errors.theLoai && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.theLoai}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Nhà xuất bản</label>
                <input
                  type="text"
                  id="nhaXuatBan"
                  name="nhaXuatBan"
                  value={formData.nhaXuatBan}
                  onChange={handleChange}
                />
                {errors.nhaXuatBan && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.nhaXuatBan}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="year">Năm xuất bản</label>
                <input
                  type="number"
                  id="namXuatBan"
                  name="namXuatBan"
                  value={formData.namXuatBan}
                  onChange={handleChange}
                />
                {errors.namXuatBan && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.namXuatBan}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input
                  type="number"
                  id="donGia"
                  name="donGia"
                  value={formData.donGia}
                  onChange={handleChange}
                />
                {errors.donGia && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.donGia}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Số lượng</label>
                <input
                  type="number"
                  id="soLuong"
                  name="soLuong"
                  value={formData.soLuong}
                  onChange={handleChange}
                />
                {errors.soLuong && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.soLuong}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="moTa"
                  name="moTa"
                  value={formData.moTa}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div
              className="form-group-item"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div className="form-group">
                <label htmlFor="image">Ảnh bìa</label>
                {formData.hinhAnh && (
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={`${
                        isEdit
                          ? `${process.env.REACT_APP_API_URL}/${formData.hinhAnh}`
                          : URL.createObjectURL(formData.hinhAnh)
                      }`}
                      alt="Preview"
                      style={{
                        width: "70%",
                        aspectRatio: "3/4",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="hinhAnh"
                  name="hinhAnh"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              {errors.hinhAnh && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.hinhAnh}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookAdd;
