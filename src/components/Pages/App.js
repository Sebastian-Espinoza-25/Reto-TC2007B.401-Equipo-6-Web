import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../DashboardTools/Dashboard";
import "../styles/App.css";

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
