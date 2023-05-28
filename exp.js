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
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:2500/show-expenses",{headers: {"Authorization": token}})
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