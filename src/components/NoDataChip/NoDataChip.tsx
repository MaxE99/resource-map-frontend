const NoDataChip = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderRadius: "4px",
        backgroundColor: "var(--light-grey)",
        border: "1px solid var(--main-text)",
        padding: "6px 12px",
        fontSize: "20px",
      }}
    >
      NO DATA FOUND
    </div>
  );
};

export default NoDataChip;
