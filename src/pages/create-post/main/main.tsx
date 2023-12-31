import {getDocs,collection, deleteDoc,doc} from "firebase/firestore";
// getdocs different from getdoc
import {db} from '../../../config/firebase';
import { useState,useEffect} from "react";
import { Post } from "./post";
import {auth} from "../../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { log } from "console";

export interface Post{
    id: string;
    userId: string;
    title: string;
    username:string;
    description:string; 
      
    }


export const Main = ()=>{

        const [user] = useAuthState(auth);
        const navigate = useNavigate();

        const redirect=()=>{
            navigate("/login");
        }

        const [postsList, setPostsList] = useState<Post[] | null>(null);
        const postsRef = collection(db,"posts");

        const getPosts = async() =>{
          const data = await getDocs(postsRef)
        //   console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id}))); 
        setPostsList(
            data.docs.map((doc)=>({...doc.data(), id:doc.id}))as Post[]
            );   
        }; 

       useEffect(()=>
       {
          getPosts();  
       },[])
    //    we add an empty array in useEffect so it will only rerender when the component is mounted

    const deletePost= async(post:Post)=>{
        try
        {
        const id = post.id;
        await deleteDoc(doc(db,'posts',id));

        setPostsList((prev)=>prev && prev?.filter((post)=>post.id!=id))

        }
        catch(err)
        {
            console.log(err);
            
        }
    }



    return(
        
        <div>{postsList?.map((post)=> (
        <Post post={post} deletePost={deletePost}  />
        ) 
        )}
        {!user && <div><h2>Please login to continue</h2>
        <button onClick={redirect}>Login</button></div>}
        </div>
    )
}