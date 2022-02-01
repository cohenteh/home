import { serverURL } from "../../const";
export const SEARCH_PATH = `${serverURL}search`;

export const postInputs = inputs => {
  return fetch(SEARCH_PATH, {
    method: "POST",
    body: JSON.stringify({ queries: inputs }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
