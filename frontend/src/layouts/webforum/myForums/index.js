import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

import myforumData from "./data/myForumData";
import DeleteConfirmation from "./components/deleteConfirmation";
import { useState } from "react";
import { deleteWebforum } from "network/networkCalls";
import { useAlert } from "react-alert";

function MyForums() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedForumId, setSelectedForumId] = useState(null);
  const alert = useAlert();

  // Open the confirm popup
  const deleteForum = (e, id) => {
    e.stopPropagation();
    setSelectedForumId(id);
    setShowDeleteConfirm(true);
  };

  const { columns, rows } = myforumData(deleteForum);

  // Delete the forum
  const deleteConfirm = () => {
    setShowDeleteConfirm(false);
    deleteWebforum(selectedForumId)
      .then((res) => {
        alert.success("Successfully created", {
          onClose: () => {
            window.location.reload();
          },
        });
      })
      .catch((err) => {
        alert.error(err.error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  MY WEBFORUMS
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <DeleteConfirmation
        open={showDeleteConfirm}
        closeDialog={() => setShowDeleteConfirm(false)}
        confirm={deleteConfirm}
      />
    </DashboardLayout>
  );
}

export default MyForums;
