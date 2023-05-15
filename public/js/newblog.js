const loginForm = document.querySelector("#post-form");

loginForm.addEventListener("submit",e=>{
  e.preventDefault();
  const postObj = {
      name:document.querySelector("#post-name").value,
      description:document.querySelector("#post-text").value
  }
  console.log(postObj)
  fetch("/api/blogposts/",{
      method:"POST",
      body:JSON.stringify(postObj),
      headers: {"Content-Type":"application/json"}
  }).then(res=>{
      if(res.ok){
         location.href = "/dashboard"
      } else {
          alert(res.statusText)
      }
  })
})