import { ReactNode } from "react";

type OptionProps = {
  identifier: string;
  handleClick?: () => void;
  selected?: string | undefined;
  children: ReactNode[];
};

type OptionListProps = {
  options: OptionProps[];
  selected: string | undefined;
  setSelected: (arg: string | undefined) => void;
  setOpen: (arg: boolean) => void;
};

type DropdownProps = {
  renderRemove: boolean;
  label: string;
  setSelected: (arg: any | undefined) => void;
  selected: string | undefined;
  options: OptionProps[];
};

type OpenButtonProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
};

type RemoveButtonProps = {
  renderRemove: boolean;
  setOpen: (arg: boolean) => void;
  selected: string | undefined;
  setSelected: (arg: string | undefined) => void;
};

export type {
  RemoveButtonProps,
  OpenButtonProps,
  OptionProps,
  OptionListProps,
  DropdownProps,
};
