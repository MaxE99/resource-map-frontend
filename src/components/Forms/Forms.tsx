import { CommodityT } from "../../types/api";
import Dropdown from "../Dropdown/Dropdown";
import "../../styles/Forms.css";
import { useEffect, useState } from "react";
import { OptionProps } from "../Dropdown/types";
import { DOMAIN } from "../../config";

type FormsProps = {
  commodities: CommodityT[];
  selectedCommodity: CommodityT;
  setSelectedCommodity: (arg: CommodityT) => void;
  OTHER_VIZ_OPTIONS: string[];
  otherViz: string | undefined;
  setOtherViz: (arg: string | undefined) => void;
};

const Forms = ({
  commodities,
  selectedCommodity,
  setSelectedCommodity,
  OTHER_VIZ_OPTIONS,
  otherViz,
  setOtherViz,
}: FormsProps): JSX.Element => {
  const [commodityOptions, setCommodityOptions] = useState<OptionProps[]>([]);
  const [vizOptions, setVizOptions] = useState<OptionProps[]>([]);
  const [selectedCommId, setSelectedCommId] = useState<string | undefined>(
    selectedCommodity.name,
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
      }),
    );
  }, [commodities, selectedCommodity]);

  useEffect(() => {
    setVizOptions(
      OTHER_VIZ_OPTIONS.map((vizOption): OptionProps => {
        return {
          identifier: vizOption,
          children: [],
        };
      }),
    );
  }, [OTHER_VIZ_OPTIONS]);

  useEffect(() => {
    const newValue: CommodityT | undefined = commodities.find(
      (commodity) => commodity.name === selectedCommId,
    );
    newValue && setSelectedCommodity(newValue);
  }, [selectedCommId]);

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
          },
        )}
        selected={selectedCommId}
        setSelected={setSelectedCommId}
      />
      <Dropdown
        renderRemove={true}
        label="Show other visualization"
        options={vizOptions}
        selected={otherViz}
        setSelected={setOtherViz}
      />
    </div>
  );
};

export default Forms;
