//here we define all the expense methods which has to dsiplayed in the browser.
let amount=document.getElementById("amount");
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")

//fetch all the expensedata  using get service
window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const response = await axios.get("http://localhost:2500/show-expenses");
        console.log(response.data.allExpense);
        console.log(response.data.allExpense.length);
        for(var i=0; i<response.data.allExpense.length;i++){
            showBrowser(response.data.allExpense[i]);
        }
    }catch(err){
        console.log({Error: err});
        console.log("Error in DOM CONTENT!!");
    }
})

function showBrowser(show){
    //console.log(show);
    var childNode=`<li id=${show.id} style="margin-bottom:10px;">${show.description}-${show.amount}
             <button onclick="deleteExpense('${show.id}')" style="float:right; margin-left:5px;">Delete</button>  
             <button onclick=editExpense('${show.id}','${show.description}','${show.amount}') style="float:right;">Edit</button>
                     </li>`
                     parentNode.innerHTML=parentNode.innerHTML+childNode;

}

//delete the expense

function deleteExpense(key){
    axios.delete(`http://localhost:2500/delete-expenses/${key}`)
    .then((resource)=>{
        console.log("Entered Deleted DOM");
        child = document.getElementById(key);
        
        parentNode.removeChild(child);
    }).catch((err)=>{
        console.log("Error in Delete DOM");
    });

}

//storing the data on the database
button.addEventListener("click", (e)=>{
    e.preventDefault();
    //store the values in the object
    myObj={
        description: description.value,
        amount:amount.value
    };
    console.log(myObj);

    axios.post("http://localhost:2500/add-expenses",myObj)
    .then((response)=>{
        console.log("post -->", response.data.newexpense);
        showBrowser(response.data.newexpense);
    })
    .catch((err)=>{
        console.log(err);
    });

    //Making the input box empty
    description.value="";
    amount.value="";
})