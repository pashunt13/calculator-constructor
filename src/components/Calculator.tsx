import "../App.css";
import { useDrop } from "react-dnd";
import { useState, useCallback } from "react";
import update from "immutability-helper";
import Item from "./Item";
import { ItemModel, Type } from "../models";

interface CalculatorProps {
  onItemUpdate: Function;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  item: ItemModel;
}

const initialItems: ItemModel[] = [];

const Calculator = ({ onItemUpdate }: CalculatorProps) => {
  const [items, setItems] = useState(initialItems);
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "item",
      item: {},
      drop: (item, monitor) => {
        const dropResult: DropResult = monitor.getItem();
        if (dropResult.item.canDrag) {
          onItemUpdate({ ...dropResult.item, canDrag: false });
          if (dropResult.item.type === Type.Display) {
            setItems([{ ...dropResult.item, canDrag: false }, ...items]);
          } else {
            setItems([...items, { ...dropResult.item, canDrag: false }]);
          }
        }
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [items]
  );

  const deleteHandler = useCallback(
    (id: number) => {
      setItems(items.filter((item: ItemModel) => item.id !== id));
      onItemUpdate({ id, canDrag: true });
    },
    [items, onItemUpdate]
  );

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: ItemModel[]) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as ItemModel],
        ],
      })
    );
  }, []);

  const renderItem = useCallback(
    (item: ItemModel, index: number) => {
      return (
        <Item
          key={item.id}
          item={item}
          isCalculatorItem={true}
          deleteHandler={deleteHandler}
          index={index}
          moveItem={moveItem}
        />
      );
    },
    [deleteHandler, moveItem]
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

  return (
    <div className="calculator" ref={drop}>
      <ul
        className="calculator-items"
        style={{
          borderBottom: canDrop ? "1px #5d5fef solid" : "none",
        }}
      >
        {items.map((item: ItemModel, i: number) => renderItem(item, i))}
      </ul>
    </div>
  );
};

export default Calculator;
