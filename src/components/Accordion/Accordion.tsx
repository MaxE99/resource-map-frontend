import { useState } from "react";
import AccordionBody from "./AccordionBody";
import AccordionHead from "./AccordionHead";
import { AccordionProps } from "./types";

const Accordion = ({ index, label, body }: AccordionProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`accordion${open ? " accordion-open" : ""}`}>
      <div className={`accordion-inner${open ? " accordion-inner-open" : ""}`}>
        <AccordionHead
          index={index}
          label={label}
          open={open}
          setOpen={setOpen}
        />
      </div>
      {open && <AccordionBody body={body} />}
    </div>
  );
};

export default Accordion;
