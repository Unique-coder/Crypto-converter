const ExchangeRate = ({ ExchangeRate, fromCurrency, toCurrency }) => {
  return (
    <div className="exchange-rate">
      <h2>Exchange Rate</h2>
      <p>
        {fromCurrency} to {toCurrency}
      </p>
      <p>{ExchangeRate}</p>
    </div>
  );
};

export default ExchangeRate;
