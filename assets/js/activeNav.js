var tmp = document.getElementById("myNav");
var links = tmp.getElementsByClassName("tab");
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("active", function() {
        var cur = document.getElementsByClassName("active");
        cur[0].className = cur[0].className.replace("active", " ");
        this.className += "active";
    });
}