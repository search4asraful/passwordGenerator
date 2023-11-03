const passBox = document.getElementById("password");
const lenth = 12;

// remember if iam using "readonly" attribute on markup than enable and disable not nessecary in JavaScript
document.getElementById("password").disabled = true;
// disable user input

const upercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "!@#$%&*()__+{}[]/";
const allChars = upercase + lowercase + number +symbol;

    function randomPassword(){
        let password = "";
        
        while(lenth > password.length){
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        passBox.value = password;
    };

    function copyPassword(){
        passBox.removeAttribute('disabled');
        // temporary enable user input

        passBox.select();
        document.execCommand("copy");

        passBox.setAttribute('disabled', true);
        // than disable user input again
    };