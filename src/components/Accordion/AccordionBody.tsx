import { AccordionBodyProps } from "./types";

const AccordionBody = ({ body }: AccordionBodyProps): JSX.Element => {
  return <div style={{ padding: "8px 30px 16px 30px" }}>{body}</div>;
};

export default AccordionBody;
