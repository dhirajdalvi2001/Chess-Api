import { createContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import Profile from "./components/profile/profile.component";
import SearchResults from "./components/search/searchResults.component";

export const usernameContext = createContext();

function App() {
  const [username, setUsername] = useState({});

  useEffect(() => {}, [username]);

  return (
    <div className="App">
      <usernameContext.Provider value={{ username, setUsername }}>
        <Navbar />
        <div className="Body">
          <SearchResults />
          <Profile />
        </div>
      </usernameContext.Provider>
    </div>
  );
}

export default App;
