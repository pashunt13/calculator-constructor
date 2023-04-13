import "../App.css";
import { useDrop } from "react-dnd";
import { useState } from "react";
import Item from "./Item";
import { ItemModel } from "../models";

const Сalculator = () => {
  const [items, setItems]: any[] = useState([]);
  const [calculatorStyle, setCalculatorStyle] = useState("calculator");

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    item: {},
    drop: (item, monitor) => {
      const dropResult: any = monitor.getItem();
      items.push(dropResult.item);
      // setItems([...items, dropResult.item]);
      dropResult.item.canDrag = false;
      setCalculatorStyle("calculator2");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  if (items.length === 0) {
    return (
      <div
        className={calculatorStyle}
        ref={drop}
        style={{ backgroundColor: isOver ? "#f0f9ff" : "white" }}
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
    <ul
      className={calculatorStyle}
      ref={drop}
      style={{
        backgroundColor: isOver ? "#f0f9ff" : "white",
      }}
    >
      {items.map((item: ItemModel) => {
        return <Item item={item} isCalculatorItem={true} />;
      })}
    </ul>
  );
};

export default Сalculator;
