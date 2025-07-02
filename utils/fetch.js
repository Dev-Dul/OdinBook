// const apiUrl =
import { useState } from "react";

export async function signUp(name, email, username, password){
    try{
        const res = await fetch("http://localhost:3000/api/v1/signup", {
            method: 'POST',
            credentials: 'include',
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
        return json;
    }catch(err){
        throw err;
    }
}

export async function logOut(){
  try {
    const res = await fetch("http://localhost:3000/api/v1/logout", {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
}

export function useFetchGroups(){
    const [groups, setGroups] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchGroups(){
      try {
        const res = await fetch("http://localhost:3000/api/v1/groups/", {
          method: "GET",
          credentials: 'include',
        });
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        setGroups(json.groups);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    return { groups, error, loading, fetchGroups };

}

export function useFetchGroup(){
    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchGroup(groupId){
        try{
          const res = await fetch(`http://localhost:3000/api/v1/groups/${groupId}/`, {
            method: "GET",
            credentials: 'include',
          });
          if(!res.ok) throw new Error(res.status);
          const json = await res.json();
          setGroup(json.group);
        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
    }

    return { group, error, loading, fetchGroup }
}

export async function joinGroup(groupId, userId){
    try{
      const res = await fetch("http://localhost:3000/api/v1/groups/join", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          userId: userId,
        }),
      });

      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      return json.message;

    }catch(err){
      throw err;
    }
}

export async function leaveGroup(groupId, userId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/groups/${groupId}/leave`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      return json.message;

    }catch(err){
      throw err;
    }
}


export async function sendPrivateMessage(text, senderId, recipientId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/${recipientId}/messages/new`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          senderId: senderId,
        }),
      });

      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}

export async function sendGroupMessage(text, senderId, groupId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/groups/${groupId}/messages/new`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          senderId: senderId,
          groupId: groupId,
        }),
      });

      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }
}


export function useGetPrivateMessage(){
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPrivateMessage(userId){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/friends/${userId}/messages`, {
        method: "GET",
        credentials: "include",
      });
      if(!res.ok) throw new Error(res.status);
      const json = await res.json();
      setMessages(json.messages);
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }
  }

  return { messages, error, loading, getPrivateMessage };
}

export async function addFriend(userId, friendId){
    try{
        const res = await fetch(`http://localhost:3000/api/v1/friends/add`, {
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
        credentials: "include",
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


export function useGetAllUsers(){
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getAllUsers(){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/profiles/all`, {
        method: "GET",
        credentials: "include",
      });
      if(!res.ok) throw new Error(res.status);

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

export async function updateProfile(formData){
    try{
      const res = await fetch(`http://localhost:3000/api/v1/profiles/update`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      return json;
    }catch(err){
      throw err;
    }   
}

export async function hydrateUser(){
    try{
        const res = await fetch(`http://localhost:3000/api/v1/profiles/hydrate`, {
          method: "GET",
          credentials: "include",
        });

        if(res.status === 401) throw new Error("Unauthorized");
        if(!res.ok) throw new Error(res.status);

        const json = await res.json();
        return json.user;
    }catch(err){
        throw err;
    }
}

