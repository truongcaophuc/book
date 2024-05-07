import React from "react";
import Login from "./Login";
import Register from "./Register";
import {useState} from "react"
const UserPage = () => {
  const [show,setShow]=useState("register")
  return (
    <section class="login-section pt-100 pb-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6" style={{width:"100%"}}>
            <img 
              width="100%"
              src="https://www.bing.com/rp/fY0wJ-QaIKghQ87Qs9ufsshTAws.png">
            </img>
          </div>
          <div class="col-lg-6" style={{ background:"white", borderRadius:"10px" }}>
            <ul
              class="nav nav-pills mb-20 justify-content-center mt-50"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item mb-3 mx-2" role="presentation">
                <button
                   className="bg-[##1976D2] px-[64px] py-[15px] text-[white] text-[20px] border-[2px] border-[#1976D2]"
                   style={show=="login"?{backgroundColor:"white",color:"#1976D2"}:{backgroundColor:"#1976D2"}}
                   id="pills-home-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  onClick={() =>{setShow("register")}}
                >
                  Đăng ký
                </button>
              </li>
              <li class="nav-item mb-3 mx-2" role="presentation">
                <button

                  className="bg-[#] px-[64px] py-[15px] text-[white] text-[20px] border-[2px] border-[#1976D2]"
                  style={show=="register"?{backgroundColor:"white",color:"#1976D2"}:{backgroundColor:"#1976D2"}}
                  id="pills-profile-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  onClick={() =>{console.log("login");setShow("login")}}
                >
                  Đăng nhập
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
