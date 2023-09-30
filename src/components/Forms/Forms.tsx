import { CommodityT } from "../../types/api";
import Dropdown from "../Dropdown/Dropdown";
import "./styles.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OptionProps } from "../Dropdown/types";
import { DOMAIN } from "../../config";
import FormButton from "./FormButton";
import BalanceIcon from "@mui/icons-material/Balance";
import ShieldIcon from "@mui/icons-material/Shield";
import { BASE_STYLE } from "../../styles/base";

type FormsProps = {
  commodities: CommodityT[];
  selectedCommodity: CommodityT;
  isBalanceModeSelected: boolean;
  setSelectedCommodity: Dispatch<SetStateAction<CommodityT>>;
  setIsBalanceModeSelected: Dispatch<SetStateAction<boolean>>;
};

const Forms = ({
  commodities,
  selectedCommodity,
  isBalanceModeSelected,
  setSelectedCommodity,
  setIsBalanceModeSelected,
}: FormsProps): JSX.Element => {
  const [commodityOptions, setCommodityOptions] = useState<OptionProps[]>([]);
  const [selectedCommId, setSelectedCommId] = useState<string | undefined>(
    selectedCommodity.name
  );

  useEffect(() => {
    setCommodityOptions(
      commodities.map((commodity): OptionProps => {
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
  }, [commodities, selectedCommodity]);

  useEffect(() => {
    const newValue: CommodityT | undefined = commodities.find(
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
          label="Show commodity trade balance"
          icon={
            <BalanceIcon
              sx={{ height: "40px", color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          isSelected={isBalanceModeSelected}
          setState={setIsBalanceModeSelected}
        />
        <FormButton
          label="Show commodity strongholds"
          icon={
            <ShieldIcon
              sx={{ height: "40px", color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Forms;
