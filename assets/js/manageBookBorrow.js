var listBooksBorrowed = [{
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
];

function loadData(data) {
    console.log("AB")
    data.forEach((
        book) => {
        console.log(book);
        var bookBorrowed = $("<div class='book row'></div>");
        var col4 = $("<div class='col-4 book-img'></div>");
        var col8 = $("<div class='col-8 book-info'></div>");
        col4.append("<img src=" + book.image + ">");
        col8.append("<h1 class='book-title'>" + book.name + "</h1>");
        col8.append("<h3 class='book-author'>" + book.author + "</h3>");
        col8.append("<p class='book-des'>" + book.des + "</p>");
        col8.append("<a class='returnBtn' href='#'>Trả sách</a>")
        bookBorrowed.append(col4);
        bookBorrowed.append(col8);
        $(".list-booksBorrowed").append(bookBorrowed);
    })


}



window.onload = function() {
    loadData(listBooksBorrowed);

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