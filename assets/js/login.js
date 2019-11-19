window.onload = function() {
    $('#loginBtn').click(function(e){
        var username = $('#username').val();
        var password = $("#password").val();
        if (password === 'admin' && username ==='admin') {
            alert("Đăng nhập thành công!!!");
            $('#formLogin').modal('hide');
        }
        else {
            $(".noti-err").css("display","block");
            alert("Username :admin ; password : admin")
        }
    })
  }