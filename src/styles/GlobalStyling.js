import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textStyling: {
    flex: 2,
    fontSize: 15,
    fontWeight: 'bold',
    // borderColor: "black",
    // borderWidth: 2,
  },
  textStyling2: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    // borderColor: "black",
    // borderWidth: 2,
  },
  textStyling3: {
    flex: 1,
    fontSize: 15,
    // fontWeight: 'bold',
    // borderColor: "black",
    // borderWidth: 2,
  },
  textStyling4: {
    justifyContent: "flex-start",
    flex: 1,
    fontSize: 15,
    // fontWeight: 'bold',
    // borderColor: "black",
    // borderWidth: 2,
  },
  loginInputfield: {
    borderColor: 'black',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    width: 200,
    alignSelf: 'center',
  },
  inventoryContainer: {
    borderColor: "black",
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  inventoryLine1: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  inventoryLine2: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  inventoryLine3: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 250,
  },
  updateInventoryContainer: {
    alignItems: "center",
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 1,
  },
  updateInventoryText: {
    fontWeight: "bold",
  },
  textRow: {
    borderColor: "blue",
    borderWidth: 2,
    alignItems: "flex-end",
  },
 


});

export default styles;