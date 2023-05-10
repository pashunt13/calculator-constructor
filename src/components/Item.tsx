import "../App.css";
import { ItemModel } from "../models";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

interface ItemProps {
  item: ItemModel;
  isCalculatorItem: boolean;
  deleteHandler?: Function;
}

const Item = ({
  item,
  isCalculatorItem,
  deleteHandler = () => console.log(item.id),
}: ItemProps) => {
  const [canDrag, setCanDrag] = useState(item.canDrag);

  useEffect(() => {
    setCanDrag(isCalculatorItem ? isCalculatorItem : item.canDrag);
  }, [item.canDrag, isCalculatorItem]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging || !canDrag ? 0.5 : 1,
    boxShadow:
      canDrag && !isCalculatorItem
        ? "0px 2px 4px rgb(0 0 0 / 6%), 0px 4px 6px rgb(0 0 0 / 10%)"
        : "none",
    marginBottom: isCalculatorItem ? "6px" : "12px",
  };

  const remove = (id: number) => {
    if (isCalculatorItem) {
      deleteHandler(id);
    }
  };

  if (Array.isArray(item.value)) {
    if (item.type === "nums") {
      return (
        <li
          key={item.id}
          className="item"
          ref={item.canDrag ? drag : null}
          style={style}
          onDoubleClick={() => remove(item.id)}
        >
          <div className="num-container">
            {item.value.map((value) => {
              return (
                <button
                  key={`valye-${value}`}
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
          onDoubleClick={() => remove(item.id)}
        >
          {item.value.map((value) => {
            return (
              <button key={`valye-${value}`} className={item.bodyStyle}>
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
        onDoubleClick={() => remove(item.id)}
      >
        <div className={item.bodyStyle}>
          <div className={item.valueStyle}>{item.value}</div>
        </div>
      </li>
    );
  }
};

export default Item;
