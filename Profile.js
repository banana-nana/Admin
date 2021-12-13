let profileView = document.getElementById("Profile"),
signupView = document.getElementById("signup-view"),
email = document.getElementById("email")
pword = document.getElementById("pword");
img = document.getElementById("img");
nub = document.getElementById("Hired");

let file = {};

function chooseFile(e) {
    file = e.target.files[0];
}

function signUpButtonPressed() {
    firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then (auth => {
        
        firebase.storage().ref("users/" + auth.user.uid + "/profile.jpg").put(file).then(function() {
            console.log("successfully uploaded")
        }).catch(error => {
            console.log(error.message);
        })
    }).catch(error => {
        console.log(error.message);
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        firebase.storage().ref("users/" + user.uid + "/profile.jpg").getDownloadURL().then(imgUrl => {
            img.src = imgUrl;

        })
    }
})


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        firebase.storage().ref("admin/" + user.uid + "/lol.png").getDownloadURL().then(lolURL => {
            nub.src = lolURL;
        })
    }
})