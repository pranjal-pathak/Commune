import { addDoc, collection,query,  where,getDocs,deleteDoc,doc} from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { Post as IPost } from "./main";
// post is changes to IPOST to avoid same name in the main and post file
import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect, useState } from "react";
import {FaRegTrashAlt} from 'react-icons/fa';

// post is changes to IPOST to avoid same name 

interface Props{
    post:IPost;
    deletePost :(post:IPost)=>void; 
}

interface Like{
    likeId: string,
    userId: string,
}

export const Post = (props: Props)=>{
    const { post } = props;


    const [user] = useAuthState(auth);

    const [likes,setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db,"likes"); 

    const likesDoc = query(likesRef, where("postId","==",post.id));

    const getLikes = async()=>{
        const data =await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({
            userId: doc.data().userId,
            likeId: doc.id 
        })));   
    };

    
    const addLike = async() =>{
        try{
        const newDoc = await addDoc(likesRef,{
            userId: user?.uid,
            postId: post.id,
        });
        if(user){
        // this is a hack to rerender automatically whenever a like is added otherwise there was a need to refresh the page
        setLikes((prev)=>
        prev ? [...prev,{userId: user?.uid,likeId:newDoc.id}]:[{userId:user?.uid,likeId:newDoc.id}] 
        )}
        }
        catch(err)
        {
            console.log(err);
        }
    };

    const removeLike = async()=>{
        try{
            const likeToDeleteQuery = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery); 
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db,"likes",likeId); 
            await deleteDoc(likeToDelete);
            if(user)
            {
                setLikes((prev)=> prev && prev?.filter((like) => like.likeId !== likeId))
            }
            
        }
        catch(err)
        {
            console.log(err); 
        }
    }
    
    
    const hasUserLiked = likes?.find((like)=>like.userId===user?.uid);

    useEffect(()=>{
        getLikes();
    },[]);

    
  
    

   
    return(
        <div>
            <div className = "title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className ="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked? removeLike : addLike} >{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                {likes && <p>Likes:{likes.length} </p>}
                {user?.uid==post.userId&&<button style={{color:'red'}} onClick={()=>props.deletePost(post)}> {<FaRegTrashAlt />} Delete Post</button>}
            </div>
        </div>
    );
};
