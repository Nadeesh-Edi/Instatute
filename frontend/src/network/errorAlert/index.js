import MDSnackbar from "components/MDSnackbar";

function ShowErrorAlert(props) {
  return (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content={props.message}
      open={props.open}
      onClose={() => props.closeAlert(false)}
      close={() => props.closeAlert(false)}
      bgWhite
    />
  );
}

export default ShowErrorAlert;
