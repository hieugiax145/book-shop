import { useState, useRef, useEffect } from "react";
import "./SearchBox.css";

const SearchBox = ({ placeholder, onSelect, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      if (onSearch) {
        const results = await onSearch(value);
        setSearchResults(results);
        setShowResults(true);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="search-box" ref={searchRef}>
      <input
        type="text"
        placeholder={placeholder ?? "Tìm kiếm"}
        value={searchTerm}
        onChange={handleSearch}
      />
      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => handleSelect(item)}
            >
              <div className="result-sku">{item.sachId}</div>
              <div className="result-name">{item.ten}</div>
              <div className="result-author">{item.tacGia}</div>
              <div className="result-price">{item.donGia}đ</div>
              <div className="result-stock">Còn: {item.soLuong}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
