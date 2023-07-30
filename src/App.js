import './App.css';
import DataTable from "./components/Table";
import logo from "./images/logo.png"
import data from "./data.json"
import help from "./images/help.png"
import info from "./images/info.png"
import userPicture from "./images/userPicture.png"
import Header from "./components/Header";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {


  return (
    <div className="App">
       <Sidebar />
        <Main />
    </div>
  );
}

export default App;
