import { getHistorySearch } from "./networkUtils";
import React, { useState } from "react";
import styles from "./SearchHistory.module.scss";

export default function SearchHistory() {
  const [history, setHistory] = useState([]);
  return (
    <div>
      {history.length !== 0 ? " last 5 searches" : null}
      <ol className={styles.historySearchWrapper}>
        {history.map((search, index) => (
          <li className={styles.historySearch} key={index}>
            {search}
          </li>
        ))}
      </ol>

      <button
        className={styles.refreshButton}
        onClick={async () => {
          const historySearch = await getHistorySearch();
          setHistory(historySearch.map(({ requestInput }) => requestInput));
        }}
      >
        {history.length === 0 ? "show last 5 history search" : "Refresh"}
      </button>
    </div>
  );
}
