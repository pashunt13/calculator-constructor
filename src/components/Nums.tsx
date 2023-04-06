import "../App.css";
import { useDrag } from "react-dnd";

const Nums = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "rec",
    item: { content: <Nums /> },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      key={3}
      className="rectangle"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <div className="num-container">
        <button className="math num">
          <div className="math-value">7</div>
        </button>
        <button className="math num">
          <div className="math-value">8</div>
        </button>
        <button className="math num">
          <div className="math-value">9</div>
        </button>
        <button className="math num">
          <div className="math-value">4</div>
        </button>
        <button className="math num">
          <div className="math-value">5</div>
        </button>
        <button className="math num">
          <div className="math-value">6</div>
        </button>
        <button className="math num">
          <div className="math-value">1</div>
        </button>
        <button className="math num">
          <div className="math-value">2</div>
        </button>
        <button className="math num">
          <div className="math-value">3</div>
        </button>
        <button className="math num-0">
          <div className="math-value">0</div>
        </button>
        <button className="math num">
          <div className="math-value">,</div>
        </button>
      </div>
    </li>
  );
};

export default Nums;
