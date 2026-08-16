import React from "react";
import { useState , useEffect } from "react";
import "./App";

function App(){

  const[users , setUsers ] = useState([])

  //http://jsonplaceholder.typicode.com/users

  useEffect(() =>{
           fetch ("http://jsonplaceholder.typicode.com/users")

           .then(res =>res.json())
           .then(data => setUsers(data))

           .catch(error => console.log("Error Fetching", error))
  },[])
  return(
    <>
    <div className ="app"> 
    <h2 className="title">EMPLOYYE DASHBOARD</h2>
    </div>

    {users.map(user => (
      //<p key={user.id}>    {user.name} and {user.email}   </p>
      <div style={{border:'1px solid black', margin:'10px',borderRadius:'12px'}} key={user.id}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    </>
  )
}
export default App;