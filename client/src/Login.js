import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";



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
        </div>
    );

}

function LoginScreenBase({children}){

    return(
        <div className="SignUpPage">
            <div>
                <img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha" />
            </div>
            {children}
        </div>
    );
}

function LoginForm(){
    const nav = useNavigate();

    return(
        <div className="LoginForm">
            
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Pasword</strong>
                <input type="password" placeholder="Enter password" />
            </div>

            <strong>OR</strong>

            <button className="LinkButton">Continue with google</button>
            <button className="LinkButton">Continue with facebook</button>
            <button className="LinkButton">Continue with pearson membership</button>

            <div>
                <button onClick={()=>{nav("/SignUp")}}> Create Account</button>
                <button onClick={()=>{nav("/DashBoard")}}> Login </button>
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
    return (
        <div className="SellerForm">
            <h2>Join as Vender</h2>
            <strong>Contact information</strong>
            <div className="InputFields">
                <strong>First Name</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Last Name</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Password</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>

            <strong>Buisiness information</strong>

            <div className="InputFields">
                <strong>I dont know</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>what this crap says</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>LegalBuisines Name</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>What?</strong>
                <select></select>
            </div>
            <button>Continue to Verify</button>
        </div>
    )
}
function CreateBuyerForm(){
    return (
        <div className="BuyerForm">
            <h2>Join as Customer</h2>
            <strong>Contact information</strong>
            <div className="InputFields">
                <strong>First Name</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Last Name</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Email</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Password</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>Experience</strong>
                <input type="email" placeholder="Ex. Example@email.com" />
            </div>
            <div className="InputFields">
                <strong>What are you currentinly in</strong>
                <select></select>
            </div>
            <button>Create Account</button>
        </div>
    )
}



export{Template, LoginScreenBase, LoginForm, CreateAccountForm, CreateSellerForm, CreateBuyerForm}