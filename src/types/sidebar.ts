import { CommodityT, CommodityPriceT, GovInfoT } from "./api";

type AccordionWrapperT = {
  index: number;
  summary: string;
  details: string | JSX.Element | JSX.Element[] | undefined;
};

type PricePlotT = {
  data: CommodityPriceT[];
};

type SidebarT = {
  commodity: CommodityT | undefined;
  govInfo: GovInfoT | null;
};

export type { AccordionWrapperT, PricePlotT, SidebarT };
