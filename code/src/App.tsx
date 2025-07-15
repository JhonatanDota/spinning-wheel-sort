import { BrowserRouter, useLocation } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer, Flip } from "react-toastify";
import BackHome from "./components/BackHome";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <div className="mt-2 ml-2">
          <BackHome />
        </div>
      )}
      <Routes />
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>

      <ToastContainer
        className="font-bold"
        position="bottom-center"
        autoClose={1500}
        theme="dark"
        transition={Flip}
      />
    </>
  );
}

export default App;
