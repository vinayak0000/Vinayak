import React from "react";

const Star = props => {
  let star = [];
  for (let i = 0; i < props.randomNumber; i++) {
    star.push(<i> * </i>);
  }
  return <div className="star">{star}</div>;
};
const Button = props => {
  let button;
  switch (props.isAnswer) {
    case true:
      button = (
        <button className="btn" onClick={props.verifyAnswer}>
          Correct
        </button>
      );
      break;
    case false:
      button = <button className="btn">Wrong</button>;
      break;
    default:
      button = (
        <button
          className="btn"
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}
        >
          Check
        </button>
      );
  }
  return <div className="button">{button}</div>;
};
const Refresh = props => {
  return (
    <div className="refresh">
      <button
        className="btn"
        disabled={props.reDraw === 0}
        onClick={props.refreshStar}
      >
        Refresh: {props.reDraw}{" "}
      </button>
    </div>
  );
};
const Answer = props => {
  return (
    <div className="answer">
      {props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unselectNum(number)}>
          {number}
        </span>
      ))}
    </div>
  );
};
const Number = props => {
  const numberClassName = i => {
    if (props.selectedNumbers.indexOf(i) >= 0) {
      return "selected";
    }
    if (props.usedNumber.indexOf(i) >= 0) {
      return "used";
    }
  };
  let Num = [];
  for (let i = 1; i < 10; i++) {
    Num.push(
      <span className={numberClassName(i)} onClick={() => props.selectedNum(i)}>
        {i}
      </span>
    );
  }
  return <div className="number">{Num}</div>;
};

export class Final extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  state = {
    randomNumber: Final.randomNumber(),
    selectedNumbers: [],
    isAnswer: null,
    usedNumber: [],
    reDraw: 5
  };
  selectedNum = clickedNumber => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      return false;
    }
    if (this.state.usedNumber.indexOf(clickedNumber) >= 0) {
      return false;
    }

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      isAnswer: null
    }));
  };
  unselectNum = clickedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      ),
      isAnswer: null
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      isAnswer:
        prevState.randomNumber ===
        prevState.selectedNumbers.reduce((total, num) => total + num, 0)
    }));
  };
  verifyAnswer = () => {
    this.setState(prevState => ({
      usedNumber: prevState.usedNumber.concat(this.state.selectedNumbers),
      selectedNumbers: [],
      isAnswer: null,
      randomNumber: Final.randomNumber()
    }));
  };
  refreshStar = () => {
    this.setState(prevState => ({
      randomNumber: Final.randomNumber(),
      isAnswer: null,
      selectedNumbers: [],
      reDraw: prevState.reDraw - 1
    }));
  };

  render() {
    const {
      randomNumber,
      selectedNumbers,
      isAnswer,
      usedNumber,
      reDraw
    } = this.state;
    return (
      <div className="body">
        <div className="container">
          <Star randomNumber={randomNumber} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            isAnswer={isAnswer}
            verifyAnswer={this.verifyAnswer}
          />
          <Refresh refreshStar={this.refreshStar} reDraw={reDraw} />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNum={this.unselectNum}
          />
        </div>
        <div className="container2">
          <Number
            selectedNumbers={selectedNumbers}
            selectedNum={this.selectedNum}
            usedNumber={usedNumber}
          />
        </div>
      </div>
    );
  }
}
