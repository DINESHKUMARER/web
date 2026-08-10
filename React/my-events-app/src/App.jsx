// import React from "react";
//  function App(){
//   function handleClick(){
//     alert (`Good Evening Welcome To React`)
//   }
//   return(
//   <>
//   <button onClick={handleClick}>Click</button>
//   </>
//   )
//  }
//  export default App;

//Example - 2
// import React from "react";
// import { useState } from "react";

//  function App(){

//   const [isFollow, setIsFollow] = useState (false);

//   return(
//   <>
//   <button onClick={()=> setIsFollow(!isFollow)}>
//             {isFollow ? "Following": "Follow"}
//   </button>
//   </>
//   )
//  }
//  export default App;

//Example - 3
import React from "react";
import { useState } from "react";

 function App(){

  const [isFollow, setIsFollow] = useState (false);

  return(
  <>
  <button onClick={()=> setIsFollow(!isFollow)}>
      {isFollow ? "Following": "Follow"}
  </button>
  </>
  )
 }
 export default App;