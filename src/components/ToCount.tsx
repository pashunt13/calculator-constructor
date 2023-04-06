import "../App.css";
import { useDrag } from "react-dnd";

const ToCount = () => {
  const id = 4;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "rec",
    item: { content: <ToCount /> },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      key={id}
      className="rectangle"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <button className="math to-count">
        <div className="to-count-value">=</div>
      </button>
    </li>
  );
};

export default ToCount;
