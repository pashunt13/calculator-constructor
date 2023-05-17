import "../App.css";

const Switcher = () => {
  return (
    <div className="switcher">
      <div className="switcher-inactive">
        <div className="switcher-body">
          <div className="eye-outside">
            <div className="eye-inside"></div>
          </div>
          <div className="switcher-text">Runtime</div>
        </div>
      </div>
      <div className="switcher-active">
        <div className="switcher-body">
          <div className="arrows">{"<>"}</div>
          <div className="switcher-text">Constructor</div>
        </div>
      </div>
    </div>
  );
};

export default Switcher;
