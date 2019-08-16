const admin = require('firebase-admin');
const serviceKey = require("../config/serviceKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

const firestore = admin.firestore;
const auth = admin.auth();
module.exports = { auth, firestore }
