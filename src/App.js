import "./App.css";
import "./styles/styles.scss";

import { Nav } from "./components/nav/Nav";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Nav />
      <Sidebar />
    </div>
  );
}

export default App;
