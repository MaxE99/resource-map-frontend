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

type AccordionWrapperProps = {
  index: number;
  summary: string;
  details: string | JSX.Element | JSX.Element[] | undefined;
};

export type {
  AccordionHeadProps,
  AccordionBodyProps,
  AccordionProps,
  AccordionWrapperProps,
};
