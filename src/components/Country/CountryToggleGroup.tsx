import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CountryToggleGroupT } from "./types";

const CountryToggleGroup = ({
  firstChoice,
  secondChoice,
  currentChoice,
  setCurrentChoice,
}: CountryToggleGroupT): JSX.Element => {
  const handleProductionReservesChange = (
    _: React.MouseEvent<HTMLElement>,
    newSelection: any
  ) => {
    setCurrentChoice(newSelection);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={currentChoice}
      exclusive
      onChange={handleProductionReservesChange}
      sx={{ marginLeft: "auto" }}
    >
      <ToggleButton
        sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
        value={firstChoice}
      >
        {firstChoice}
      </ToggleButton>
      <ToggleButton
        sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
        value={secondChoice}
      >
        {secondChoice}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CountryToggleGroup;
