import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
