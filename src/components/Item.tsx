import "../App.css";
import { ItemModel, Type } from "../models";
import { useEffect, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

interface ItemProps {
  item: ItemModel;
  isCalculatorItem: boolean;
  deleteHandler?: Function;
  index: number;
  moveItem?: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Item = ({
  item,
  isCalculatorItem,
  deleteHandler = () => null,
  index,
  moveItem = () => null,
}: ItemProps) => {
  const [canDrag, setCanDrag] = useState(item.canDrag);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "calcItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: isCalculatorItem ? "calcItem" : "item",
      item: () => {
        return { item, index };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [index]
  );

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

  useEffect(() => {
    setCanDrag(isCalculatorItem ? isCalculatorItem : item.canDrag);
    if (item.type === Type.Display && isCalculatorItem) {
      drag(null);
    } else if (item.canDrag) {
      drag(ref);
    } else if (isCalculatorItem) {
      drag(drop(ref));
    } else {
      drag(null);
    }
  }, [item, isCalculatorItem, drag, drop]);

  if (Array.isArray(item.value)) {
    if (item.type === Type.Nums) {
      return (
        <li
          key={item.id}
          className="item"
          ref={ref as any}
          data-handler-id={handlerId}
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
          ref={ref as any}
          data-handler-id={handlerId}
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
        ref={ref as any}
        data-handler-id={handlerId}
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
