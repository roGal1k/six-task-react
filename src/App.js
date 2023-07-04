import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  //const [rates, setRates] = React.useState([]);
  const rates = React.useRef({});

  React.useEffect(()=>{

      fetch('https://api.currencyapi.com/v3/latest?apikey=caAvKqtDwhaM1Bvl9tkOgRHLWdE30f2fZNB5QCNp')
      .then((res) => res.json())
      .then((json) => {
        onChangeToPrice(1);
        //setRates(json.data);
        rates.current = json.data;
        console.log(json.data);
      }).catch(err=> {
        console.warn(err);
        alert('Not connection with server')
      });
  },[]);

  const onChangeFromPrice = (value) => {
    if (rates.current[fromCurrency]) {
      const price = value / rates.current[fromCurrency].value;
      const result = price * rates.current[toCurrency].value;
      setToPrice(result.toFixed(4));
      setFromPrice(value);
    }
  };

  const onChangeToPrice = (value) => {
    if (rates.current[toCurrency]) {
      const price = value / rates.current[toCurrency].value;
      const result = price * rates.current[fromCurrency].value;
      setToPrice(value);
      setFromPrice(result.toFixed(4));
    }
  };
  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  },[fromCurrency, fromPrice]
  );

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  },[toCurrency, toPrice]
  );


  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
