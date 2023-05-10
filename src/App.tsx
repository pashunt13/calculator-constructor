import "./App.css";
import Item from "./components/Item";
import Switcher from "./components/Switcher";
import Calculator from "./components/Calculator";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
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
  ]);

  const handleItemUpdate = (newItem: any) => {
    const updatedItems = items.map((item) => {
      if (item.id === newItem.id) {
        item = { ...item, ...newItem };
      }
      return item;
    });
    return setItems(updatedItems);
  };

  return (
    <div className="App">
      <ul className="constructor">
        {items.map((item) => {
          return <Item key={item.id} item={item} isCalculatorItem={false} />;
        })}
      </ul>

      <Switcher />
      <Calculator onItemUpdate={handleItemUpdate} />
    </div>
  );
}

export default App;
