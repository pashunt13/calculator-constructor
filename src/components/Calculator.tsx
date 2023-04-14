import "../App.css";
import { useDrop } from "react-dnd";
import { useState } from "react";
import Item from "./Item";
import { ItemModel } from "../models";

const Calculator = () => {
  const [items, setItems]: any[] = useState([]);
  const [calculatorStyle, setCalculatorStyle] = useState("empty-calculator");

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: "item",
    item: {},
    drop: (item, monitor) => {
      const dropResult: any = monitor.getItem();
      items.push(dropResult.item);
      // setItems([...items, dropResult.item]);
      dropResult.item.canDrag = false;
      setCalculatorStyle("calculator");
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  if (items.length === 0) {
    return (
      <div
        className={calculatorStyle}
        ref={drop}
        style={{ backgroundColor: canDrop ? "#f0f9ff" : "white" }}
      >
        <div className="empty-calculator-body">
          <div className="empty-calculator-text">Перетащите сюда</div>
          <div className="empty-calculator-text2">
            любой элемент из левой панели
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={calculatorStyle} ref={drop}>
      <ul
        className="calculator-items"
        style={{
          borderBottom: canDrop ? "1px #5d5fef solid" : "none",
        }}
      >
        {items.map((item: ItemModel) => {
          return <Item item={item} isCalculatorItem={true} />;
        })}
      </ul>
    </div>
  );
};

export default Calculator;
