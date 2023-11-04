const passBox = document.getElementById("password");
const copyimg = document.querySelector(".input_field img");

// remember if using "readonly" attribute on markup than enable and disable not nessecary in JavaScript
document.getElementById("password").disabled = true;

const lenth = 12;
const upercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "!@#$%^&*()_-+{}[]/";

const allChars = upercase + lowercase + number +symbol;

    function randomPassword(){
        let password = "";
        
        while(lenth > password.length){
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        passBox.value = password;

        copyimg.style.display = "block";
    };

    function copyPassword(){
        passBox.removeAttribute('disabled');
        // temporary enable user input

        passBox.select();
        document.execCommand("copy");

        passBox.setAttribute('disabled', true);
        // than disable user input again

        var popup = document.getElementById("popup_overlay");

        popup.innerHTML = "<p>Password copied Successfully <br/> <span>Paste where you want</span></p>";

        popup.classList.add("popup_show");
        setTimeout(function() {
            passBox.value = '';
            copyimg.style.display = "none";
            popup.classList.remove("popup_show");
        }, 3000);
    };