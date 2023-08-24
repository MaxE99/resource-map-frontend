import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (): JSX.Element => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Map />
        <Sidebar />
      </div>
  );
}

export default App;
