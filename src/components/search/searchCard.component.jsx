import React, { useContext } from "react";
import { usernameContext } from "../../App";
import "./searchResults.styles.css";

const SearchCard = (props) => {
  const { username, setUsername } = useContext(usernameContext);
  function handleClick() {
    setUsername(props.username);
  }
  return (
    <div id="searchCard" onClick={handleClick}>
      <div className="profilePicArea">
        {props.avatar && (
          <img src={props.avatar} alt="" srcSet="" className="profilePic" />
        )}
      </div>
      <h3 className="heading3">{props.username}</h3>
    </div>
  );
};

export default SearchCard;
