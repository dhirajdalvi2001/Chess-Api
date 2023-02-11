import React, { useContext, useEffect, useState } from "react";
import { usernameContext } from "../../App";
import defaultPP from "../../../public/defaultPP.png";
import { IoMdStopwatch } from "react-icons/io";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { GiSilverBullet } from "react-icons/gi";
import { HiPuzzle } from "react-icons/hi";
import "./profile.styles.css";
import { CircularProgress, LinearProgress } from "@mui/material";

const Profile = () => {
  const { username, setUsername } = useContext(usernameContext);
  const [loading, setLoading] = useState(true);
  let updatedValue = {};

  const fetchPlayerInfo = async () => {
    setLoading(!loading);
    console.log(username.name);
    return await fetch("https://api.chess.com/pub/player/" + username)
      .then((response) => response.json())
      .then(async (data) => {
        var countryName = "";
        countryName = data.country;
        updatedValue = {
          name: data.username,
          followers: data.followers,
          avatar: data.avatar ? data.avatar : defaultPP,
          title: data.title,
          status: data.status,
        };
        setUsername((e) => ({
          ...e,
          ...updatedValue,
        }));
        await fetch(countryName)
          .then((response) => response.json())
          .then((temp) => {
            countryName = temp.name;
            updatedValue = {
              country: countryName,
            };
            setUsername((e) => ({
              ...e,
              ...updatedValue,
            }));
          });
        await fetch("https://api.chess.com/pub/player/" + username + "/stats")
          .then((response) => response.json())
          .then(async (data) => {
            updatedValue = {
              stats: data,
              // blitz: data.chess_blitz.last.rating,
              // bullet: data.chess_bullet.last.rating,
              // rapid: data.chess_rapid.last.rating,
              // rush: data.puzzle_rush.last.rating,
            };
            setUsername((e) => ({
              ...e,
              ...updatedValue,
            }));
          })
          .catch((rejected) => {
            console.log(rejected);
          });
        setLoading(!loading);
      });
  };

  useEffect(() => {
    username && fetchPlayerInfo();
  }, [username]);

  const statsData = [
    {
      icon: <IoMdStopwatch className="icon" />,
      type: "Rapid",
    },
    {
      icon: <AiTwotoneThunderbolt className="icon" />,
      type: "Blitz",
    },
    {
      icon: <GiSilverBullet className="icon" />,
      type: "Bullet",
    },
    {
      icon: <HiPuzzle className="icon" />,
      type: "PuzzleRush",
    },
  ];
  return (
    <div id="Profile">
      {username && (
        <div className="Profile-info">
          {loading ? (
            <div className="Loading-box">
              <CircularProgress disableShrink />
            </div>
          ) : (
            <>
              <div className="profilePic-container">
                <img
                  src={username.avatar}
                  alt=""
                  srcSet=""
                  className="profilePic"
                />
              </div>
              <div className="profileInfo-container">
                <h1 className="heading1">{username.name}</h1>
                <h4 className="heading4">
                  {username.followers && "Followers: " + username.followers}
                </h4>
                <h4 className="heading4">
                  {username.country && "Country: " + username.country}
                </h4>
                <h4 className="heading4">
                  {username.title && "Title: " + username.title}
                </h4>
                <h4 className="heading4">
                  {username.status && "Status: " + username.status}
                </h4>
              </div>
            </>
          )}
          {console.log(username)} {/*object for username*/}
        </div>
      )}
      {username.stats && (
        <div className="profileStats-container">
          {loading ? (
            <>
              <span class="loader">
                <span class="loader-inner"></span>
              </span>
            </>
          ) : (
            <>
              {statsData.map((e) => {
                return (
                  <div className="stats-box">
                    <div className="icon-box">{e.icon}</div>
                    <h3>{e.type}</h3>
                    <h3 className="rating">
                      {username.stats &&
                      username.status !== "closed" &&
                      e.type === "Rapid" ? (
                        username.stats.chess_rapid.last.rating &&
                        username.stats.chess_rapid.last.rating
                      ) : e.type === "Blitz" ? (
                        username.stats.chess_blitz.last.rating &&
                        username.stats.chess_blitz.last.rating
                      ) : e.type === "Bullet" ? (
                        username.stats.chess_bullet.last.rating &&
                        username.stats.chess_bullet.last.rating
                      ) : e.type === "PuzzleRush" ? (
                        username.stats.puzzle_rush.best.score &&
                        username.stats.puzzle_rush.best.score
                      ) : (
                        <></>
                      )}
                    </h3>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
