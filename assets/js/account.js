window.onload = function() {
    var isLogin = localStorage.getItem('islogin');
    console.log(isLogin);
    if (isLogin === "true"){
        $('.login-btn').css("display", "none");
        $(".account-btn").css("display", "block");
        $('.bell').css('display',"block");
    }
    else {
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
        $('.bell').css('display',"none");
    }

    $(".log-out-btn").click((e)=>{
        this.console.log("Hello");
        $('.login-btn').css("display", "block");
        $(".account-btn").css("display", "none");
        $('.bell').css('display',"none");
        this.localStorage.removeItem('islogin');
    })

    $("#update-account").on('click', function(){
        console.log("Clicked");
    })

    $('.cancelRequestBtn').on('click', function(){
        $('.cancelRequestBtn').parent().parent().css("display","none");
    })   

    $('.confirmReturn').on('click', function(){
        console.log("Clicked");
        $('#returnBookModal').modal("hide");
        $('.book-borrowing').css("display","none");
    })
    var newPhoneNumber = $('.change-phone').val();
    
};