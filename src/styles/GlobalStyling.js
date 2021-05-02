import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'lightblue',
        flex: 1,
    },
    container: {
        flex: 1,
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingBottom: 10,
        paddingTop: 10,
    },
    inputfield: {
        borderColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        width: 200,
    },
    picker: {
        // flex: 1,
        height: 50,
        width: 200,
        alignSelf: 'center',
    },
    textStyling: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: "center",
    },
    loginInputfield: {
        borderColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        width: 200,
        alignSelf: 'center',
    },
    inventoryView: {
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    


});

export default styles;