import Email from "../Email";
import PartnerProfile from "../PartnerProfile";
import styles from "./style.module.css";

function Partner() {
  return (
    <div className={styles["partner"]}>
      <PartnerProfile></PartnerProfile>
      <Email></Email>
    </div>
  );
}

export default Partner;
