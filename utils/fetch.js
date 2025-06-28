// const apiUrl =
import { useState } from "react";

export async function signUp(name, email, username, password){
    try{
        const res = await fetch("http://localhost:3000/api/v1/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                username: username,
                password: password,
            })
        });

        const json = await res.json();
        return json;
    }catch(err){
        throw err;
    }
}


export async function logIn(username, password){
    try{
        const res = await fetch("http://localhost:3000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        const json = await res.json();
        return json;
    }catch(err){
        throw err;
    }
}

export async function useFetchGroups(){
    const [groups, setGroups] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    try{
      const res = await fetch("http://localhost:3000/api/v1/groups/");
      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      setGroups(json.groups);
    
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }

    return { groups, error, loading };

}

export async function useFetchGroup(groupId){
    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchGroup(groupId){
        try{
          const res = await fetch(`http://localhost:3000/api/v1/groups/${groupId}`);
          if(!res.ok) throw new Error(res.status);
          const json = await res.json();
          setGroup(json.group);
        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
    }

    fetchGroup(groupId);

    return { group, error, loading, fetchGroup }
}

export async function joinGroup(groupId, userId){
    try{
      const res = await fetch("http://localhost:3000/api/v1/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          userId: userId,
        }),
      });

      const json = await res.json();
      return json;

    }catch(err){
      throw err;
    }
}


export async function sendPrivateMessage(text, authorId, friendId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/${friendId}/messages/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          authorId: authorId,
          friendId: friendId,
        }),
      });

      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}

export async function sendGroupMessage(text, authorId, groupId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/${groupId}/messages/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          authorId: authorId,
          groupId: groupId,
        }),
      });

      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}


export async function useGetPrivateMessage(friendId){
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPrivateMessage(friendId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/${friendId}/messages`);
      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      setMessages(json.message);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }

    getPrivateMessage(friendId);

    return { messages, error, loading, getPrivateMessage };
    
  }
}

export async function addFriend(friendId){
    try{
        const res = await fetch(`http://localhost:3000/api/v1/friends/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friendId: friendId,
          }),
        });
        
        if(!res.ok) throw new Error(res.status);
        const json = await res.json();
        return json;
      }catch(err){
        throw err;
      }
}

export async function getUserFriends(userId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId
        }),
      });

      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}


export async function getAllUsers(){
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    try{
      const res = await fetch(`http://localhost:3000/api/v1/profiles/all`);
      if(!res.ok) throw new Error(res.status);

      const json = await res.json();
      setUsers(json.users);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }

    return { users, error, loading };
}

export async function updateProfile(formData){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/profiles/update`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }   
}

export async function fetchUser(userId){
    try{
        const res = await fetch(`http://localhost:3000/api/v1/profiles/${userId}`);
        if(!res.ok) throw new Error(res.status);
        const json = await res.json();
        return json;
    }catch(err){
        throw err;
    }
}

