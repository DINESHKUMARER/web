// import React from "react";

// function App(){

//   let username ="Dinesh"

// function Greet(){
//   alert (`Good Evening ${username}`)
// }
//   return(
//     <>
//     <h2>My Name is : {username}</h2>
//     <button onClick={Greet}>Greet</button>
//     </>
//   )
// }
// export default App;

// Example 2 - Variable vs React variable
// import react from "react";

// function App(){
//   let count = 10

//   function IncreaseCount(){
//     count = count + 1;
//     console.log(count)
//   }
//    return(
//     <>
//     <h2>Like/Cart/Quanity : {count} </h2>
//     <button onClick={IncreaseCount}>Increase</button>
//     </>
//    )
// }
// export default App;

// Example 3 - useState
// import React,{ useState } from "react";

// function App(){

//  const [like, setLike] = useState(12)

//   function IncreaseLike(){
//     setLike(like + 1)
//     console.log(count)
//   }
//    return(
//     <>
//     <h2>Like/Cart/Quanity : {like} </h2>
//     <button onClick={IncreaseLike}>Increase</button>
//     </>
//    )
// }
// export default App;

//Example 4 - input tag
import React,{ useState } from "react";

function App(){

 const[show,setShow] = useState(false)

   return(
    <>
    <input type={show ? "text": "password"}     Placeholder="EnternYour Password"           />
    <button onclick={() => setShow(!show)}>Show/hide</button>
    </>
   )
}
export default App;