import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ correct, totalQuestions, onClickStartAgain }) {
    return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt=""/>
      <h2>Вы отгадали {correct} ответа из {totalQuestions}</h2>
      <button onClick={() => onClickStartAgain()}>Попробовать снова</button>
    </div>
  );
}

function Game({ step, question, onClickVariants }) {
  
  const percentage = Math.round((step/questions.length)*100); 

  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>; // or handle the empty state accordingly
  }else{
        return (
          <>
            <div className="progress">
              <div style={{ width: `${percentage}%`}} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
              {
                question.variants.map(
                  (text, index) => 
                  <li onClick={() => onClickVariants(index)} key={text}> {text}
                  </li>)
              }
            </ul>
          </>
        );
      }
} 

function App() {

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariants = (index) =>
  {
    setStep(step+1);
    if (index === question.correct) {
      setCorrect(correct + 1); 
    }
  }

  const onClickStartAgain = () =>
  {
    setStep(0);
    setCorrect(0);
  }

  return (
    <div className="App">
      {
        step !== questions.length ? (
          <Game step={step} question={question} onClickVariants={onClickVariants} />
        ) : (
          <Result correct={correct} totalQuestions={questions.length} onClickStartAgain = {onClickStartAgain} />
        )
      }
    </div>
  )
  
}

export default App;
