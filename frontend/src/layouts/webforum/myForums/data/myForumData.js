import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import moment from "moment";
import { getMyWebforums } from "network/networkCalls";
import { ShowErrorAlert } from "network/errorAlert";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedQuiz } from "store/selectedQuiz/selectedQuizSlice";
import DeleteConfirmation from "../components/deleteConfirmation";

export default function data(deleteForum) {
  const [data, setData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showErrorAlert = (msg) => {
    alert(msg);
  };

  //   Get initial data
  useEffect(() => {
    getMyWebforums({})
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        showErrorAlert(err);
      });
  }, []);

  // Save id and open
  const openForum = (id) => {
    localStorage.setItem("forumId", id);
    navigate("/webforumDetails");
  };

  const Forum = ({ title, content }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        {/* <MDTypography variant="caption" noWrap>
          {content}
        </MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const getRow = (row) => {
    return {
      forum: <Forum title={row.title} content={row.content} />,
      createdDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.createdAt).format("MMM Do YYYY")}
        </MDTypography>
      ),
      updatedDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(row.updatedAt).format("MMM Do YYYY")}
        </MDTypography>
      ),
      action: (
        <div style={{ display: "flex" }}>
          <Icon
            color="success"
            fontSize="medium"
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={(e) => openForum(row._id)}
          >
            visibility
          </Icon>
          <Icon
            color="error"
            fontSize="medium"
            style={{ cursor: "pointer" }}
            onClick={(e) => deleteForum(e, row._id)}
          >
            delete
          </Icon>
        </div>
      ),
    };
  };

  return {
    columns: [
      { Header: "forum", accessor: "forum", width: "45%", align: "left" },
      { Header: "created date", accessor: "createdDate", align: "left" },
      { Header: "last updated on", accessor: "updatedDate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data.map((item) => {
      return getRow(item);
    }),
  };
}
