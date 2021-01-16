import React from "react";
import styles from "./Nav.module.scss";

const Nav = ({ children }) => {
  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <img
          alt={"Moodlist logo"}
          className={styles.logoImg}
          src={process.env.PUBLIC_URL + "/static/logo.png"}
        ></img>
        <h1 className={styles.logoTitle}>Moodlist</h1>
      </div>
      <div className={styles.nav}>{children}</div>
    </nav>
  );
};

export default Nav;
