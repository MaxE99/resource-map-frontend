import { CommodityT } from "../../types/api";
import Dropdown from "../Dropdown/Dropdown";
import "../../styles/Forms.css";
import { useEffect, useState } from "react";

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
  const [commoditiesStr, setCommoditiesStr] = useState<string[]>([]);
  const [selectedCommStr, setSelectedCommStr] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    var newValue: string[] = [];
    commodities.map((value) => {
      newValue = [...newValue, value.name];
    });
    newValue.sort();
    setCommoditiesStr(newValue);
  }, [commodities]);

  useEffect(() => {
    selectedCommodity
      ? setSelectedCommStr(selectedCommodity.name)
      : setSelectedCommStr(undefined);
  }, [selectedCommodity]);

  useEffect(() => {
    selectedCommStr
      ? commodities.map((value) => {
          value.name === selectedCommStr && setSelectedCommodity(value);
        })
      : setSelectedCommodity({
          id: 45,
          name: "Gold",
          info: "",
          img_path: "commodity_imgs/gold.jpg",
          companies: [
            "Newmont Corporation",
            "Barrick Gold Corporation",
            "AngloGold Ashanti Limited",
            "Polyus",
            "Kinross Gold Corporation",
          ],
        });
  }, [selectedCommStr]);

  return (
    <div className="forms">
      <Dropdown
        label="Select a commodity"
        options={commoditiesStr}
        selected={selectedCommStr}
        setSelected={setSelectedCommStr}
      />
      <Dropdown
        label="Show other visualization"
        options={OTHER_VIZ_OPTIONS}
        selected={otherViz}
        setSelected={setOtherViz}
      />
    </div>
  );
};

export default Forms;
