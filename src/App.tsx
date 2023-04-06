import "./App.css";
import Switcher from "./components/Switcher";
import Display from "./components/Display";
import MathSigns from "./components/MathSigns";
import Nums from "./components/Nums";
import ToCount from "./components/ToCount";
import Constructor from "./components/Constructor";

function App() {
  // const display = {
  //   name: "display",
  //   content: <Display />,
  // };

  const items = [1, 2, 3, 4, 5];

  return (
    <div className="App">
      <ul className="calculator">
        <Display />
        <MathSigns />
        <Nums />
        <ToCount />
      </ul>

      <Switcher />

      <Constructor />
    </div>
  );
}

export default App;
