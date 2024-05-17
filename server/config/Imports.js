// firebase.js
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");

// Initialize Firebase Admin SDK
const serviceAccount = require("../files/studentsemdetails-firebase-adminsdk-9az9f-d5a9fed6b1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { fs, path, db ,Docxtemplater,PizZip};

