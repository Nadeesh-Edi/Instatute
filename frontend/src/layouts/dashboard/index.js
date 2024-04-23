import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import StudentDashboard from "./studentDashboard";
import StaffDashboard from "./staffDashboard";

function Dashboard() {
  const userType = localStorage.getItem("type");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {userType == 2 && <StudentDashboard />}
        {userType == 1 && <StaffDashboard />}
        {!userType && <StaffDashboard />}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
