import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { createWebforum } from "network/networkCalls";

import Alert from "@mui/material/Alert";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function CreateWebforum() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const navigate = useNavigate();

  //   Submit the forum
  const submitForum = (e) => {
    e.preventDefault();
    createWebforum({ title, content })
      .then((res) => {
        alert.success("Successfully created", {
          onClose: () => {
            navigate("/myWebforums");
          },
        });
      })
      .catch((err) => {
        alert.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsDisabled(!title || !content);
  }, [title, content]);

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
                  Create New Webforum
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Forum Title"
                      fullWidth
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Content"
                      fullWidth
                      multiline
                      minRows="5"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <MDBox my={5}>
              <MDButton
                color="success"
                type="submit"
                disabled={isDisabled}
                onClick={(e) => submitForum(e)}
              >
                SAVE
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateWebforum;
