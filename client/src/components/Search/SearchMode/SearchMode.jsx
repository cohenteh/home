import styles from "./SearchMode.module.scss";
import { SEARCH_MODE } from "../../../const";
import cx from "classnames";

export default function SearchMode({ searchMode, setSearchMode }) {
  return (
    <div className={styles.buttons}>
      <div
        className={cx(styles.searchModeButton, {
          [styles.pressed]: searchMode === SEARCH_MODE.ADVANCE
        })}
        onClick={() => {
          setSearchMode(SEARCH_MODE.ADVANCE);
        }}
      >
        advance search
      </div>
      <div
        className={cx(styles.searchModeButton, {
          [styles.pressed]: searchMode === SEARCH_MODE.SIMPLE
        })}
        onClick={() => {
          setSearchMode(SEARCH_MODE.SIMPLE);
        }}
      >
        simple search
      </div>
    </div>
  );
}
