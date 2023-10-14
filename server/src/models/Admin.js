const mongoose = require("mongoose");
console.log("PROBANDO ANDO...!!")
const AdminSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;