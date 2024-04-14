import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import { useEffect } from "react";

function QuestionsGrid(props) {
  return (
    <Card>
      <MDBox px={2} py={2}>
        <Grid container spacing={3}>
          {props.questions.map((item, index) => {
            return (
              <Grid key={index} item xs={3} md={3} lg={3}>
                <div style={item ? styles.numberAnswered : styles.numberUnAnswered}>{index}</div>
              </Grid>
            );
          })}
        </Grid>
      </MDBox>
    </Card>
  );
}

const styles = {
  numberAnswered: {
    backgroundColor: "#0265b1",
    color: "#FFFFFF",
    textAlign: "center",
    borderRadius: 15,
    padding: "15px 5px",
  },
  numberUnAnswered: {
    backgroundColor: "#9fa6b7",
    color: "#000000",
    textAlign: "center",
    borderRadius: 15,
    padding: "15px 5px",
  },
};

export default QuestionsGrid;
