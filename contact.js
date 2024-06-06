const firebaseConfig = {
  apiKey: "AIzaSyBp1bn7A972MrKceMphoOPKPnfoE85V8ZM",
  authDomain: "org-tez.firebaseapp.com",
  databaseURL: "https://org-tez-default-rtdb.firebaseio.com",
  projectId: "org-tez",
  storageBucket: "org-tez.appspot.com",
  messagingSenderId: "941118918125",
  appId: "1:941118918125:web:b38586106f7c50687b6be4"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contact");

document.getElementById("contact").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var country = getElementVal("country");

  saveMessages(name, emailid, msgContent, country);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contact").reset();
}

const saveMessages = (name, emailid, msgContent, country) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    country: country
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
