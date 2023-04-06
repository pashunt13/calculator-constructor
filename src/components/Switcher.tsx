import "../App.css";

const Switcher = () => {
  return (
    <div className="switcher">
      <div className="frame5">
        <div className="frame4">
          <div className="eye">
            <div className="eye-outside"></div>
            <div className="eye-inside"></div>
          </div>
          Runtime
        </div>
      </div>
      <div className="frame6">
        <div className="frame4">
          <div className="g">{"<>"}</div>
          Constructor
        </div>
      </div>
    </div>
  );
};

export default Switcher;
