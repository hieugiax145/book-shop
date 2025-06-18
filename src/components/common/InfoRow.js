const InfoRow = ({ label, value }) => {
  return (
    <div style={{ display: "flex", gap: "10px", width: "50%" }}>
      <p style={{ fontWeight: "500", flex: 1 }}>{label}:</p>
      <p style={{ flex: 1 }}>{value}</p>
    </div>
  );
};
export default InfoRow;
