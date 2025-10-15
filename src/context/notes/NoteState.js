import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    
  ];

  const [notes, setNotes] = useState(notesInitial);
  //get notes
const getNotes = async() => {
    //api callx
  const responce = await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem("token")
    },
    
  });
  const json = await responce.json();
    console.log(json);
    setNotes(json)
    
  };
  // ✅ Define addNote function properly
  const addNote = async(title, description, tag) => {
    //api call
  const responce = await fetch(`${host}/api/notes/addnote`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem("token")
    },
    body:JSON.stringify({title,description,tag})
  });
 const json = await responce.json();
setNotes(notes.concat(json));
    const newNote = json;
    setNotes(notes.concat(newNote));
  };
   // delete Notes
  const deleteNote = async(id)=>{
    const responce = await fetch(`${host}/api/notes/deleteNote/${id}`,{
    method: 'DELETE',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem("token")
    },
   
  });
  const json = await responce.json();
    console.log(json);
    const newNotes  = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes )
  }
 // edit notes
 const editNote = async(id,title,description,tag)=>{
  //api call
  const responce = await fetch(`${host}/api/notes/updateNote/${id}`,{
    method: 'PUT',
    headers:{
      'Content-Type':'application/json',
      "auth-token":localStorage.getItem("token")
    },
    body:JSON.stringify({title,description,tag})
  });
  const json = await responce.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id===id)
    {
      newNotes[index] = title;
      newNotes[index] = description;
      newNotes[index] = tag;
      break;
    }
    
  }
  setNotes(newNotes);
}
  return (
    <NoteContext.Provider value={{  notes, addNote, deleteNote, getNotes, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
