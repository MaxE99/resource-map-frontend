const CountryInformation = ({ country }: any): JSX.Element => {
  return (
    <div
      style={{
        width: "25%",
        margin: "100px 0 100px 2.5%",
        height: "50rem",
        border: "1px solid var(--main-text)",
        borderRadius: "20px",
        color: "var(--main-text)",
        overflowY: "auto",
      }}
    >
      <div>Resource Table:</div>
      <div>Commodity Imports Tree Map:</div>
      <div>Commodity Exports Tree Map:</div>
      <div>GDP Chart:</div>
      <div>Resources as % of GDP Chart:</div>
      <div>Ranking: Resource Imports:</div>
      <div>Ranking: Resource Exports:</div>
      <div>Ranking: Resource Dependency:</div>
      <div>Ease of Doing Business Index: {country.ease_of_biz}</div>
      <div>Income Group: {country.income_group}</div>
    </div>
  );
};

export default CountryInformation;
