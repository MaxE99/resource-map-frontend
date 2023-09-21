import { Dispatch, ReactNode, SetStateAction } from "react";
import { CommodityPriceT, CommodityT, GovInfoT } from "../../types/api";

type AccordionWrapperProps = {
  index: number;
  summary: string;
  details: string | JSX.Element | JSX.Element[] | undefined;
};

type PricePlotProps = {
  data: CommodityPriceT[];
};

type SidebarProps = {
  commodity: CommodityT;
  govInfo: GovInfoT | null;
  prices: CommodityPriceT[] | undefined;
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
  AccordionWrapperProps,
  SidebarHeadProps,
  SidebarMenuProps,
  SidebarSelected,
  ResourceBodyProps,
};
