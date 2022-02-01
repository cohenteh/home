import styles from "./App.module.scss";
import Search from "./components/Search/Search";
import SearchHistory from "./components/SearchHistory/SearchHistory";

export default function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topText}>Search</div>
      <div className={styles.frame}>
        <Search />
      </div>
      <div className={styles.frame}>
        <SearchHistory />
      </div>
    </div>
  );
}
