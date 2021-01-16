import React from "react";
import EmotionsChart from "./EmotionsChart";
import styles from "./Recommendation.module.scss";

const Recommendation = ({ emotions, playlists }) => {
  const dominantEmotion = Object.entries(emotions).filter(
    ([emotion, score]) => score === Math.max(...Object.values(emotions))
  )[0][0];
  const playlistUrl = playlists.filter(
    (playlist) => playlist.name === dominantEmotion
  )[0].url;
  console.log(playlistUrl);
  return (
    <div className={styles.recommendationWrapper}>
      <div className={styles.pieChartWrapper}>
        <EmotionsChart emotions={emotions}></EmotionsChart>
      </div>
      <p className={styles.ready}>Ready?</p>
      <div className={styles.linkWrapper}>
        <a className={styles.link} href={playlistUrl}>
          Listen your moodlist!
        </a>
      </div>
    </div>
  );
};

export default Recommendation;
