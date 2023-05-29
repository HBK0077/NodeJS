//here we define all the expense methods which has to dsiplayed in the browser.
let amount=document.getElementById("amount");
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")
let btn = document.getElementById("premium");


//token decoder
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showPremiumButton(){
    btn.style.visibility="hidden";
    const element = document.createElement("h4");
    const text = document.createTextNode("You are a Premium User.");
    element.appendChild(text);
    const heading = document.getElementById("heading");
    heading.appendChild(element);
}

async function showLeaderboard(){
    try{
        const inputElement = document.createElement("input");
        inputElement.type = "button";
        inputElement.value = "Show Leaderboard";
        console.log(inputElement);
        inputElement.onclick = async()=>{
            
                const token = localStorage.getItem("token");
                const userLeaderboardArray= await axios.get("http://localhost:2500/leaderboard",{headers:{"Authorization": token}});
                console.log(userLeaderboardArray);

                var leaderboardElem = document.getElementById("board");
                leaderboardElem.innerHTML += `<h1>LeaderBoard</h1>`
                userLeaderboardArray.data.forEach((userDetails)=>{
                    leaderboardElem.innerHTML += `<li>Name-${userDetails.name} TotalExpense-${userDetails.totalCost}</li>`;
                
                })
               
            }
            document.getElementById("message").appendChild(inputElement);
            }catch(err){
                console.log(err);
            }
           

        }


//fetch all the expensedata  using get service
window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const token = localStorage.getItem('token');
        const decodeToken = parseJwt(token);
        console.log(decodeToken);
        const isPremium = decodeToken.isPremium;
        //console.log(isPremium);
       if(isPremium === true){
        const response = await axios.get("http://localhost:2500/show-expenses",{headers: {"Authorization": token}})
        console.log(response.data.allExpense);
        console.log(response.data.allExpense.length);
        for(var i=0; i<response.data.allExpense.length;i++){
            showBrowser(response.data.allExpense[i]);
        }
        showPremiumButton();
        showLeaderboard();
        localStorage.setItem('token', token);
        
       }else{
        const response = await axios.get("http://localhost:2500/show-expenses",{headers: {"Authorization": token}})
        console.log(response.data.allExpense);
        console.log(response.data.allExpense.length);
        for(var i=0; i<response.data.allExpense.length;i++){
            showBrowser(response.data.allExpense[i]);
        }
       }
    
        
    }catch(err){
        console.log({Error: err});
        console.log("Error in DOM CONTENT!!");
    }
})

function showBrowser(show){
    //console.log(show);
    var childNode=`<li id=${show.id} style="margin-bottom:10px;">${show.description}-${show.amount}-${show.category}
             <button onclick="deleteExpense('${show.id}')" style="float:right; margin-left:5px;">Delete</button>  
             <button onclick=editExpense('${show.id}','${show.description}','${show.amount}','${show.category}') style="float:right;">Edit</button>
                     </li>`
                     parentNode.innerHTML=parentNode.innerHTML+childNode;

}

//delete the expense

async function deleteExpense(key){
    try{
        console.log(parentNode)
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:2500/delete-expenses/${key}`,{headers: {"Authorization": token}})
        console.log("Entered Deleted DOM");
        let child = document.getElementById(key);
        //console.log(child);
        parentNode.removeChild(child);
    }catch(err){
        console.log(err);
    }
    

}

//storing the data on the database
button.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
    //store the values in the object
    myObj={
        description: description.value,
        amount:amount.value,
        category:category.value
    };
    console.log(myObj);
    const token = localStorage.getItem('token');
    const addExpense = await axios.post("http://localhost:2500/add-expenses",myObj,{headers:{'Authorization': token}})
        //console.log(response);
        console.log("post -->", addExpense.data.newexpense);
        showBrowser(addExpense.data.newexpense);
        //Making the input box empty
        description.value="";
        amount.value="";
        category.value="";
    }catch(err){
        console.log(err);
    } 
})

//premium button code
document.getElementById("premium").onclick = async function(e){
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:2500/premium-membership',{headers:{"Authorization": token}});
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function(response){
            let result = await axios.post("http://localhost:2500/update-transaction-status",{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
        },{headers: {"Authorization": token}})

        alert("Your are a premium user now");
    
        localStorage.setItem('token', result.data.token);
        showPremiumButton();
        showLeaderboard();
            
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", async()=>{
        key = response.data.order.id;
        let failed = await axios.post("http://localhost:2500/update-transaction-status",{
            order_id: key,
            payment_id: null
        },{headers: {"Authorization": token}})
        console.log(failed.data.msg);
        alert("Somthing went wrong");
    });
}

