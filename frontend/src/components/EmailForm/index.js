import React, { useReducer } from "react";
import sendEmail from "../../services/send-email";
import styles from "./style.module.css";

const initialState = {
  subject: "",
  message: "",
  sent: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SUBJECT":
      return {
        ...state,
        subject: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_SENT":
      return {
        ...state,
        sent: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}

function EmailForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function handleSubmit(e) {
    e.preventDefault();

    const info = {
      subject: state.subject,
      message: state.message,
    };
    console.log(info);

    sendEmail
      .postEmail(info)
      .then((res) => {
        dispatch({ type: "SET_SENT", payload: true });
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
          value={state.subject}
          className={styles["email__form__input"]}
          onChange={(e) => {
            dispatch({ type: "SET_SUBJECT", payload: e.target.value });
          }}
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
      </form>
    </div>
  );
}

export default EmailForm;
