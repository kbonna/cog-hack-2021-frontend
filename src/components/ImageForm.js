import React from "react";
import styles from "./ImageForm.module.scss";
import Upload from "../icons/Upload";

const ImageForm = ({
  handleSubmit,
  handleImageChange,
  handleRemoveImage,
  image,
  imageUrl,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Show us your current emotions</h2>
      <p className={styles.instructions}>
        With the help of the photo showing your current mood, we will read your
        emotions and create suitable playlist
      </p>
      <p className={styles.instructionsShort}>Upload your front face photo</p>
      <div className={styles.load}>
        <div className={styles.loadContent}>
          {image ? (
            <>
              <img className={styles.image} src={imageUrl} />
              <button className={styles.closeBtn} onClick={handleRemoveImage}>
                ×
              </button>
            </>
          ) : (
            <label className={styles.uploadBtn} htmlFor="image">
              <Upload
                svgClassName={styles.uploadSvg}
                pathClassName={styles.uploadPath}
              ></Upload>
            </label>
          )}
          <input
            className={styles.input}
            id="image"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleImageChange}
            required
          ></input>
        </div>
      </div>
      <p className={styles.selectTitle}>Make me a playlist:</p>
      <ul className={styles.selectList}>
        <li className={`${styles.selectItem} ${styles.selectItemSelected}`}>
          From my Spotify listening history
        </li>
        <li className={styles.selectItem}>From unknown songs</li>
        <li className={styles.selectItem}>Mixed (known & unknown songs)</li>
      </ul>
      <button className={styles.button} type="submit" disabled={image === null}>
        Create your moodlist
      </button>
    </form>
  );
};

export default ImageForm;
