import React from "react";
import "./index.scss";

function App() {
  const [count, updateCount] = React.useState(0);

  const onClickPlus = () => {
    updateCount(count + 1);
    console.log(count);
  };

  const onClickMinus = () => {
    if (count !== 0) updateCount(count - 1);
    console.log(count);
  };

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button on onClick={onClickMinus} className="minus">
          - Минус
        </button>
        <button onClick={onClickPlus} className="plus">
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
