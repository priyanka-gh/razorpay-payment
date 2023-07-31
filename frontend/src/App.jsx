import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const BACKEND_URL = 'http://localhost:5000';

  const initiatePayment = async() => {
    try{
      const resp = await axios.post(`${BACKEND_URL}/createOrder`,{
        amount : "1000",
        currency : "INR",
        receipt: "abcd",
        notes : {}
      })
    console.log('first',resp.data)

    const {id} = resp.data;
    const { amount, currency, receipt, notes} = resp.data;


      
    const options = {
      key : "rzp_test_dH5WLS0e5gOSS0",
      amount : 1000,
      currency : "INR",
      name: "PG",
      description: "dbms",
      order_id: id,
      handler: function(response){
        console.log("Payment Successful",response)
      },
      prefill: {
        name: "Priyanka Ghansela",
        email: "p@gmail.com"
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
    }
    catch(err){
      console.log("err ",err)
    }
  }
  return (
    <>
      <hr/>
      <h2>Advanced Data Structures & Algorithms Course</h2>
      <h3>Description</h3>
    
      <ul>
          <li>Best Course for SDE placements</li>
          <li>
              Available in 4 major Languages JAVA, 
              C/C++, Python, Javascript
          </li>
          <li>Lifetime Access</li>
      </ul>
    
      <span> Cost:- 499 Rupees 
          <button onClick={initiatePayment} >
              Pay Now & Get Access
          </button> 
      </span>
      <hr/>
    </>
  )
}

export default App
