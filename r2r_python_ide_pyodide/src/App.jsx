import MainView from "./components/MainView.jsx";
import { AllContextProviders } from "./contextapi/AllContextProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <div className="overflow-x-hidden max-h-max pb-2">
      <AllContextProviders>
        <div
          className={`flex justify-center`}
        >
          <div className={`annotation max-w-[750px]`}>
            <MainView />
            <ToastContainer />
          </div>
        </div>
      </AllContextProviders>
    </div>
  );
}

export default App;
