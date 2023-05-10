import "../App.css";
import { useDrop } from "react-dnd";
import { useState } from "react";
import Item from "./Item";
import { ItemModel } from "../models";

interface CalculatorProps {
  onItemUpdate: Function;
}

const Calculator = ({ onItemUpdate }: CalculatorProps) => {
  const [items, setItems]: any[] = useState([]);
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "item",
      item: {},
      drop: (item, monitor) => {
        const dropResult: any = monitor.getItem();
        onItemUpdate({ ...dropResult.item, canDrag: false });
        setItems([...items, { ...dropResult.item, canDrag: false }]);
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [items]
  );

  if (items.length === 0) {
    return (
      <div
        className="empty-calculator"
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

  const deleteHandler = (id: number) => {
    setItems(items.filter((item: ItemModel) => item.id !== id));
    onItemUpdate({ id, canDrag: true });
  };

  return (
    <div className="calculator" ref={drop}>
      <ul
        className="calculator-items"
        style={{
          borderBottom: canDrop ? "1px #5d5fef solid" : "none",
        }}
      >
        {items.map((item: ItemModel) => {
          return (
            <Item
              key={item.id}
              item={item}
              isCalculatorItem={true}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Calculator;
