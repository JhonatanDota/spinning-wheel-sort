import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer, Flip } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
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
