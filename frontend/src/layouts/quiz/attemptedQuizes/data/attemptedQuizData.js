import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDProgress from "components/MDProgress";

import { useEffect, useState } from "react";
import moment from "moment";
import { getAttemptedQuizes } from "network/networkCalls";
import { ShowErrorAlert } from "network/errorAlert";
import MDButton from "components/MDButton";

export default function data() {
  const [data, setData] = useState([]);

  const showErrorAlert = (msg) => {
    alert(msg);
  };

  // Get initial data
  useEffect(() => {
    getAttemptedQuizes({})
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        showErrorAlert(err);
      });
  }, []);

  const attemptQuiz = (e) => {
    e.preventDefault();
  };

  const Quiz = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const CreatedBy = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const getRow = (row) => {
    return {
      quiz: <Quiz title={row.quiz} description={row.description} />,
      attemptedOn: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.createdAt).format("MMM Do YYYY")}
        </MDTypography>
      ),
      results: <Progress color={getColorForScore(row.score)} value={row.score} />,
    };
  };

  const getColorForScore = (score) => {
    if (score < 35) {
      return "error";
    } else if (score < 55) {
      return "warning";
    } else if (score < 75) {
      return "info";
    } else {
      return "success";
    }
  };

  return {
    columns: [
      { Header: "quiz", accessor: "quiz", width: "30%", align: "left" },
      { Header: "results", accessor: "results", align: "center" },
      { Header: "attempted on", accessor: "attemptedOn", align: "center" },
    ],

    rows: data.map((item) => {
      return getRow(item);
    }),
  };
}
