import "../App.css";
import { useDrop } from "react-dnd";
import { useState } from "react";

interface DropResult {
  content: never;
}

const Constructor = () => {
  const [items, setItems]: any = useState([]);
  const [constructorStyle, setConstructorStyle] = useState("constructor");

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "rec",
    item: {},
    drop: (item, monitor) => {
      const dropResult: any = monitor.getItem();
      console.log(typeof items);
      items.push(dropResult.content);
      setConstructorStyle("constructor2");
      // return setItems([...items, dropResult.content]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  console.log(items);

  return (
    <ul
      className={constructorStyle}
      ref={drop}
      style={{ backgroundColor: isOver ? "#f0f9ff" : "white" }}
    >
      {items}
    </ul>
  );
};

export default Constructor;
