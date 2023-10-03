import { Dispatch, ReactNode, SetStateAction } from "react";
import { CommodityPriceT, CommodityT, GovInfoT } from "../../utils/types/api";

type PricePlotProps = {
  data: CommodityPriceT[];
};

type SidebarProps = {
  commodity: CommodityT;
  govInfo: GovInfoT | null;
  prices: CommodityPriceT[] | undefined;
  isLoading: boolean;
};

type SidebarHeadProps = {
  icon: ReactNode;
  label: string;
};

type SidebarMenuProps = {
  selected: SidebarSelected;
  setSelected: Dispatch<SetStateAction<SidebarSelected>>;
};

type SidebarSelected = "resource" | "datasource" | "about";

type ResourceBodyProps = {
  commodity: CommodityT;
  govInfo: GovInfoT | null;
  prices: CommodityPriceT[] | undefined;
};

export type {
  SidebarProps,
  PricePlotProps,
  SidebarHeadProps,
  SidebarMenuProps,
  SidebarSelected,
  ResourceBodyProps,
};
