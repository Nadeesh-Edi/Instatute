import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import moment from "moment";
import { getNewQuizes } from "network/networkCalls";
import ShowErrorAlert from "network/errorAlert";
import MDButton from "components/MDButton";

export default function data() {
  const [data, setData] = useState([]);

  const showErrorAlert = (msg) => {
    alert(msg);
  };

  //   Get initial data
  useEffect(() => {
    getNewQuizes({})
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

  const getRow = (row) => {
    return {
      quiz: <Quiz title={row.title} description={row.description} />,
      createdBy: <CreatedBy title={row.createdBy.name} description={row.createdBy.role} />,
      deadline: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.deadline).format("MMM Do YYYY")}
        </MDTypography>
      ),
      action: (
        <MDButton color="success" size="small" onClick={(e) => attemptQuiz(e)}>
          Attempt Now
        </MDButton>
      ),
    };
  };

  return {
    columns: [
      { Header: "quiz", accessor: "quiz", width: "45%", align: "left" },
      { Header: "created by", accessor: "createdBy", align: "left" },
      { Header: "deadline", accessor: "deadline", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data.map((item) => {
      return getRow(item);
    }),
  };
}
