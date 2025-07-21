import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency = "USD") {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.rates || {});
      })
      .catch((err) => {
        console.error("API fetch failed:", err);
        setData({});
      });
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;
