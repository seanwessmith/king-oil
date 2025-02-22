import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/lobby" Component={Lobby} />
            <Route path="/game" Component={Game} />
          </Routes>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;