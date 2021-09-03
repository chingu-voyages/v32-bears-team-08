import React, { useReducer, useContext } from "react";
import { userContext } from "../../App";
import sendEmail from "../../services/send-email";
import styles from "./style.module.css";

const initialState = {
  message: "",
  reqSuccess: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_REQ_SUCCESS":
      return {
        ...state,
        reqSuccess: action.payload,
      };
    default:
      return { ...state };
  }
}

function EmailForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { appState } = useContext(userContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      text: state.message,
      sender: appState.user.id,
      recipient: appState.currentProfileId,
    };

    sendEmail
      .postEmail(data)
      .then((res) => {
        dispatch({ type: "SET_REQ_SUCCESS", payload: true });
        dispatch({ type: "SET_MESSAGE", payload: "" });
        e.target.message.value = "";
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          payload: err.message,
        });
      });
  }

  return (
    <div className={styles["email"]}>
      <form
        className={styles["email__form"]}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="subject" className={styles["email__form__label"]}>
          Subject
        </label>
        <input
          type={"text"}
          id={"subject"}
          name={"subject"}
          placeholder={"Subject"}
          value={"Hi from Learn Together!"}
          readOnly
          className={styles["email__form__input"]}
        ></input>

        <label htmlFor="message" className={styles["email__form__label"]}>
          Message
        </label>
        <textarea
          type={"text"}
          id={"message"}
          name={"message"}
          rows={"10"}
          placeholder={"Message"}
          value={state.message}
          className={styles["email__form__textarea"]}
          onChange={(e) => {
            dispatch({ type: "SET_MESSAGE", payload: e.target.value });
          }}
        />

        <button className={styles["email__form__button"]} type="submit">
          Send
        </button>
        {state.reqSuccess && <span className={styles["status"]}>Sent!</span>}
      </form>
    </div>
  );
}

export default EmailForm;
