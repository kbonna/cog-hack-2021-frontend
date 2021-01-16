import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import { USERNAME, CLIENT_ID } from "../secrets";

import Nav from "./Nav";
import ImageForm from "./ImageForm";
import Spinner from "./Spinner";
import Logout from "../icons/Logout";
import Recommendation from "./Recommendation";
import styles from "./App.module.scss";

const API_ULR = "http://localhost:8000/api/faces/";
const APP_URL = "http://localhost:3000";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const MOODS = new Set([
  "angry",
  "disgust",
  "fear",
  "happy",
  "sad",
  "surprise",
  "neutral",
]);

function App() {
  const [image, setImage] = useState(null);
  const [emotions, setEmotions] = useState(null);
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = () => {
    setEmotions(null);
    if (token !== "") {
      axios
        .get(`${SPOTIFY_API_URL}/users/${USERNAME}/playlists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setPlaylists(
            res.data.items
              .map((item) => ({
                name: item.name,
                url: item.external_urls.spotify,
              }))
              .filter((playlist) => MOODS.has(playlist.name))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(fetchPlaylists, [token]);

  const handleLogout = (e) => {
    Cookies.remove("spotifyAuthToken");
    setToken("");
    setPlaylists([]);
    setEmotions(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("image", image);
    setEmotions("loading");
    axios
      .post(API_ULR, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setEmotions(res.data.emotions);
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  let appContent;
  if (emotions === null) {
    appContent = (
      <ImageForm
        image={image}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
      ></ImageForm>
    );
  } else if (emotions === "loading") {
    appContent = <Spinner></Spinner>;
  } else {
    appContent = (
      <Recommendation
        emotions={emotions}
        playlists={playlists}
      ></Recommendation>
    );
  }

  return (
    <div className="app">
      <Nav>
        {token ? (
          <button className={styles.logout} onClick={handleLogout}>
            <Logout
              svgClassName={styles.svgClassName}
              pathClassName={styles.pathClassName}
            ></Logout>
          </button>
        ) : null}
      </Nav>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <div className={styles.appContentWrapper}>{appContent}</div>
        </SpotifyApiContext.Provider>
      ) : (
        <div className={styles.appContentWrapper}>
          <div className={styles.spotifyButtonWrapper}>
            <p className={styles.title}>
              Hello! Not sure what you are looking for today's mood?
            </p>
            <p className={styles.subtitle}>Let's find something to help you!</p>
            <SpotifyAuth
              redirectUri={`${APP_URL}/app/`}
              clientID={CLIENT_ID}
              scopes={[Scopes.userReadPrivate, "user-read-email"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
