import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { MyDailyStatus } from "./pages/MyDailyStatus/MyDailyStatus";
import { MyLeave } from "./pages/Myleave/MyLeave";
import Holidays from "./pages/Holidays/Holidays";
import SendMyDailyStatus from "./pages/SendMyDailyStatus/SendMyDailyStatus";
import { MyDailyStatusNew_id } from "./pages/MyDailyStatus/MyDailyStatusNew";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/notFound/NotFound";
import ForgotPassword from "./Auth/ForgotPassword";
import Signup from "../src/Auth/signup/index";
import Login from "../src/Auth/Login/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthenticationRoutes } from "./Auth/authentication";
import ProjectUpdate from "./pages/projectUpdate/projectUpdate";
import {EditEmployeesDetails} from "./pages/editEmployeesDetails/EditEmployeesDetails"
import {AddSkills} from "./pages/editSkills/AddSkills"
import {EditSkills} from "./pages/editSkills/EditSkills"
import EditPersonalInfo from "./pages/Edit_personal_info/EditPersonalInfo";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(1, 4, 9)",
    },
  },
});
function App() {
  const role = localStorage.getItem("role");
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {role === "admin" && (
              <>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/projectUpdate" element={<ProjectUpdate />} />
              </>
            )}
            <Route
              path="/"
              element={
                <AuthenticationRoutes>
                  <Dashboard />{" "}
                </AuthenticationRoutes>
              }
            />
            <Route path="/daily_status_updates" element={<MyDailyStatus />} />
            <Route
              path="/daily_status_updates_details/"
              element={<MyDailyStatusNew_id />}
            />
            <Route path="/send_daily_status" element={<SendMyDailyStatus />} />
            <Route path="/my_leave" element={<MyLeave />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/add-skills" element={<AddSkills />} />
            <Route path="/edit_skills" element={<EditSkills />} />
            <Route path="/edit_profile" element={<EditEmployeesDetails />} />
            <Route path="/edit_personal_info" element={< EditPersonalInfo/>} />
            
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
