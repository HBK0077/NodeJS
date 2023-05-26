let email = document.getElementById('email');
let password = document.getElementById('password');
let button = document.getElementById('press');

//user login 
button.addEventListener("click", (e)=>{
    e.preventDefault();
    obj={
        email:email.value,
        password:password.value
    }
    //console.log(obj);
    axios.post("http://localhost:2500/user-login",obj)
    .then((response)=>{
        console.log(response.data);
        if(response.data.success===true){
            console.log("User data is available in DB");
            alert("User Logged In");
        }else{
            console.log("User Not existing");
            alert("Please Sign Up");
        }
        
    })
    .catch((error)=>{
        console.log(error);
    })
})