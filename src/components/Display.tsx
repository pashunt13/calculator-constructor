import "../App.css";
import { useDrag } from "react-dnd";

const Display = () => {
  const id = 1;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "rec",
    item: { id: 1, content: <Display /> },
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
      <div className="display">
        <div className="display-nums">0</div>
      </div>
    </li>
  );
};

export default Display;
