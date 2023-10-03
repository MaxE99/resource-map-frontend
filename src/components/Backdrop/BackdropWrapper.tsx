import "./styles.css";
import LoadingProgress from "./LoadingProgress";
import Backdrop from "./Backdrop";

const BackdropWrapper = (): JSX.Element => {
  return (
    <Backdrop
      children={[
        <div key="loading" className="backdrop-child">
          <LoadingProgress />
        </div>,
      ]}
    />
  );
};

export default BackdropWrapper;
