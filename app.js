//Tell application what firebase instance we are using
// Initialize Firebase -- copied from firebase site after clicking 'add Firebase to your web app'
  var config = {
    apiKey: "AIzaSyD2GekVAxoc3SVva-z0UhAR3zPHx2QqFr4",
    authDomain: "devfest2017-b55a2.firebaseapp.com",
    databaseURL: "https://devfest2017-b55a2.firebaseio.com",
    storageBucket: "devfest2017-b55a2.appspot.com",
    messagingSenderId: "869551205329"
  };
  firebase.initializeApp(config);

  var header = document.getElementById('header');
  //Create a reference to the header child place in our database
  var dbRef = firebase.database().ref().child('header');

  //RULES: auth != null means only allow to read and write if they are logged in
  //To implement google auth in firebase, go to authentication and enable it

  var signInButton = document.getElementById('signInButton');
  var signOutButton = document.getElementById('signOutButton');
  //Create the provider
  var provider = new firebase.auth.GoogleAuthProvider();

  signInButton.addEventListener('click', function() {
    //all you need to sign in is everything before .then
    firebase.auth().signInWithPopup(provider).then(function(user) {
      if (user) {
        //Get the data - whenever the value changes in firebase, this will be triggered
        dbRef.on('value', function(snap) {
          //set the inner text to the value of the snapshot it just took of the inner node 'header'
          header.innerText = snap.val();
        }); // end dbRef.on
        //Get the data for playground
        playgroundRef.on('value', function(snap) {
          playground.value = snap.val();
        }); // end dbRef.on
      }
    }); // end auth
  }); // end signInButton event listener

  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      header.innerText = 'Sign in with google to see the magic.';
      playground.value = 'You need to sign in to play here';
    });
  }); // end signOutButton

  var playground = document.getElementById('playground');
  //reference our playground inside of firebase
  var playgroundRef = firebase.database().ref().child('playground');

  //Make updates work in both directions
  //every time we lift our finger off a key, this will run
  playground.addEventListener('keyup', function() {
    //saving the text in our playground locally to our database (by overwriting)
    playgroundRef.set(playground.value);
  }); // end playground event listener
