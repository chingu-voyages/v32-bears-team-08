import styles from "./style.module.css";

function Email() {
  async function handleSubmit(e) {
    e.preventDefault();
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
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          className={styles["email__form__input"]}
        ></input>
        <label htmlFor="message" className={styles["email__form__label"]}>
          Message
        </label>
        <textarea
          type="text"
          id="message"
          name="message"
          rows="10"
          placeholder="Message"
          className={styles["email__form__textarea"]}
        />

        <button className={styles["email__form__button"]} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Email;
