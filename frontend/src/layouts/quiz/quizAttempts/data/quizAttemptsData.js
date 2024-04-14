import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";

import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedQuiz } from "store/selectedQuiz/selectedQuizSlice";

import { getQuizAttempts } from "network/networkCalls";
import { ShowErrorAlert } from "network/errorAlert";

export default function data() {
  const [data, setData] = useState([]);
  const selectedQuiz = useSelector((state) => state.selectedQuiz.value);
  const dispatch = useDispatch();

  const showErrorAlert = (msg) => {
    alert(msg);
  };

  //   Get initial data
  useEffect(() => {
    console.log("selected", selectedQuiz);
    getQuizAttempts(selectedQuiz)
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
  };

  const Student = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>
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

  const getRow = (row) => {
    console.log(row);
    return {
      name: <Student title={row.student} />,
      attemptedOn: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.createdAt).format("MMM Do YYYY")}
        </MDTypography>
      ),
      results: <Progress color={getColorForScore(row.score)} value={row.score} />,
      action: (
        <MDButton color="success" size="small" onClick={(e) => viewAttempts(e, row._id)}>
          details
        </MDButton>
      ),
    };
  };

  return {
    columns: [
      { Header: "student name", accessor: "name", width: "35%", align: "left" },
      { Header: "attempted date", accessor: "attemptedOn", align: "left" },
      { Header: "results", accessor: "results", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data.map((item) => {
      return getRow(item);
    }),
  };
}
