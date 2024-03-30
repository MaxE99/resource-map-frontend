import { Dispatch, ReactNode, SetStateAction } from "react";
import { CommodityT, GovInfoT, PriceT } from "../../utils/types/api";

type PricePlotProps = {
  data: PriceT[];
};

type SidebarProps = {
  commodity: CommodityT;
  govInfo: GovInfoT | null;
  prices: PriceT[] | undefined;
  isLoading: boolean;
  windowWidth: number;
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
  prices: PriceT[] | undefined;
};

type AboutUsProps = {
  windowWidth: number;
};

type CreatorImageProps = {
  name: string;
  linkedinLink: string;
};

export type {
  SidebarProps,
  PricePlotProps,
  SidebarHeadProps,
  SidebarMenuProps,
  SidebarSelected,
  ResourceBodyProps,
  AboutUsProps,
  CreatorImageProps,
};
