const passBox = document.getElementById("password");
const copyimg = document.querySelector(".input_field img");
const passwordList = document.getElementById("passwordList");

// remember if using "readonly" attribute on markup than enable and disable not nessecary in JavaScript
document.getElementById("password").disabled = true;


function randomPassword(){
    const length = parseInt(document.getElementById("length").value, 10);
    const upercase = document.getElementById("uppercase").checked
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      : "";
    const lowercase = document.getElementById("lowercase").checked
      ? "abcdefghijklmnopqrstuvwxyz"
      : "";
    const number = document.getElementById("numbers").checked ? "1234567890" : "";
    const symbol = document.getElementById("symbols").checked
      ? "!@#$%^&*()_-+{}[]/"
      : "";
    
    const allChars = upercase + lowercase + number +symbol;

    if (allChars.length === 0) {
        alert("Please select at least one character set.");
        return;
      }
      
    let password = "";
        
    window.addEventListener("beforeunload", function (event) {
      // Check if there are passwords in session storage
      let passwordsHistory = JSON.parse(sessionStorage.getItem("passwords")) || [];
      if (passwordsHistory.length > 0) {
        event.returnValue = true; // Display alert
      }
    });
    
        while(length > password.length){
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Store password in session storage
        let passwordsHistory = JSON.parse(sessionStorage.getItem("passwords")) || [];
        passwordsHistory.push(password);
        sessionStorage.setItem("passwords", JSON.stringify(passwordsHistory));

        passBox.value = password;

        copyimg.style.display = "block";

        // Call display password history function
        displayPasswordHistory();
    };

    function copyPassword(){
        passBox.removeAttribute('disabled');
        // temporary enable user input

        passBox.select();
        document.execCommand("copy");

        passBox.setAttribute('disabled', true);
        // than disable user input again

        var popup = document.getElementById("popup_overlay");

        popup.innerHTML = "<span>Copied</span>";

        popup.classList.add("popup_show");
        setTimeout(function() {
            passBox.value = '';
            copyimg.style.display = "none";
            popup.classList.remove("popup_show");
        }, 3000);
    };
    
    function displayPasswordHistory() {
        // Retrieve password history from session storage
        let passwordsHistory = JSON.parse(sessionStorage.getItem("passwords")) || [];
        
        // Display passwords in the passwordList span
        passwordList.innerHTML = passwordsHistory
        .reverse()
        .map((password) => `${password}<br><br>`)
        .join("");
        
        if (passwordsHistory.length > 0) {
            passwordHistory.style.opacity = "1";
        }else{
            passwordHistory.style.opacity = "0";
        }
      }
      function clearHistory() {
        // Clear session storage and update password history
        sessionStorage.removeItem("passwords");
        displayPasswordHistory();
      }

    // Display password history on page load
    displayPasswordHistory();