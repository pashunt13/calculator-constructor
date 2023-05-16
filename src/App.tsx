import "./App.css";
import Item from "./components/Item";
import Switcher from "./components/Switcher";
import Calculator from "./components/Calculator";
import { useState } from "react";
import { ItemModel, Type, BodyType, ValueType } from "./models";

const initialItems: ItemModel[] = [
  {
    id: 1,
    type: Type.Display,
    bodyStyle: BodyType.Display,
    valueStyle: ValueType.Display,
    value: "0",
    canDrag: true,
  },
  {
    id: 2,
    type: Type.MathSigns,
    bodyStyle: BodyType.MathSigns,
    valueStyle: ValueType.MathSigns,
    value: ["/", "x", "-", "+"],
    canDrag: true,
  },
  {
    id: 3,
    type: Type.Nums,
    bodyStyle: BodyType.Nums,
    valueStyle: ValueType.Nums,
    value: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","],
    canDrag: true,
  },
  {
    id: 4,
    type: Type.ToCount,
    bodyStyle: BodyType.ToCount,
    valueStyle: ValueType.ToCount,
    value: "=",
    canDrag: true,
  },
];

const App = () => {
  const [items, setItems] = useState(initialItems);
  const handleItemUpdate = (newItem: ItemModel) => {
    const updatedItems = items.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    return setItems(updatedItems);
  };

  return (
    <div className="App">
      <ul className="sidebar">
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              item={item}
              index={index}
              isCalculatorItem={false}
            />
          );
        })}
      </ul>

      <Switcher />
      <Calculator onItemUpdate={handleItemUpdate} />
    </div>
  );
};

export default App;
