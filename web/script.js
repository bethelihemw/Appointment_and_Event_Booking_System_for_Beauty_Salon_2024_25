document.getElementById("logout")?.addEventListener("click",function(){
    localStorage.removeItem('token')
    sessionStorage.clear();
    window.location.href="events.html";
});

function service(){
    window.location.href="services.html"
}

