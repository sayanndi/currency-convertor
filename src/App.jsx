import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo("usd");
  const options = Object.keys(currencyInfo || {});

  const convert = () => {
    if (!currencyInfo[to] || !currencyInfo[from]) return;
    const usdValue = amount / currencyInfo[from]; // convert to USD
    const result = usdValue * currencyInfo[to];   // convert USD → target
    setConvertedAmount(result.toFixed(2));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg"
          alt="background"
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b5876] via-transparent to-[#4e4376] opacity-70" />
      </div>

      {/* Converter UI */}
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wide drop-shadow-lg">
          💱 Currency Converter
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          convert();
        }} className="space-y-6">
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="relative w-full flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="px-4 py-1 bg-white text-blue-600 font-semibold rounded-full border border-blue-500 hover:bg-blue-50 active:scale-95 transition"
            >
              🔄 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
