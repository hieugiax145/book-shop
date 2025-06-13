import './ModalBook.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalBook = ({ isOpen, setIsOpen }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="popup-container" onClick={() => setIsOpen(false)}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    Thêm sách
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-content"><div className="form-group">
                    <label htmlFor="title">Tên sách</label>
                    <input type="text" id="title" name="title" />
                    <label htmlFor="author">Tác giả</label>
                    <input type="text" id="author" name="author" />
                    <label htmlFor="price">Giá</label>
                    <input type="number" id="price" name="price" />
                    <label htmlFor="description">Mô tả</label>
                    <textarea id="description" name="description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Ảnh bìa</label>
                        <input type="file" id="image" name="image" accept="image/*" />
                    </div></div>
                    
                    <button type="submit">Thêm</button>

                </form>
                <button onClick={() => setIsOpen(false)}>Đóng</button>
            </div>
        </div>
    )
}

export default ModalBook;