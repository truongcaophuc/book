import React from "react";
import Login from "./Login";
import Register from "./Register";
import {useState} from "react"
const UserPage = () => {
  const [show,setShow]=useState("register")
  return (
    <section class="login-section pt-100 pb-100" style={{ marginTop: "100px" }}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <ul
              class="nav nav-pills mb-40 justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item mb-3 mx-2" role="presentation">
                <button
                   className="bg-[#f96822] px-[64px] py-[15px] text-[white] text-[20px] border-[2px] border-[#f96822]"
                   style={show=="login"?{backgroundColor:"white",color:"#f96822"}:{backgroundColor:"#f96822"}}
                   id="pills-home-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() =>{setShow("register")}}
                >
                  Register
                </button>
              </li>
              <li class="nav-item mb-3 mx-2" role="presentation">
                <button

                  className="bg-[#] px-[64px] py-[15px] text-[white] text-[20px] border-[2px] border-[#f96822]"
                  style={show=="register"?{backgroundColor:"white",color:"#f96822"}:{backgroundColor:"#f96822"}}
                  id="pills-profile-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  onClick={() =>{console.log("login");setShow("login")}}
                >
                  Login
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              {show=="register"?
              <div
              
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div class="form-wrap box--shadow">
                  <Register />
                </div>
              </div> :
              <div 
           
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div class="form-wrap box--shadow">
                  <Login />
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
