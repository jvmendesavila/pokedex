import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: 6,
    maxWidth: 300,
    minHeight: 400,
    borderRadius: 16,
    margin: "12px 0",
    border: "4px solid gray",
    backgroundColor: "white",
    cursor: "pointer",
  },
  nameContainer: {
    backgroundColor: "#59a8e5",
    color: "white",
    marginBottom: 12,
    borderRadius: 32,
  },
  typeContainer: {
    height: 32,
    borderRadius: 32,
    margin: "8px 0px 6px 0px",
  },
  typeLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
}));
