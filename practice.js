var names = document.getElementById('name');
var description = document.getElementById('description');
var quantity = document.getElementById('quantity');
var price = document.getElementById('price');
var btn = document.getElementById('button');

//fetch all data from Database

window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const response = await axios.get("http://localhost:7020/show-data");
        showBrowser(response.data.allData);
        console.log(response.data.allData.length);
        // for(var i=0;i<response.data.allData.length;i++){
        //     showBrowser(response.data.allData[i]);
        // }

    }catch(err){
        //console.log(err);
        console.log("Error in Dom creation");
    }
})

function showBrowser(show){
    var parentNode = document.getElementById("ul");
    for(var i=0;i<show.length;i++){
           console.log(show[i]);
        var childNode = `<li id=${show[i].id}>${show[i].name}-${show[i].description}-${show[i].quantity}-${show[i].price}
        <button onclick="buy1Product('${show[i].id}','${show[i].quantity}')">BUY1</button>
        <button onclick="buy2Product('${show[i].id}','${show[i].quantity}')">BUY2</button>
        <button onclick="buy3Product('${show[i].id}','${show[i].quantity}')">BUY3</button></li>`
        parentNode.innerHTML = parentNode.innerHTML+childNode;
        //console.log(`${show[i]._id}`);
       //window.location.reload();
    }
}

function showUpdationOnScreen(show){
    var parentNode = document.getElementById(`${show.id}`);
    var childNode = `<li id=${show.id}>${show.name}-${show.description}-${show.quantity}-${show.price}
        <button onclick="buy1Product('${show.id}','${show.quantity}')">BUY1</button>
        <button onclick="buy2Product('${show.id}','${show.quantity}')">BUY2</button>
        <button onclick="buy3Product('${show.id}','${show.quantity}')">BUY3</button></li>`
        parentNode.innerHTML = childNode;
    
}
//add to the db
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const myobj={
        name:names.value,
        description: description.value,
        quantity: quantity.value,
        price: price.value
    }
    console.log(myobj);

    axios.post("http://localhost:7020/add-data", myobj)
    .then((response)=>{
        console.log("post-->", response.data.newitem);
        console.log(response);
        showBrowser(response.data.newitem);
    })
    .catch((err)=>{
        console.log(err);
    });
   
})


async function buy1Product(key,quantity){
    try{

    quantity = quantity - 1;
    // //onsole.log(value);

    let response = await axios.put(`http://localhost:7020/buy-data1/${key}`,{"quantity":quantity})
    console.log(response.data.updated)
    showUpdationOnScreen(response.data.updated[0]);
    }catch(error){
        console.log(error);
    }
    
}
async function buy2Product(key,quantity){
    try{

    quantity = quantity - 2;
 
    let response = await axios.put(`http://localhost:7020/buy-data2/${key}`,{"quantity":quantity})
    console.log(response.data.updated);
    showUpdationOnScreen(response.data.updated[0]);
    }catch(error){
        console.log(error);
    }
    
}
async function buy3Product(key,quantity){
    try{

    quantity = quantity - 3;
   

    let response = await axios.put(`http://localhost:7020/buy-data3/${key}`,{"quantity":quantity})
    console.log(response.data.updated);
    showUpdationOnScreen(response.data.updated[0]);
    }catch(error){
        console.log(error);
    }
    
}