import styles from './Search.module.scss';
import { SEARCH_MODE } from "../../const";
import React, { useState } from "react";
import SearchMode from "./SearchMode/SearchMode"
import Queries from "./Queries/Queries"

export default function Search() {
    const [searchMode, setSearchMode] = useState(SEARCH_MODE.SIMPLE);
    return (
        <div className={styles.wrapper}>
            <SearchMode searchMode={searchMode} setSearchMode={setSearchMode} />
            <Queries searchMode={searchMode} />
        </div >
    )
}