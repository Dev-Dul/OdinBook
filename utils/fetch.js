import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export async function signUp(username, email, password){
    try{
        const res = await fetch(`${apiUrl}/api/v1/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            })
        });

        const json = await res.json();

        if(!res.ok){
          const error = new Error(json.message || "SignUp Failed!!");
          error.status = res.status;
          error.response = json;
          throw error;
        }
        return json;
    }catch(err){
        throw err;
    }
}


export async function logIn(username, password){
    try{
        const res = await fetch(`${apiUrl}/api/v1/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        const json = await res.json();

        if(!res.ok){
          const error = new Error(json.message || "Login Failed!!");
          error.status = res.status;
          error.response = json;
          throw error;
        }

        return json;
    }catch(err){
        throw err;
    }
}

export async function logOut(){
  try {
    const res = await fetch(`${apiUrl}/api/v1/logout`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();

    if(!res.ok){
      const error = new Error(json.message || "LogOut Failed!!");
      error.status = res.status;
      error.response = json;
      throw error;
    }

    return json;
  } catch(err){
    throw err;
  }
}


export async function sendNewPost(formData){
    try{
      const res = await fetch(`${apiUrl}/api/v1/posts/new`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      const json = await res.json();

      if(!res.ok){
      const error = new Error(json.message || "Creating new post failed!!");
      error.status = res.status;
      error.response = json;
      throw error;
    }

      return json;
    }catch(err){
      throw err;
    }
}


export function useGetPost(){
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPost(postId){
    try{
      const res = await fetch(`${apiUrl}/api/v1/posts/${postId}`, {
        method: "GET",
        credentials: "include",
      });
      
      if(!res.ok) throw new Error(res.message);
      const json = await res.json();
      setPost(json.post);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }

  return { post, error, loading, getPost };
}


export function useGetUser(){
  const [other, setUser] = useState({});
  const [userError, setUserError] = useState(null);
  const [userLoading, setLoading] = useState(true);

  async function getUser(userId){
    try{
      const res = await fetch(`${apiUrl}/api/v1/profiles/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      
      if(!res.ok) throw new Error(res.message);
      const json = await res.json();
      setUser(json.user);
    }catch(err){
      setUserError(err.messsage);
    }finally{
      setLoading(false);
    }
  }

  return { other, userError, userLoading, getUser };
}


export async function addFriend(userId, friendId){
    try{
        const res = await fetch(`${apiUrl}/api/v1/profiles/friends/${userId}/new`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            friendId: friendId,
          }),
        });
        
        if(!res.ok) throw new Error(res.message);
        const json = await res.json();
        return json;
      }catch(err){
        throw err;
      }
}



export function useGetAllPosts(){
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getAllPosts(){
    try{
      const res = await fetch(`${apiUrl}/api/v1/posts/all`, {
        method: "GET",
        credentials: "include",
      });
      if(!res.ok) throw new Error(res.message);

      const json = await res.json();
      setPosts(json.posts);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }

    return { posts, setPosts, error, loading, getAllPosts };
}

export function useGetAllUsers(){
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getAllUsers(){
    try{
      const res = await fetch(`${apiUrl}/api/v1/profiles/all`, {
        method: "GET",
        credentials: "include",
      });
      if(!res.ok) throw new Error(res.message);

      const json = await res.json();
      setUsers(json.users);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }

    return { users, error, loading, getAllUsers };
}


export function useSearch(){
  const [usersRes, setUsers] = useState([]);
  const [postsRes, setPosts] = useState([]);
  const [commentsRes, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  async function SearchEngine(query){
    try{
        const res = await fetch(`${apiUrl}/api/v1/posts/search?query=${query}`, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      console.log("json:", json);
      if(!res.ok){
          const error = new Error(json.message || "Data fetch failed!!");
          error.status = res.status;
          throw error;
        }

      setUsers(json.users);
      setPosts(json.posts);
      setComments(json.comments);
      return json;
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

    return { usersRes, postsRes, commentsRes, error, loading, SearchEngine };
}


export async function friendRequest(userId, friendId, friendStatus){
    let res;
    try {
      switch (friendStatus){
        case 'ACCEPT': 
           res = await fetch(`${apiUrl}/api/v1/profiles/${userId}/accept`, {
             method: "POST",
             credentials: "include",
             headers: {
              "Content-Type": "application/json",
            },
             body: JSON.stringify({
              friendId: friendId,
            }),
           });

        break;
        case 'REJECT': 
           res = await fetch(`${apiUrl}/api/v1/profiles/${userId}/reject`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friendId: friendId,
            }),
          });

        break;
        case 'REMOVE': 
           res = await fetch(`${apiUrl}/api/v1/profiles/${userId}/friends/${friendId}/remove`, {
            method: "GET",
            credentials: "include",
          });

        break;
        case 'ADD': 
           res = await fetch(`${apiUrl}/api/v1/profiles/${userId}/new`, {
            method: "POST",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               friendId: friendId,
             }),
          });

        break;
      }
      if(!res.ok) throw new Error(res.message);

      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}

export async function createNewComment(text, userId, postId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/posts/${postId}/comments/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        userId: userId,
        postId: postId,
      }),
    });

    const json = await res.json();
    if(!res.ok) {
      const error = new Error(json.message || "Creating comment failed...");
      error.status = res.status;
      error.response = json;
      throw error;
    }
    return json;
  } catch (err) {
    throw err;
  }
}


export async function deleteComment(postId, commentId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/posts/${postId}/comments/${commentId}/delete`, {
      method: "POST",
      credentials: "include",
    });

    const json = await res.json();
    if(!res.ok) {
      const error = new Error(json.message || "Deleting comment failed...");
      error.status = res.status;
      error.response = json;
      throw error;
    }
    return json;
  }catch(err) {
    throw err;
  }
}


export async function deletePost(postId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/posts/${postId}/delete`, {
      method: "POST",
      credentials: "include",
    });

    const json = await res.json();
    if(!res.ok) {
      const error = new Error(json.message || "SignUp Failed!!");
      error.status = res.status;
      error.response = json;
      throw error;
    }
    return json;
  }catch(err) {
    throw err;
  }
}


export async function likeHandler(userId, postId){
  console.log("postId likeHandler:", postId)
  try{
    const res = await fetch(`${apiUrl}/api/v1/posts/${postId}/likes/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId
      })
    });

    const json = await res.json();
    return json;
  }catch(err) {
    throw err;
  }
}

export async function updateProfile(formData){
    try{
      const res = await fetch(`${apiUrl}/api/v1/profiles/${formData.userId}/update`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error(res);
      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }   
}



export async function hydrateUser(){
    try{
        const res = await fetch(`${apiUrl}/api/v1/profiles/hydrate`, {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();
        if(res.status === 401) throw new Error("Unauthorized");
        if(!res.ok) throw new Error(json.message);

        return json.user;
    }catch(err){
        throw err;
    }
}

