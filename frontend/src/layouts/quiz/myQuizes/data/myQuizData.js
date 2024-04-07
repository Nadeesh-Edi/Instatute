import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import moment from "moment";
import { getCreatedQuizes } from "network/networkCalls";
import ShowErrorAlert from "network/errorAlert";
import MDButton from "components/MDButton";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedQuiz } from "store/selectedQuiz/selectedQuizSlice";

export default function data() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showErrorAlert = (msg) => {
    alert(msg);
  };

  //   Get initial data
  useEffect(() => {
    getCreatedQuizes({})
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        showErrorAlert(err);
      });
  }, []);

  const viewAttempts = (e, id) => {
    e.preventDefault();
    dispatch(setSelectedQuiz(id));
    navigate("/quizAttempts");
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

  const getRow = (row) => {
    return {
      quiz: <Quiz title={row.title} description={row.description} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={row.validStatus == 1 ? "Open" : "Closed"}
            color={row.validStatus == 1 ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      deadline: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.deadline).format("MMM Do YYYY")}
        </MDTypography>
      ),
      attempts: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {row.attempts}
        </MDTypography>
      ),
      action: (
        <MDButton color="warning" size="small" onClick={(e) => viewAttempts(e, row._id)}>
          View attempts
        </MDButton>
      ),
    };
  };

  return {
    columns: [
      { Header: "quiz", accessor: "quiz", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "left" },
      { Header: "deadline", accessor: "deadline", align: "center" },
      { Header: "attempts", accessor: "attempts", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data.map((item) => {
      return getRow(item);
    }),
  };
}
