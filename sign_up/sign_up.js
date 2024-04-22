var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirm-password");

var usernameError = document.getElementById("username-error");
var emailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
var confirmPasswordError = document.getElementById("confirm-password-error");

var usernameValid = false;
var passwordValid = false;
var emailValid = false;
var confirmPasswordValid = false;
// Kiểm tra tính hợp lệ của username
usernameInput.addEventListener("blur", function() {
    if (usernameInput.value === "") {
        usernameValid = false;
        usernameError.textContent = "Vui lòng nhập tài khoản!";
    } else {
        usernameValid = true;
        usernameError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của email
emailInput.addEventListener("blur", function() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value === ""){
        emailValid = false;
        emailError.textContent = "Vui lòng nhập email!"
    }
    else if (!emailPattern.test(emailInput.value)) {
        
        emailError.textContent = "Vui lòng nhập đúng định dạng email!";
    } else {
        emailValid = true;
        emailError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của password
passwordInput.addEventListener("blur", function() {
    if (passwordInput.value === "") {
        passwordValid = false;
        passwordError.textContent = "Vui lòng nhập mật khẩu!";
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Mật khẩu phải có ít nhất 8 kí tự";
    } else{
        passwordValid = true;
        passwordError.textContent = "";
    }
});

// Kiểm tra tính hợp lệ của confirm-password
confirmPasswordInput.addEventListener("blur", function() {
    if (confirmPasswordInput.value === "") {
        confirmPasswordValid = false;
        confirmPasswordError.textContent = "Vui lòng xác nhận mật khẩu!";
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Mật khẩu không khớp!";
    } else {
        confirmPasswordValid = true;
        confirmPasswordError.textContent = "";
    }
});

sign_upButton.onclick = function() {
    if (!usernameValid || !passwordValid || !emailValid || !confirmPasswordValid) {
        // Kiểm tra nếu có bất kỳ trường thông tin nào chưa được nhập
        alert("Vui lòng điền đầy đủ thông tin!");
    } else {
        // Nếu đủ thông tin, hiển thị thông báo đăng nhập thành công và chuyển trang
        alert("Đăng kí thành công!");
        // Chuyển sang trang chính (điều này cần được thay đổi tùy thuộc vào ứng dụng của bạn)
        window.location.href = "../log/sinhVien_log.html";
    }
};