var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var errorMessageDiv1 = document.getElementById("username_error");
var errorMessageDiv2 = document.getElementById("password_error");
var usernameValid = false;
var passwordValid = false;
// Thêm sự kiện onblur cho phần tử input
usernameInput.onblur = function() {
    // Kiểm tra nếu người dùng không nhập username
    if (usernameInput.value === "") {
        // Hiển thị thông báo trong div
        usernameValid = false;
        errorMessageDiv1.textContent = "Vui lòng nhập tài khoản!";
    } else {
        // Nếu đã nhập username, xóa thông báo
        usernameValid = true;
        errorMessageDiv1.textContent = "";
    }
};
passwordInput.onblur = function(){
    if (passwordInput.value === ""){
        passwordValid = false;
        errorMessageDiv2.textContent = "Vui lòng nhập mật khẩu!"
    } else {
        passwordValid = true;
        // Nếu đã nhập username, xóa thông báo
        errorMessageDiv2.textContent = "";
    }
}
loginButton.onclick = function() {
    if (!usernameValid || !passwordValid) {
        // Kiểm tra nếu có bất kỳ trường thông tin nào chưa được nhập
        alert("Vui lòng điền đầy đủ thông tin!");
    } else {
        // Nếu đủ thông tin, hiển thị thông báo đăng nhập thành công và chuyển trang
        alert("Đăng nhập thành công!");
        // Chuyển sang trang chính (điều này cần được thay đổi tùy thuộc vào ứng dụng của bạn)
        window.location.href = "../home_page/home_page.html";
    }
};

