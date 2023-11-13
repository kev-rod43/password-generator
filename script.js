// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

let pass = {
  length: 12,
  lowerCase: true,
  upperCase: true,
  numeric: true,
  special: true,
}

let characters = {
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  special: "\\ /!\"'#$&()*+,-.:;<=>?@[]^_`{|}~",
}

let minLowerCase = "";

let minUpperCase = "";

let minNumeric = "";

let minSpecial = "";

let minReqs = "";

let allowedCharacters = "";

let genPassword = "";

function randomIndex(string) {
  x= Math.floor(Math.random() * (string.length));
  return x;
}

function indexToChar(string, index){
  x= string.substr(index, 1);
  return x;
}
// assigns value to the user's selected password criteria
function setMinReq(){

  if (pass.lowerCase===true) {
     minLowerCase=  indexToChar(characters.lowerCase, randomIndex(characters.lowerCase))
  }

  if (pass.upperCase===true) {
      minUpperCase=  indexToChar(characters.upperCase, randomIndex(characters.upperCase))
   }

  if (pass.numeric===true) {
      minNumeric=  indexToChar(characters.numeric, randomIndex(characters.numeric))
  }
  
  if (pass.special===true) {
      minSpecial=  indexToChar(characters.special, randomIndex(characters.special))
  }

}
// concatonates a password that fullfills all criteria but length
function concatMin() {
  minReqs = minLowerCase + minUpperCase + minNumeric + minSpecial;
  return minReqs;

}
// concatonates a strig that is all the allowed characters as per the user's selected criteria
function setAllowedChar(){

  if (pass.lowerCase===true) {
      allowedCharacters= characters.lowerCase
  }

  if (pass.upperCase===true) {
      allowedCharacters= allowedCharacters + characters.upperCase
  }

  if (pass.numeric===true) {
      allowedCharacters= allowedCharacters + characters.numeric
  }
   
  if (pass.special===true) {
      allowedCharacters= allowedCharacters + characters.special
  }

}
//generates a non shuffled password that satisfies all of the user's  password criteria
function genUnscrambledPassword(){

  for (i=0; i < pass.length - minReqs.length; i++){
  genPassword = genPassword + indexToChar(allowedCharacters, randomIndex(allowedCharacters))
  }

  genPassword = genPassword + minReqs

}

//stack overflow's Andy E's modified an example of a Fisher-Yates Shuffle. The returned value 
//is an unbiased permutation of whatever the shuffle method is applied to.
String.prototype.shuffle = function () { 
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

//runs an algorithm that calls functions in order to create a fully random password that satisfies the user's criteria.
function generatePassword(){

  pass.length = prompt("What is your desired password length? (must be between 8 to 128 characters)","")
  
  if (pass.length<8){
    alert("Your password must be at least 8 characters")
     return "";
  }

  if (pass.length>128){
    alert("Your password can't be longer than 128 characters")
     return "";
  }

  pass.lowerCase = confirm("Press okay if you would like lowercase characters in your password.")
  pass.upperCase = confirm("Press okay if you would like uppercase characters in your password.")
  pass.numeric = confirm("Press okay if you would like numeric characters in your password.")
  pass.special = confirm("Press okay if you would like special characters in your password.")
  console.log(pass.lowerCase + pass.upperCase + pass.numeric + pass.special)

  if (pass.lowerCase + pass.upperCase + pass.numeric + pass.special >=1){
    setMinReq();
    concatMin();
    setAllowedChar();
    genUnscrambledPassword();
    genPassword= genPassword.shuffle();
    } else {
    alert("You must choose at least one character type!")
     return "";
    }

  return genPassword;
}
