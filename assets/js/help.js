var listInfo = [{
    "title": "Đăng kí lớp hướng dẫn sử dụng thư viện",
    "detail": "Hạn cuối đăng kí khoá 2018 vào ngày 20/11/2019."

},
{
    "title": "Hướng dẫn tra cứu sách.",
    "detail": "Độc giả có thể tra cứu sách trên trang web online của thư viện hoặc tìm bảng danh mục sách tại quầy lễ tân thư viện.",

},

{
    "title": "Gia hạn thẻ",
    "detail": "Hạn thẻ quy định trong vòng 6 tháng liên tiếp, vui lòng gia hạn thẻ trước 3 ngày để được đáp ứng sớm nhất.",

},
{
    "title": "Liên hệ người quản lí thư viện",
    "detail": "Vui lòng gửi mail đến 'lib@hcmus.vn' để đặt lịch hẹn trong ngày sắp tới.",

}
]

function loadData(data) {
    data.forEach((help) => {
        console.log(help);
        var _helpInfo = $("<div class='help row'></div>");
        var col6 = $("<div class='col-6 helpDetail'></div>");
        col6.append("<h1>" + help.title + "</h1>");
        col6.append("<h3>" + help.detail + "</h3>");
        _helpInfo.append(col6);
        $(".helpInfo").append(_helpInfo);
    })


}



window.onload = function () {
    var isLogin = localStorage.getItem('islogin');
    if (isLogin === "true") {
        $('.login-btn').css("display", "none");
        $(".account-btn").css("display", "block");
    }
    else {
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
    }
    loadData(listInfo);

    $('#loginBtn').click(function(e) {
        var username = $('#username').val();
        var password = $("#password").val();
        if (password === 'admin' && username === 'admin') {
            alert("Đăng nhập thành công!!!");
            $('#formLogin').modal('hide');
            $('.login-btn').css("display", "none");
            $(".account-btn").css("display", "block");
            localStorage.setItem('islogin', true);
        }
        else {
            $(".noti-err").css("display", "block");
            alert("Username :admin ; password : admin")
        }
    })

    $(".log-out-btn").click((e)=>{
        this.console.log("Hello");
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
        this.localStorage.removeItem('islogin');
    })
}