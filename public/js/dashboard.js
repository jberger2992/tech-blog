const delButton = document.querySelectorAll(".del-btn");
const newPostButton = document.querySelector("#new-post-btn")

for (let i = 0; i < delButton.length; i++) {
    delButton[i].addEventListener("click", e=>{
    const blogId = e.target.id
        fetch(`/api/blogposts/${blogId}`,{
            method:"DELETE"
        }).then(res=>{
           location.reload();
        })
    })
}

newPostButton.addEventListener("click", e=>{
    window.location.assign(`/newblog`)
})