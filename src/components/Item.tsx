import "../App.css";
import { ItemModel } from "../models";
import { useState } from "react";
import { useDrag } from "react-dnd";

interface ItemProps {
  item: ItemModel;
  isCalculatorItem: boolean;
}

const Item = ({ item, isCalculatorItem }: ItemProps) => {
  const [canDrag, setCanDrag] = useState(
    isCalculatorItem ? isCalculatorItem : item.canDrag
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => setCanDrag(item.canDrag),
  }));

  const style = {
    opacity: isDragging || !canDrag ? 0.5 : 1,
    boxShadow: !isCalculatorItem
      ? "0px 2px 4px rgb(0 0 0 / 6%), 0px 4px 6px rgb(0 0 0 / 10%)"
      : "none",
    marginBottom: isCalculatorItem ? "6px" : "12px",
  };

  if (Array.isArray(item.value)) {
    if (item.type === "nums") {
      return (
        <li
          key={item.id}
          className="item"
          ref={item.canDrag ? drag : null}
          style={style}
        >
          <div className="num-container">
            {item.value.map((value) => {
              return (
                <button
                  className={value === "0" ? "math num-0" : item.bodyStyle}
                >
                  <div className={item.valueStyle}>{value}</div>
                </button>
              );
            })}
          </div>
        </li>
      );
    } else {
      return (
        <li
          key={item.id}
          className="item"
          ref={item.canDrag ? drag : null}
          style={style}
        >
          {item.value.map((value) => {
            return (
              <button className={item.bodyStyle}>
                <div className={item.valueStyle}>{value}</div>
              </button>
            );
          })}
        </li>
      );
    }
  } else {
    return (
      <li
        key={item.id}
        className="item"
        ref={item.canDrag ? drag : null}
        style={style}
      >
        <div className={item.bodyStyle}>
          <div className={item.valueStyle}>{item.value}</div>
        </div>
      </li>
    );
  }
};

export default Item;
