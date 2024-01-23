import Login from "./components/Auth/Login/Login";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { MyDailyStatus } from "./components/Attendance/pages/MyDailyStatus";
import { MyLeave } from "./components/Attendance/pages/MyLeave";
import Holidays from "./components/Attendance/pages/Holidays";
import SendMyDailyStatus from "./components/Attendance/pages/SendMyDailyStatus";
import { MyDailyStatusNew_id } from "./components/Attendance/pages/MyDailyStatusNew_id";
import Dashboard from "./components/Attendance/pages/Dashboard";
import NotFound from "./components/notFound/NotFound";
import ForgotPassword from "./components/Auth/Forgot_Password.jsx/ForgotPassword";
import Signup from "./components/Auth/signup/signup";
import MyDaily_status_edit from "./components/Attendance/pages/MyDaily_status_edit";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
 const role =localStorage.getItem('role')
  
  return (
    <>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily_status_updates" element={<MyDailyStatus />} />
          <Route
            path="/daily_status_updates_details/"
            element={<MyDailyStatusNew_id />}
          />
          
          <Route path="/daily_status_updates_details_edit" element={<MyDaily_status_edit/>} />
          <Route path="/send_daily_status" element={<SendMyDailyStatus />} />
          <Route path="/my_leave" element={<MyLeave />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {role === "admin" && <Route path="/Signup" element={<Signup />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </ThemeProvider>

    </>
  );
}

export default App;
