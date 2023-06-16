const number1 = document.getElementById("num1") as HTMLInputElement;
const number2 = document.getElementById("num2")  as HTMLInputElement;
const buttonElement = document.getElementById("button")!;

const numResult: number[]= [];
const textResult: string[]= [];
function add(num1: number | string, num2: number | string) {
     
     if (typeof num1 ==='number' && typeof num2 ==='number') {
          return num1 + num2;
      } 
      else if (typeof num1 ==='string' && typeof num2=== 'string'){
          return num1+' '+num2;
     }
     return +num1 + +num2;
      }
     
 function printResult(resultObj:{val:number, timestamp: Date}){
     console.log(resultObj.val);
 }
buttonElement.addEventListener("click", ()=>{
     const num1 = number1.value;
     const num2 = number2.value;
     const result = add(+num1 , +num2);
     numResult.push(result as number);
     const textres = add(num1, num2);
     textResult.push(textres as string);
     console.log(result);
     printResult({val:result as number, timestamp: new Date()});
     console.log(numResult, textResult);

});

