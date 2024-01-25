import Login from "./components/Auth/Login/Login";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { MyDailyStatus } from "./components/Attendance/pages/MyDailyStatus/MyDailyStatus";
import { MyLeave } from "./components/Attendance/pages/Myleave/MyLeave";
import Holidays from "./components/Attendance/pages/Holidays/Holidays";
import SendMyDailyStatus from "./components/Attendance/pages/SendMyDailyStatus/SendMyDailyStatus";
import { MyDailyStatusNew_id } from "./components/Attendance/pages/MyDailyStatus/MyDailyStatusNew_id";
import Dashboard from "./components/Attendance/pages/Dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import ForgotPassword from "./components/Auth/Forgot_Password.jsx/ForgotPassword";
import Signup from "./components/Auth/signup/signup";
import MyDaily_status_edit from "./components/Attendance/pages/MyDailyStatus/MyDaily_status_edit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthenticationRoutes } from "./components/Auth/authenticatin";
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
            {role === "admin" && <Route path="/Signup" element={<Signup />} />}
            
              <Route path="/" element={<AuthenticationRoutes><Dashboard /> </AuthenticationRoutes>} />
              <Route path="/daily_status_updates" element={<MyDailyStatus />} />
              <Route
                path="/daily_status_updates_details/"
                element={<MyDailyStatusNew_id />}
              />

              <Route
                path="/daily_status_updates_details_edit"
                element={<MyDaily_status_edit />}
              />
              <Route
                path="/send_daily_status"
                element={<SendMyDailyStatus />}
              />
              <Route path="/my_leave" element={<MyLeave />} />
              <Route path="/holidays" element={<Holidays />} />
              <Route path="*" element={<NotFound />} />
           
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
