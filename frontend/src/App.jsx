import UserRouter from "./routers/UserRouter.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <ScrollToTop />
      <UserRouter />
    </div>
  );
}

export default App;
