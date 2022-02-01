import styles from "./Queries.module.scss";
import { SEARCH_MODE } from "../../../const";
import React, { useState, useEffect } from "react";
import BIN from "../../../assets/bin.svg";
import PLUS from "../../../assets/plus.svg";
import Response from "../../Response/Response";
import { isPhoneOrEmail } from "../../../utils";
import { postInputs } from "../networkUtils";

export default function Queries({ searchMode }) {
  const [inputs, setInputs] = useState([""]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    setInputs([""]);
    setResponse(undefined);
  }, [searchMode]);

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <div className={styles.input} key={index}>
            <input
              className={styles.inputText}
              placeholder="enter phone or email"
              value={input}
              onChange={event => {
                const newInputs = inputs.map((input, inputsIndex) =>
                  inputsIndex !== index ? input : event.target.value
                );
                setInputs(newInputs);
                setResponse(undefined);
              }}
            />

            {inputs.length > 1 && searchMode === SEARCH_MODE.ADVANCE && (
              <img
                src={BIN}
                className={styles.delete_searchButton}
                onClick={() => {
                  setIsSubmitted(false);
                  const newInputs = inputs.filter(
                    (_, inputsIndex) => inputsIndex !== index
                  );
                  setInputs(newInputs);
                }}
                alt="bin"
              />
            )}

            {index === inputs.length - 1 && searchMode === SEARCH_MODE.ADVANCE && (
              <img
                src={PLUS}
                className={styles.delete_searchButton}
                onClick={() => {
                  setIsSubmitted(false);
                  setInputs([...inputs, ""]);
                }}
                alt="PLUS"
              />
            )}
          </div>

          <div className={styles.warning}>
            {isSubmitted && !isPhoneOrEmail(input)
              ? "Please enter a valid email or a phone number"
              : null}
          </div>

          <hr />
        </div>
      ))}

      {response && <Response responses={response} />}

      <button
        className={styles.button}
        onClick={async () => {
          setIsSubmitted(true);
          const isValidInputs = inputs.find(input => !isPhoneOrEmail(input));
          if (isValidInputs === undefined) {
            //all valids
            const response = await postInputs(inputs);
            setResponse(response);
            setIsSubmitted(false);
            setInputs([""]);
          }
        }}
      >
        search
      </button>
    </div>
  );
}
