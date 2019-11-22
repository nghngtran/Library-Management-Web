
var listBooks = [
    {
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

var listNews = [{
    "title": "Kết quả đánh giá AUN chương trình Cử nhân Công nghệ Sinh học",
    "author": "Hoàng Anh Tú",
    "des": '"Vào tháng 9/2019 vừa qua đã diễn ra đợt đánh giá AUN-QA của Chương trình đào tạo Cử nhân Công nghệ Sinh học, Trường Đại học Khoa Học Tự Nhiên - ĐHQG-HCM."',
    "image": '../assets/images/news/AUN.jpg'
},
{
    "title": "Giao lưu, thảo luận với đại biểu tàu thanh niên Đông Nam Á (SSEAYP) 2019",
    "author": "Thảo Hoàng",
    "des": '"Vào ngày 11/11/2019 vừa qua, trường ĐH Khoa Học Tự Nhiên, ĐHQG-HCM đã vinh dự đón tiếp đoàn đại biểu của chương trình Tàu Thanh niên Đông Nam Á (The Ship for Southeast Asian Youth Program, viết tắt là SSEAYP) đến giao lưu và thảo luận về chủ đề: Môi trường và sự bền vững."',
    "image": '../assets/images/news/SSEAYP.jpg'
},
{
    "title": "Trường ĐH Khoa Học Tự Nhiên, ĐHQG-HCM: 9 ứng viên đạt tiêu chuẩn chức danh Giáo sư và Phó Giáo sư",
    "author": "Ánh Phạm",
    "des": '"Ngày 11/11/2019, Hội đồng Giáo Sư Nhà Nước vừa công bố danh sách 424 ứng viên được công nhận Giáo sư và Phó Giáo sư. Trong đó, trường Đại học Khoa Học Tự Nhiên - ĐHQF-HCM có 3 ứng viên Giáo sư và 6 ứng viên Phó Giáo sư được xét công nhận đạt tiêu chuẩn chức danh."',
    "image": '../assets/images/news/giaosu.jpg'
}
]

function loadNewsData(data) {
    data.forEach((newDetail) => {
        var newInfo = $("<div class='new row'></div>");
        var col4 = $("<div class='col-4 new-img'></div>");
        var col8 = $("<div class='col-8 new-info'></div>");
        col4.append("<img src=" + newDetail.image + ">");
        col8.append("<h1 class='new-title'>" + newDetail.title + "</h1>");
        col8.append("<h3 class='new-author'>" + newDetail.author + "</h3>");
        col8.append("<p class='new-des'>" + newDetail.des + "</p>");
        col8.append("<a class='detailNewBtn' href='#'>Chi tiết</a>")
        newInfo.append(col4);
        newInfo.append(col8);
        $(".list-news").append(newInfo);
    })


}
function loadData(data) {

    data.forEach((book) => {
        var bookInfo = $("<div class='book row'></div>");
        var col4 = $("<div class='col-4 book-img'></div>");
        var col8 = $("<div class='col-8 book-info'></div>");
        col4.append("<img src=" + book.image + ">");
        col8.append("<h1 class='book-title'>" + book.name + "</h1>");
        col8.append("<h3 class='book-author'>" + book.author + "</h3>");
        col8.append("<p class='book-des'>" + book.des + "</p>");
        col8.append("<a class='borrowBookBtn' href='#'>Mượn sách</a>")
        bookInfo.append(col4);
        bookInfo.append(col8);
        $(".list-books").append(bookInfo);
    })
}



window.onload = function () {
    //
    var isLogin = localStorage.getItem('islogin');
    console.log(isLogin);
    //debugger
    if (isLogin === "true"){
        this.console.log("Đawmh mnhap roi");
        $('.login-btn').css("display", "none");
        $(".account-btn").css("display", "block");
    }
    else {
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
    }
    //Load Data
    loadData(listBooks);
    loadNewsData(listNews);
    
    
    
    // Handle events
    $('#loginBtn').click(function (e) {
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