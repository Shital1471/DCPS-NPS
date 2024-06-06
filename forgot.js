const firebaseConfig = {
    apiKey: "AIzaSyBp1bn7A972MrKceMphoOPKPnfoE85V8ZM",
    authDomain: "org-tez.firebaseapp.com",
    databaseURL: "https://org-tez-default-rtdb.firebaseio.com",
    projectId: "org-tez",
    storageBucket: "org-tez.appspot.com",
    messagingSenderId: "941118918125",
    appId: "1:941118918125:web:b38586106f7c50687b6be4"
  };
    firebase.initializeApp(firebaseConfig);
    document.getElementById('ForgotPassword').addEventListener("submit", submitForm);
    function submitForm(e)
    {
    e.preventDefault();
    email=document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
        alert("Mail Sent");
        })
    .catch((error) => {
        alert("We couldn't find an account associated with this email. Please try with an alternate email.");
        });
    }
    