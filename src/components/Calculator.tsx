import "../App.css";
import { useDrop } from "react-dnd";
import { useState } from "react";
import update from "immutability-helper";
import Item from "./Item";
import { ItemModel, Type, ItemType } from "../models";
import cn from "classnames";

interface CalculatorProps {
  onItemUpdate: Function;
}

interface DropItem {
  item: ItemModel;
}

const Calculator = ({ onItemUpdate }: CalculatorProps) => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: ItemType.Item,
      item: {},
      drop: (dropItem: DropItem) => {
        if (!dropItem.item.canDrag) {
          return;
        }
        onItemUpdate({ ...dropItem.item, canDrag: false });
        if (dropItem.item.type === Type.Display) {
          setItems([{ ...dropItem.item, canDrag: false }, ...items]);
        } else {
          setItems([...items, { ...dropItem.item, canDrag: false }]);
        }
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [items]
  );

  const deleteHandler = (newItem: ItemModel) => {
    setItems(items.filter((item: ItemModel) => item.id !== newItem.id));
    onItemUpdate({ ...newItem, canDrag: true });
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: ItemModel[]) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as ItemModel],
        ],
      })
    );
  };

  const emptyCalculator = cn("empty-calculator", {
    "canDrop-empty-calculator": canDrop,
  });

  const calculatorItems = cn("calculator-items", {
    "canDrop-calculator": canDrop,
  });

  if (items.length === 0) {
    return (
      <div className={emptyCalculator} ref={drop}>
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
      <ul className={calculatorItems}>
        {items.map((item: ItemModel, index: number) => {
          return (
            <Item
              key={item.id}
              item={item}
              isCalculatorItem
              deleteHandler={deleteHandler}
              index={index}
              moveItem={moveItem}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Calculator;
