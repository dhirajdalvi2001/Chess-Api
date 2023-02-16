import React, { useContext, useEffect, useState } from "react";
import { usernameContext } from "../../App";
import SearchCard from "./searchCard.component";
import defaultPP from "../../../public/defaultPP.png";
import "./searchResults.styles.css";

let nextId = 0;
const LOCAL_STORAGE_KEY = "searchHistory";

const SearchResults = () => {
  const { username, setUsername } = useContext(usernameContext);
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  });
  const [searchInputValue, setSearchInputValue] = useState("");
  let updatedValue = {};
  function changeInput(e) {
    setSearchInputValue(e.target.value);
  }
  function handleChange() {
    updatedValue = {
      name: searchInputValue,
    };
    setUsername((e) => ({
      ...e,
      ...updatedValue,
    }));
    setUsername(searchInputValue);
  }
  function fetchHistory() {
    username.avatar &&
      setSearchHistory([
        ...searchHistory,
        { id: nextId++, name: searchInputValue, avatar: username.avatar },
      ]);
  }
  // useEffect(() => {
  //   console.log(username);
  // }, [username]);
  useEffect(() => {
    const foundUsername = searchHistory.find((e) => {
      const tempName = e.name;
      return tempName.includes(searchInputValue);
    });
    if (!foundUsername) {
      fetchHistory();
    }
  }, [username.avatar]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    setSearchInputValue("");
  }, [searchHistory]);

  // useEffect(() => {
  //   const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  //   console.log("searchHistory : " + searchHistory.length);
  //   if (searchHistory) {
  //     setSearchHistory(searchHistory);
  //   }
  // }, []);

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      handleChange();
    }
  }

  return (
    <div id="SearchResults">
      <div className="search-box">
        <input
          type="text"
          name="searchUsernames"
          id=""
          className="searchInput"
          value={searchInputValue}
          onChange={(e) => {
            changeInput(e);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Search Username Here"
        />
        <input
          type="button"
          value="Search"
          className="searchButton"
          onClick={handleChange}
        />
      </div>
      <div className="searchHistory">
        {searchHistory
          .map((e) => {
            return username.avatar ? (
              <SearchCard username={e.name} avatar={e.avatar} key={e} />
            ) : (
              <SearchCard
                username={e.name}
                avatar={e.avatar ? e.avatar : defaultPP}
                key={e}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default SearchResults;
