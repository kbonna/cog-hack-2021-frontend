import React from "react";
import styles from "./EmotionsChart.module.scss";

const EmotionsChart = ({ emotions }) => {
  return (
    <>
      <p className={styles.title}>We can tell that you're...</p>
      {Object.entries(emotions).map(([emotion, score]) => (
        <div key={emotion} className={styles.barWrapper}>
          <span className={styles.barTitle}>{emotion}</span>
          <div className={styles.outerBar}>
            <div
              className={styles.innerBar}
              style={{ width: `${score * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
      <p className={styles.rememberTitle}>Kind reminder:</p>
      <p className={styles.remember}>
        You can change the value for each emotion by using the sliders beaneatch
        emotions labels
      </p>
    </>
  );
};

export default EmotionsChart;
