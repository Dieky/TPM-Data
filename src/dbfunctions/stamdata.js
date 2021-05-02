import firestore from '@react-native-firebase/firestore';

export async function addInventoryList(user, name) {
    let MasterdataId = await createMasterData();
    let inventoryObject = {
        name: name,
        admin: user.email,
        masterdata: MasterdataId,
        items: [],
        usersAllowed: [user.email],
    }
    firestore().collection("inventoryList").doc().set(inventoryObject)
}

// creates an entry in the MasterData collection and returns the ID
// Used by AddInventoryList to create an inventorylist with a corresponding set of personal/unique MasterData attached to the inventory
async function createMasterData() {
    let MasterdataObject = {
        category: [],
        locations: [],
        itemlist: [],
        unitTypes: [],
    }
    let res = await firestore().collection("masterdata").add(MasterdataObject)
    return res.id;

}

export async function fetchMasterData(masterDataId) {
    let masterdata = await firestore().collection("masterdata").doc(masterDataId).get();
    return masterdata.data();
}


export async function fetchInventoryLists(user) {
    let tmp = []
    await firestore().collection("inventoryList").where("usersAllowed", "array-contains", user.email).get().then(snapshot => snapshot.forEach(doc => {
        tmp.push(doc.data());
    }))
    return tmp;
}

export async function updateInventory(id, array) {
    await firestore().collection("masterdata").doc(id).update({ locations: array });
}

export async function addToLocations(id, array) {
    await firestore().collection("masterdata").doc(id).update({ locations: array });
}

export async function addToUnitTypes(id, array) {
    await firestore().collection("masterdata").doc(id).update({ unitTypes: array });
}

export async function updateUnitTypes(id, array) {
    await firestore().collection("masterdata").doc(id).update({ unitTypes: array });
}