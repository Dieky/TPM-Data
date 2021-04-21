import firestore from '@react-native-firebase/firestore';


export async function testing(item) {
    var cityRef = db.collection('constants2');

    var setWithMerge = cityRef.set({
        item: item
    }, { merge: true });

    return new Promise((resolve, reject) => {
        firestore()
            .collection('beholdning')
            .add(item)
            .then(resolve("Everything is fine"))
            .catch((err) => {
                reject(err);
            });
    });
}

export async function addItem(item) {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('beholdning')
            .add(item)
            .then(resolve("Everything is fine"))
            .catch((err) => {
                reject(err);
            });
    });
}

export async function fetchData() {
    let tmp = [];
    return new Promise((resolve, reject) => {
        firestore()
            .collection('constants')
            .get()
            .then((response) => {
                response.forEach(doc => {
                    tmp.push(doc.data());
                })
                resolve(tmp);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

