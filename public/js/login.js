const loginForm = document.querySelector("#login-form");
const signupForm = document.getElementById("signup-form");

loginForm.addEventListener("submit",e=>{
  e.preventDefault();
  const userObj = {
      name:document.querySelector("#login-name").value,
      password:document.querySelector("#login-password").value
  }
  console.log(userObj)
  fetch("/api/users/login",{
      method:"POST",
      body:JSON.stringify(userObj),
      headers: {"Content-Type":"application/json"}
  }).then(res=>{
      if(res.ok){
         location.href = "/dashboard"
      } else {
          alert(response.statusText)
      }
  })
})

signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        name:document.querySelector("#signup-name").value,
        password:document.querySelector("#signup-password").value
    }
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers: {"Content-Type":"application/json"}
    }).then(res=>{
            if(res.ok){
           location.href = "/login"
        } else {
            alert(res.statusText)
        }
    })
})