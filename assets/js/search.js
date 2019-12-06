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

function loadData(data) {
    data.forEach((
        book) => {
        console.log(book);
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

function getData(data) {
    var s = "/layouts/borrow.html?" + "value=" + data;
    return s;
}

window.onload = function() {
    loadData(listBooks);

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
}