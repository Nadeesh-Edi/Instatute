import MDSnackbar from "components/MDSnackbar";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

let showPopup = false;

function ShowErrorAlert(msg) {
  console.log("in component");
  return <Snackbar open={true} autoHideDuration={6000} message={msg} />;
}

function ShowSuccessAlert(props) {
  <MDSnackbar
    color="success"
    icon="check"
    title="Success"
    content={props.message}
    open={props.open}
    onClose={() => props.closeAlert(false)}
    close={() => props.closeAlert(false)}
    bgWhite
  />;
}

export { ShowErrorAlert, ShowSuccessAlert };
