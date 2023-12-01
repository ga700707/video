import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import { Highlight } from './highLight/index'
import { HomePage } from "./page/landingPage.tsx";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <HomePage />
        {/* <ReactPlayer
          url="https://www.youtube.com/watch?v=HgzGwKwLmgM"
          playing={true}
          volume={0.8}
          width="800px"
          heght="450px"
        /> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
