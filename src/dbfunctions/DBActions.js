import firestore from '@react-native-firebase/firestore';

export async function addInventory(user, name) {
    let MasterdataId = await createMasterData();
    let inventoryObject = {
        name: name,
        admin: user.email,
        masterdata: MasterdataId,
        inventorylist: [],
        usersAllowed: [user.email],
    }
    firestore().collection("inventory").doc().set(inventoryObject)
}

// creates an entry in the MasterData collection and returns the ID
// Used by addInventory to create an inventorylist with a corresponding set of personal/unique MasterData attached to the inventory
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


export async function fetchInventory(user) {
    let tmp = []
    await firestore().collection("inventory").where("usersAllowed", "array-contains", user.email).get().then(snapshot => snapshot.forEach(doc => {
        let data = doc.data();
        data = {...data, documentId: doc.id}
        tmp.push(data);
    }))
    return tmp;
}


export async function addToLocations(id, array) {
    await firestore().collection("masterdata").doc(id).update({ locations: array });
}

export async function addToUnitTypes(id, array) {
    await firestore().collection("masterdata").doc(id).update({ unitTypes: array });
}

export async function addToCategory(id, array) {
    await firestore().collection("masterdata").doc(id).update({ category: array });

}

export async function addToItems(id, array) {
    await firestore().collection("masterdata").doc(id).update({ itemlist: array });

}

export async function addToInventoryList(id, array) {
    await firestore().collection("inventory").doc(id).update({ inventorylist: array });

}