import { CommodityT } from "../../utils/types/api";
import Dropdown from "../Dropdown/Dropdown";
import "./styles.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OptionProps } from "../Dropdown/types";
import { DOMAIN } from "../../utils/config";
import FormButton from "./FormButton";
import BalanceIcon from "@mui/icons-material/Balance";
import ShieldIcon from "@mui/icons-material/Shield";
import { BASE_STYLE } from "../../utils/styles/base";
import { COMMODITIES_DATA } from "../../utils/start-data";

type FormsProps = {
  selectedCommodity: CommodityT;
  isBalanceModeSelected: boolean;
  isStrongholdModeSelected: boolean;
  setSelectedCommodity: Dispatch<SetStateAction<CommodityT>>;
  setIsBalanceModeSelected: Dispatch<SetStateAction<boolean>>;
  setIsStrongholdModeSelected: Dispatch<SetStateAction<boolean>>;
};

const Forms = ({
  selectedCommodity,
  isBalanceModeSelected,
  isStrongholdModeSelected,
  setSelectedCommodity,
  setIsBalanceModeSelected,
  setIsStrongholdModeSelected,
}: FormsProps): JSX.Element => {
  const [commodityOptions, setCommodityOptions] = useState<OptionProps[]>([]);
  const [selectedCommId, setSelectedCommId] = useState<string | undefined>(
    selectedCommodity.name
  );

  useEffect(() => {
    setCommodityOptions(
      COMMODITIES_DATA.map((commodity): OptionProps => {
        return {
          identifier: commodity.name,
          children: [
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 4px",
              }}
            >
              <img
                src={DOMAIN + "/static/" + commodity.img_path + ".jpg"}
                height={25}
                width={25}
                style={{
                  borderRadius: "4px",
                  border: `2px solid ${
                    commodity.name === selectedCommodity.name
                      ? "var(--main-element)"
                      : "var(--light-grey)"
                  }`,
                }}
              />
            </div>,
          ],
        };
      })
    );
  }, [selectedCommodity]);

  useEffect(() => {
    const newValue: CommodityT | undefined = COMMODITIES_DATA.find(
      (commodity) => commodity.name === selectedCommId
    );
    newValue && setSelectedCommodity(newValue);
  }, [selectedCommId]);

  useEffect(() => {
    setSelectedCommId(selectedCommodity.name);
  }, [selectedCommodity]);

  return (
    <div className="forms">
      <Dropdown
        renderRemove={false}
        isModeActivated={isBalanceModeSelected || isStrongholdModeSelected}
        label="Select a commodity"
        options={commodityOptions.sort(
          (a: OptionProps, b: OptionProps): number => {
            if (a.identifier > b.identifier) return 1;
            if (a.identifier < b.identifier) return -1;
            return 0;
          }
        )}
        selected={selectedCommId}
        setSelected={setSelectedCommId}
      />
      <div style={{ display: "flex" }}>
        <FormButton
          key="balance"
          label="Show commodity trade balance"
          icon={
            <BalanceIcon
              sx={{ height: "40px", color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          isSelected={isBalanceModeSelected}
          setState={setIsBalanceModeSelected}
          setOtherButtonState={setIsStrongholdModeSelected}
        />
        <FormButton
          key="strongholds"
          label="Show commodity strongholds"
          icon={
            <ShieldIcon
              sx={{ height: "40px", color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          isSelected={isStrongholdModeSelected}
          setState={setIsStrongholdModeSelected}
          setOtherButtonState={setIsBalanceModeSelected}
        />
      </div>
    </div>
  );
};

export default Forms;
