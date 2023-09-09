const APP_STYLE = {
  COMMODITY_BOX: {
    display: "flex",
    alignItems: "center",
    fontSize: "17px",
    padding: "5px 10px",
    borderBottom: "1px solid #e2e6ea",
    width: "100%",
  },
  IMAGE: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
    borderRadius: "2px",
  },
  SLIDER: {
    marginTop: "30px",
    color: "#1277c4",
    height: "10px",
    "& .MuiSlider-markLabel": {
      color: "#1277c4",
      fontSize: "14px",
      fontWeight: 600,
      marginTop: "5px",
    },
    "& .MuiSlider-markLabel:first-of-type": {
      left: "1%",
    },
    "& .MuiSlider-markLabel:last-of-type": {
      left: "99%",
    },
  },
  WRAPPER: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "30px 30px 0",
  },
  OUTER_BOX: {
    width: "65%",
    height: "calc(100vh - 60px)",
    display: "block",
  },
  INNER_BOX: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "30px",
  },
};

export { APP_STYLE };
