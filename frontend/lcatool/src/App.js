import logo from './logo.svg';
import './App.css';
import TreeMap from "react-d3-treemap";
// Include its styles in you build process as well
import "react-d3-treemap/dist/react.d3.treemap.css";
import Tabs from "./Tabs.jsx";

function App() {
  interface TreeMapInPutData {
    name: string;
    value?: number;
    children?: Array<TreeMapInPutData>;
    className?: string;
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > */}
      {/* <TreeMap
          id="myTreeMap"
          width={500}
          height={400}
          data={exampledata}
          valueUnit={"MB"}
        /> */}


      {/* </header> */}
      <Tabs />
      Created with ❤️ by FIBE Cohort 3, Department of Engineering, University of Cambridge
    </div>
  );
}

export default App;
