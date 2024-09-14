const regPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,255}/;

$(document).ready(function () {
    onChangeInput();
    initClearSpan();
    onChangePassword();
});

function onChangePassword() {
    $("#btnReset").click(function (e) {
        e.preventDefault();

        var antiToken = $("#antiForgery").val();

        if (valid() && onChangeInput()) {
            showLoading();
            $.ajax({
                cache: false,
                headers: { "RequestVerificationToken": `${antiToken}` },
                url: '/Account/SubmitResetPassword',
                type: 'POST',
                data: $("#formResetNewPassword").serialize(),
                success: function (res) {
                    swal.close()
                    if (res.success) {
                        showMessageToast(res.message, 'top-right', 'Success',
                            '#3c763d', 'success', '/dang-nhap', 2000)
                    } else {
                        $("#alertMessage").html(`<div class="alert alert-danger" style="text-align: center" role="alert"><span class="fa fa-exclamation" aria-hidden="true"></span>${res.message}</div>`);
                        $('html, body').animate({ scrollTop: $('#scrollTo').offset().top }, 'slow');
                    }
                },
                error: function (xhr, stt, err) {
                    swal.close();
                    showMessageToast('Sorry! Something went wrong. Please contact to Admin. Thanks!', 'top-right', 'Error',
                        '#F73F52', 'error', '/', 3000)
                }
            });
        }
    });
}

function valid() {
    if ($("#newPassword").val() === "") {
        $("#sNewConfirmPassword").text("Vui lòng nhập Mật Khẩu.")
        $("#newPassword").focus();
        return false;
    }
    else if ($("#newConfirmPassword").val() === "") {
        $("#sNewConfirmPassword").text("Vui lòng xác nhận Mật Khẩu.")
        $("#newConfirmPassword").focus();
        return false;
    }
    else return true;
}

function onChangeInput() {
    $('#newPassword').on('input', function (e) {
        var value = $("#newPassword").val();
        if (!regPassword.test(value)) {
            $("#sNewPassword").text("Mật khẩu phải có độ dài ít nhất 6 ký tự và bao gồm ít nhất 1 ký tự chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt.");
            return false;
        } else {
            $("#sNewPassword").text("");
        }
        if (value !== "") {
            $("#sNewPassword").text("");
        }
    });

    $('#newConfirmPassword').on('input', function (e) {
        var password = $("#newPassword").val();
        var confirm = $("#newConfirmPassword").val();
        if (confirm !== password) {
            $("#sNewConfirmPassword").text("Mật khẩu không khớp");
        } else {
            $("#sNewConfirmPassword").text("");
        }
    });

    return true;
}

function showPassword() {
    var password = document.getElementById("password");
    var confirm = document.getElementById("confirm-password");

    if (password.type === "password" && confirm.type === "password") {
        password.type = "text";
        confirm.type = "text";
    } else {
        password.type = "password";
        confirm.type = "password";
    }
}

function initClearSpan() {
    $('#password').on('input', function (e) {
        var value = $('#password').val();
        if (value != "" && onChangeInput()) {
            $("#sPassword").text("")
        }
    });
    $('#confirm-password').on('input', function (e) {
        var value = $('#confirm-password').val();
        if (value != "" && onChangeInput()) {
            $("#sConfirmPassword").text("")
        }
    });
}
