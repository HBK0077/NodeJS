let name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let button = document.getElementById('press');

//storing data in database
button.addEventListener("click", (e)=>{
    e.preventDefault();
    obj={
        name:name.value,
        email:email.value,
        password:password.value
    }
    console.log(obj);
    axios.post("http://localhost:2500/add-user",obj)
    .then((response)=>{
        //console.log(response.data.newUser);
        if(response.data.newUser){
            console.log("User data saved in database");
        }else{
            console.log("User already exists");
        }
        
    })
    .catch((error)=>{
        console.log(error);
    })
})