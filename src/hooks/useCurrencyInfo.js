import { useEffect, useState } from 'react';

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then((res) => res.json())
      .then((res) => setData(res.rates))
      .catch((err) => {
        console.error("API Error:", err);
        setData({});
      });
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;
