import {Link} from "react-router-dom";
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";

export const Navbar =()=>
{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const logout = async() =>{
        await signOut(auth);
        navigate("/login");
    }
    return(
        <div className="navbar">
            <div className="links">
            <button><Link to = "/">Home</Link></button>
            {!user ? 
            <button><Link to ="/login">Login</Link></button> :  <button><Link to ="/createPost">Create Post</Link></button>
            }
            </div>

            <div className="user">
                {user && (
                    <>
                    {/* three different tags , so have to be wrapped */}
                <p>{user?.displayName}</p>
                <img src ={user?.photoURL || ""} width="25" height="25"/>
                <button className="btn" onClick={logout}>Log Out</button>
                </>
                )}
            </div>
        </div>
    )
}