document.querySelector("#logout-btn").addEventListener("click",e=>{
    e.preventDefault();
    fetch("/api/users/logout",{
        method:"POST",
    }).then(res=>{
        if(res.ok){
            location.href = "/"
        } else {
            alert(response.statusText)
        }
    })
})