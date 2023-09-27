const MAP_STYLE = {
  BUTTON: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    padding: "20px",
    zIndex: 998,
    borderBottomLeftRadius: "20px",
    border: "1px solid",
    fontSize: "15px",
  },
  BOX: {
    padding: "20px",
    zIndex: 998,
    borderTopRightRadius: "20px",
    fontSize: "15px",
    fontWeight: 600,
  },
  SWITCH: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: "20px",
    zIndex: 998,
    borderBottomLeftRadius: "20px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    textTransform: "uppercase",
  },
  POPUP: {
    maxWidth: "400px",
    fontSize: "16px",
    overflowY: "auto",
    maxHeight: "50vh",
    zIndex: 500,
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
  },
};

export { MAP_STYLE };
