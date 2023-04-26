
function warnlog(message) {
    console.log("[WARN] " + message);
}

function logmessage(message) {
    console.log("[LOG] " + message); 
}

function infolog(message) {
    console.log("[INFO] " + message); 
}

function debuglog(message) {
    console.log("[DEBUG] " + message);
}

function successlog(message) {
    console.log("[SUCCESS] " + message)
}

function errorlog(message) {
    console.log("[ERROR] " + message)
}
module.exports = errorlog, successlog, debuglog, logmessage, warnlog;