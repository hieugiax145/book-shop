const CommonUtils = {
    formatDate: (date) => {
        return new Date(date).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
    },

    formatPrice: (price) => {
        return price.toLocaleString('vi-VN', {
            minimumFractionDigits: 0,
        }) + 'đ';
    }
}

export default CommonUtils;
