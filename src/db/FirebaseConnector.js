import db from "./db";

class FirebaseConnector{

    static async readCollection(collectionName){
        let collection = [];
        await db.collection(collectionName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                collection.push({id: doc.id, ...doc.data()});
            });
        });
        return collection;
    }

    static async addDocument(collectionName, object){
        db.collection(collectionName).doc().set(object)
        .then(() => {
            console.log("Document successfully written!");
        })
    }

    static async deleteDocument(collectionName, docId){
        db.collection(collectionName).doc(docId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

export default FirebaseConnector;