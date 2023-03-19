import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="calculator">
        <div className="rectangle">
          <div className="display">
            <div className="display-nums">0</div>
          </div>
        </div>

        <div className="rectangle">
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
        </div>

        <div className="rectangle">
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
        </div>

        <div className="rectangle">
          <button className="math to-count">
            <div className="to-count-value">=</div>
          </button>
        </div>
      </div>

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

      <div className="constructor">
        <div className="gg">
          <div className="text">Перетащите сюда</div>
          <div className="text2">любой элемент из левой панели</div>
        </div>
      </div>
    </div>
  );
}

export default App;
