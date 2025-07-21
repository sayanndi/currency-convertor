import { useEffect, useState } from "react";

function useCurrencyInfo(base = "usd") {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${base}`)
      .then((res) => res.json())
      .then((res) => setData(res.rates))
      .catch((err) => {
        console.error("Failed to fetch currency info", err);
        setData({});
      });
  }, [base]);

  return data;
}

export default useCurrencyInfo;
