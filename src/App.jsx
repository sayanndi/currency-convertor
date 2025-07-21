import { useState } from 'react'
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Always use fixed base (e.g., "usd") to get all available currencies
  const currencyInfo = useCurrencyInfo("usd");
  const options = Object.keys(currencyInfo || {});

  const convert = () => {
    if (!currencyInfo[to] || !currencyInfo[from]) return;
    const usdValue = amount / currencyInfo[from]; // Convert to USD first
    const result = usdValue * currencyInfo[to]; // Then convert USD → target
    setConvertedAmount(result);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center px-4"
     style={{
       backgroundImage: `url('https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg')`
     }}>
  <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl p-8">
    <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wide drop-shadow-lg">💱 Currency Converter</h1>

    <form onSubmit={(e) => {
      e.preventDefault();
      convert();
    }} className="space-y-6">
      {/* FROM box */}
      <InputBox
        label="From"
        amount={amount}
        currencyOptions={options}
        onCurrencyChange={(currency) => setFrom(currency)}
        selectCurrency={from}
        onAmountChange={(amount) => setAmount(amount)}
      />

      {/* Swap Button */}
      <div className="relative w-full flex justify-center">
        <button
          type="button"
          onClick={swap}
          className="px-4 py-1 bg-white text-blue-600 font-semibold rounded-full border border-blue-500 hover:bg-blue-50 active:scale-95 transition"
        >
          🔄 Swap
        </button>
      </div>

      {/* TO box */}
      <InputBox
        label="To"
        amount={convertedAmount}
        currencyOptions={options}
        onCurrencyChange={(currency) => setTo(currency)}
        selectCurrency={to}
        amountDisable
      />

      {/* Convert Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition"
      >
        Convert {from.toUpperCase()} to {to.toUpperCase()}
      </button>
    </form>
  </div>
</div>

  )
}

export default App;
