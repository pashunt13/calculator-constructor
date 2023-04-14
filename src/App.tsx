import "./App.css";
import Item from "./components/Item";
import Switcher from "./components/Switcher";
import Calculator from "./components/Calculator";

function App() {
  const items = [
    {
      id: 1,
      type: "display",
      bodyStyle: "display",
      valueStyle: "display-nums",
      value: "0",
      canDrag: true,
    },
    {
      id: 2,
      type: "mathSigns",
      bodyStyle: "math-group math",
      valueStyle: "math-value",
      value: ["/", "x", "-", "+"],
      canDrag: true,
    },
    {
      id: 3,
      type: "nums",
      bodyStyle: "math num",
      valueStyle: "math-value",
      value: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","],
      canDrag: true,
    },
    {
      id: 4,
      type: "toCount",
      bodyStyle: "math to-count",
      valueStyle: "to-count-value",
      value: "=",
      canDrag: true,
    },
  ];

  return (
    <div className="App">
      <ul className="constructor">
        {items.map((item) => {
          return <Item item={item} isCalculatorItem={false} />;
        })}
      </ul>

      <Switcher />
      <Calculator />
    </div>
  );
}

export default App;
