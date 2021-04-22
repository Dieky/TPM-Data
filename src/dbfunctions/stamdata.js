import firestore from '@react-native-firebase/firestore';

export async function addInventoryList(user, name) {
    let constantsId = await createConstants();
    let inventoryObject = {
        name: name,
        admin: user.email,
        constants: constantsId,
        items: [],
        usersAllowed: [],
    }
    firestore().collection("inventoryList").doc().set(inventoryObject)
}

export async function createConstants() {
    let constantsObject = {
        category: [],
        locations: [],
        itemlist: [],
        unitTypes: [],
    }
    let res = await firestore().collection("constants").add(constantsObject)
    return res.id;
    
}