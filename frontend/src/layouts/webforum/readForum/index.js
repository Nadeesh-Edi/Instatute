import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { getForumByID } from "network/networkCalls";

function ReadForum() {
  const [forum, setForum] = useState({});

  const getForumDetails = () => {
    const id = localStorage.getItem("forumId");

    getForumByID(id).then((res) => {
      setForum(res);
    });
  };

  useEffect(() => {
    getForumDetails();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header forum={forum}>
        <MDBox mt={10} />
        <MDTypography variant="button" color="text" fontWeight="light">
          {forum.content}
        </MDTypography>
      </Header>
    </DashboardLayout>
  );
}

export default ReadForum;
