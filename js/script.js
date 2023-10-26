const passBox = document.getElementById("password");
const lenth = 12;

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
        passBox.select();
        document.execCommand("copy")
    };