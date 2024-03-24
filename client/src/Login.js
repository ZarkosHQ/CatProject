import { useNavigate } from "react-router-dom";
import "./Login.scss";
import "./branding.scss";
import { useState } from "react";
import axios from "axios";

function openModal(header, message){
    const modal = document.getElementById("MyModal");
    const modalHeader = document.getElementById("ModalHeader");
    const modalMessage = document.getElementById("ModalMessage");

    if (modal && modalHeader && modalMessage) {
        modalHeader.textContent = header;
        modalMessage.textContent = message;
        modal.style.display = "flex";
    }
}
function closeModal() {
    const modal = document.getElementById("MyModal");
    const modalHeader = document.getElementById("ModalHeader");
    const modalMessage = document.getElementById("ModalMessage");
    if (modal && modalHeader && modalMessage) {
        modalHeader.textContent = "";
        modalMessage.textContent = "";
        modal.style.display = "none";
    }
}

function Modal() {

    return(
        <div id={"MyModal"} className="loginModal">
            <div>
                <strong id={"ModalHeader"}>{}</strong>
                <p id={"ModalMessage"}>{}</p>
                <button onClick={()=>closeModal()}>OK</button>
            </div>
        </div>
    )
}


function Template({children}){
    //Make the login screen a reusable component for the signup 
    //and create account pages
    const nav = useNavigate()

    return (
        <div className="HeaderTemplate">
            <div onClick={()=>nav("/")}>

                <img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha" />
            </div>
            <div/>
            {children}
            <Modal/>
        </div>
    );

}

function LoginScreenBase({children}){
    const nav = useNavigate();

    return(
        <div className="SignUpPage">
            <div>
                <img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha" onClick={()=>nav("/")}/>
            </div>
            {children}
        </div>
    );
}

function LoginForm(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/login', {email: email, password: password})
        .then(result => {console.log(result)
            if(result.data.status == "success"){
                localStorage.setItem("token", result.data.token)
                nav("/DashBoard")
            }
            else console.log(result.data.reason)
        })
        .catch(err => openModal("Login Failed",err.response.data.reason))
    }

    return(
        <div className="LoginForm">
            
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="InputFields">
                <strong>Password</strong>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <strong>OR</strong>

            <button className="LinkButton">  <div className="google"></div> Continue with google</button>
            <button className="LinkButton facebook"> <div>f</div> <span>Continue with facebook</span></button>
            <button className="LinkButton">Continue with pearson membership</button>

            <div>
                <button onClick={()=>{nav("/SignUp")}}> Create Account</button>
                <button onClick={handleSubmit}> Login </button>
            </div>
        </div>
    )
}

function CreateAccountForm(){
    const [myNav, setNav] = useState(); //default is /SignUp
    const nav = useNavigate();
    function handleNav(){
        if(myNav === null){
            //do nothing
        }else if(myNav === 0){
            nav("/SignUp/SellerSignUp");
        }else if(myNav === 1){
            nav("/SignUp/BuyerSignUp");
        }
    }

    return(
        <div className="CreateAccountForm">
            
            <button className={myNav==0 ? "LinkButton toPageButton" : "LinkButton"} onClick={()=>setNav(0)}>Create Seller Accout</button>
            <button className={myNav==1 ? "LinkButton toPageButton" : "LinkButton"} onClick={()=>setNav(1)}>Create Buyer Account</button>
            <button className="LinkButton" onClick={()=>handleNav()}>Continue</button>

        </div>
    )
}

function CreateSellerForm(){
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/signup', {type: "seller", firstName:firstName, lastName: lastName, email: email, password: password})
        .then(result => {console.log(result)
            navigate("/login")
        })
        .catch(err=> openModal("Login Failed","Account Creation Failed"))
    }

    return (
        <div className="SellerForm">
            <h2>Join as Vender</h2>
            <strong>Contact information</strong>
            <div className="InputFields">
                <strong>First Name</strong>
                <input type="text" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="InputFields">
                <strong>Last Name</strong>
                <input type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="InputFields">
                <strong>Password</strong>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <strong>Business information</strong>

            <div className="InputFields">
                <strong>Country</strong>
                <input type="text" placeholder="Enter country of operation" />
            </div>
            <div className="InputFields">
                <strong>Legal Business Name</strong>
                <input type="text" placeholder="Enter name of business" />
            </div>
            <div className="InputFields">
                <strong>Business Identification Number(BIN)</strong>
                <input type="text" placeholder="Bin number" />
            </div>
            <div className="InputFields">
                <strong>Inquiry Design</strong>
                <select>
                    <option>Modern</option>
                    <option>Rustic</option>
                    <option>Cost effective</option>
                    <option>Large Scale Operation</option>
                    <option>Custom</option>
                </select>
            </div>
            <button onClick = {handleSubmit}>Continue to Verify</button>
        </div>
    )
}
function CreateBuyerForm(){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName]   = useState();
    const [email, setEmail]         = useState();
    const [password, setPassword]   = useState();
    const [country, setCountry]     = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/auth/signup', 
        {type: "buyer",firstName:firstName, lastName: lastName, email: email, password: password})
        .then(result => {console.log(result)
            navigate("/login")
        })
        .catch(err=> openModal("Login Failed","Account Creation Failed"))
    }

    return (
        <div className="BuyerForm">
            <h2>Join as Customer</h2>
            <strong>Contact information</strong>
            <div className="InputFields">
                <strong>First Name</strong>
                <input type="text" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="InputFields">
                <strong>Last Name</strong>
                <input type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="InputFields">
                <strong>Country</strong>
                <input type="text" placeholder="Enter country" onChange={(e) => setCountry(e.target.value)}/>
            </div>
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="InputFields">
                <strong>Password</strong>
                <input type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="InputFields">
                <strong>Experience</strong>
                <input type="text" placeholder="Describe your expertise" />
            </div>
            <div className="InputFields">
                <strong>What are you interrested in</strong>
                <select>
                    <option>Multi-Family Homes</option>
                    <option>Concrete</option>
                    <option>Sewage</option>
                    <option>Housing</option>
                    <option>Towers</option>
                    <option>High-Rises</option>
                </select>
            </div>
            <button onClick = {handleSubmit}>Create Account</button>
        </div>
    )
}

export{Template, LoginScreenBase, LoginForm, CreateAccountForm, CreateSellerForm, CreateBuyerForm}