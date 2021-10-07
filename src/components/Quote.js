import React, { useEffect, useCallback } from "react";
import { format as format$ } from "currency-formatter";
import useSWR from "swr";
import Loader from "./Loader";
import truncate from "../utils/truncate";

const Quote = ({ deposits, setQuote: _setQuote }) => {
  const setQuote = useCallback(_setQuote);
  const aud = deposits.reduce((acc, d) => d.amount + acc, 0);
  const url = deposits.length ? `/ir/quote?aud=${aud}` : null;
  const { data, isValidating } = useSWR(url);
  const btc = data ? aud / data : 0;

  useEffect(() => setQuote(data), [data, setQuote]);

  return (
    <div
      className="d-flex justify-content-start align-items-center"
      style={{ flex: 1, minHeight: "3.5rem" }}
    >
      <span className="d-flex mr-5">
        <span className="mr-2">AUD:</span>
        {format$(aud, { code: "AUD" })}
      </span>
      <span className="d-flex mr-5">
        <span className="mr-2">Quote:</span>
        {isValidating ? (
          <Loader loading noBackground noStretch diameter="1rem" />
        ) : (
          data || 0
        )}
      </span>
      <span className="d-flex mr-5">
        <span className="mr-2">Estimated BTC:</span>
        {isValidating ? (
          <Loader loading noBackground noStretch diameter="1rem" />
        ) : (
          truncate(btc, 8)
        )}
      </span>
    </div>
  );
};

export default Quote;
