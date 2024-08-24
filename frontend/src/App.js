import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "./auth/AuthWrapper";
import "./App.css";

function App() {
  return (
    <div className="App bg-blue w-screen min-h-screen pb-12">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
