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


});

export default styles;