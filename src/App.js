import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginSignupForm from "./components/LoginSignupForm";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignupForm></LoginSignupForm>} ></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
