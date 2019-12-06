var listBooks = [{
    "name": "Agile Principles, Pattern and Practices in C#",
    "author": "Ahmedt-Aristizabal, David ; Fookes, Clinton",
    "des": '"The solution is a laptop computer. The main purpose of a computer is domination. A computer ensures you do not waste your time"',
    "image": '../assets/images/search/book1.png'
},
{
    "name": "Introduction to Algorithms",
    "author": "Thomas",
    "des": '"The solution is a laptop computer. The main purpose of a computer is domination. A computer ensures you do not waste your time"',
    "image": '../assets/images/search/book2.png'
}
]

function getParams() {
var queryString = new URLSearchParams(window.location.search);
queryString = queryString.get('value');
return queryString;
}

function loadData(book) {
var bookInfo = $("<div style='margin: 15px 15px; padding: 15px 15px ; border : 2px solid #131354' class='book row'></div>");
var col4 = $("<div class='col-4 book-img'></div>");
var col8 = $("<div class='col-8 book-info'></div>");
var cer = $("<div class = 'certificate-container'></div>")
col4.append("<img src=" + book.image + ">");
col8.append("<h1 class='book-title'>" + book.name + "</h1>");
col8.append("<h3 class='book-author'>" + book.author + "</h3>");
col8.append("<p class='book-des'>" + book.des + "</p>");
cer.append("<div class= 'note'><textarea rows = '5' cols = '30' placeholder='Ghi chú'></textarea></div>")
cer.append("<div class='g-recaptcha' data-sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'></div>");
cer.append("<div class='appointment'><b>Ngày hẹn mượn:</b> <input type='date'></div>");
cer.append("<a class='confirmBookBtn btn btn-primary'  href='./search.html'>Mượn sách</a>");
col8.append(cer);
bookInfo.append(col4);
bookInfo.append(col8);

$(".list-borrow").append(bookInfo);
}

window.onload = function() {
    var isLogin = localStorage.getItem('islogin');
    if (isLogin === "true"){
        $('.login-btn').css("display", "none");
        $(".account-btn").css("display", "block");
    }
    else {
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
    }
var param = getParams();
loadData(this.listBooks[param]);

$('#loginBtn').click(function(e) {
    var username = $('#username').val();
    var password = $("#password").val();
    if (password === 'admin' && username === 'admin') {
        alert("Đăng nhập thành công!!!");
        $('#formLogin').modal('hide');
        $('.login-btn').css("display", "none");
        $(".account-btn").css("display", "block");
    } else {
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
$(".confirmBookBtn").click((e)=>{
    this.alert("Mượn sách thành công!")
})
}