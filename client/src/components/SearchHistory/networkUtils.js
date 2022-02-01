import { serverURL } from "../../const";
export const HISTORY_PATH = `${serverURL}history`;

export const getHistorySearch = () => {
  return fetch(HISTORY_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(err => alert(err));
};
