// import React from "react";

// function App(){

// function handleClick(){
//     alert('Good Morning Welcome To React');
// }
//   return(
//   <>
//   <button onClick={handleClick}>Click Me</button>
//   </>
//   )
//  }
// export default App;

import React from "react";
import { useState } from "react";

function App(){

    const[text,setText] = useState("")
  return(
  <>
    <input
    type="text"
    placeholder="Search..."
    onChange={(e)=> setText(e.target.value)}
    />
  
  <h3>You typed : {text}</h3>
  </>
  )
 }
export default App;