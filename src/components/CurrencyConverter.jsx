import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const currency = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("BTC");
  // eslint-disable-next-line no-unused-vars
  const [amount, setAmount] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  const convert = () => {
    var options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: fromCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: toCurrency,
      },
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": "285093f868msh754696322b7b83ap1fdd4fjsnf70fc0c2525d",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(fromCurrency);
  // console.log(toCurrency);
  // console.log(amount);
  // console.log(exchangeRate);

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>

      <div className="input-box">
        <table>
          <tbody>
            {/* Curency From */}
            <tr>
              <td>From: </td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    // convert();
                  }}
                />
              </td>
              <td>
                <select
                  name="currency-option-1"
                  value={fromCurrency}
                  className="currency-options"
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currency.map((cur, ind) => (
                    <option key={ind}>{cur}</option>
                  ))}
                </select>
              </td>
            </tr>
            {/* Currency To */}
            <tr>
              <td>To: </td>
              <td>
                <input
                  type="number"
                  value={result}
                  name="currency-amount-2"
                  disabled={true}
                />
              </td>
              <td>
                <select
                  name="currency-option-2"
                  value={toCurrency}
                  className="currency-option"
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currency.map((cur, ind) => (
                    <option key={ind}>{cur}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={convert}>Convert</button>
      </div>
      <ExchangeRate
        ExchangeRate={exchangeRate}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
};

export default CurrencyConverter;
