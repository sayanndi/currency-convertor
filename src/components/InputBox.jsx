import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
}) {
  const amountInputId = useId();

  return (
    <div className="bg-white p-3 rounded-xl text-sm flex justify-between items-end shadow-md">
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-gray-500 mb-1 block">
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="w-1/2 text-right">
        <label className="text-gray-500 mb-1 block">Currency Type</label>
        <select
          className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 cursor-pointer"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.length > 0 ? (
            currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
