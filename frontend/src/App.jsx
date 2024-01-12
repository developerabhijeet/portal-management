import Login from "./components/Login/Login";

import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import { MyDailyStatus } from "./components/Attendance/MyDailyStatus";
import { MyLeave } from "./components/Attendance/MyLeave";
import { Holidays } from "./components/Attendance/Holidays";
import SendMyDailyStatus from "./components/Attendance/SendMyDailyStatus";
import { MyDailyStatusNew_id } from "./components/Attendance/MyDailyStatusNew_id";

import Header from "./components/Attendance/Header/Header";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/notFound/NotFound";


function App() {

  return (
    <>
      <Router>
          <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily_status_updates" element={<MyDailyStatus />} />
          <Route
            path="/daily_status_updates_details/"
            element={<MyDailyStatusNew_id />}
          />
          <Route path="/send_daily_status" element={<SendMyDailyStatus />} />
          <Route path="/my_leave" element={<MyLeave />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
