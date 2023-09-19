import { Dispatch, ReactNode, SetStateAction } from "react";

type AccordionHeadProps = {
  index: number;
  label: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type AccordionBodyProps = {
  body: ReactNode;
};

type AccordionProps = {
  index: number;
  label: string;
  body: ReactNode;
};

export type { AccordionHeadProps, AccordionBodyProps, AccordionProps };
