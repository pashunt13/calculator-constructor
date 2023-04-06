import "../App.css";
import { useDrag } from "react-dnd";

const MathSigns = () => {
  let gg;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "rec",
      item: <MathSigns />,
      // canDrag: (monitor) => {
      //   gg = monitor.canDrag() ? false : true;
      //   console.log(gg);
      //   return gg;
      // },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <li
      key={2}
      className="rectangle"
      ref={drag}
      style={{
        opacity: isDragging || gg ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "none",
      }}
    >
      <div className="math-group">
        <button className="math">
          <div className="math-value">/</div>
        </button>
        <button className="math">
          <div className="math-value">x</div>
        </button>
        <button className="math">
          <div className="math-value">-</div>
        </button>
        <button className="math">
          <div className="math-value">+</div>
        </button>
      </div>
    </li>
  );
};

export default MathSigns;
