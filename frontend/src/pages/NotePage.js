import React, { useState, useEffect } from 'react';
import {  useParams,useNavigate } from 'react-router-dom';
import {ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        getNote();
      },[]);  
      
      const getNote = async () => {
        if(id === 'new') return 
        try {
          const response = await fetch(`/api/notes/${id}`);
          if (response.ok) {
            const data = await response.json();
            setNote(data);
          } else {
            console.error('Failed to fetch note data');
          }
        } catch (error) {
          console.error('Error while fetching note data:', error);
        }
      };

      let updateNote = async () => {
         fetch(`/api/notes/${id}/`, {
            method : 'PUT',
            headers : {
                'content-Type' : 'application/json' 
            },
            body:JSON.stringify(note)
        })
      }

      let createNote = async () => {
         fetch(`/api/notes/`, {
            method : 'POST',
            headers : {
                'content-Type' : 'application/json' 
            },
            body:JSON.stringify(note)
        })
      }

      let deleteNote = async () => {
        fetch(`/api/notes/${id}/` , {
          method : 'DELETE',
          'headers ' : {
            'content-Type' : 'application/json'
          }
        })
        history('/');
      }

      let handleSubmit = () => {
        if(id !=='new' && note.body === ''){
          deleteNote()
        }else if(id !== 'new'){
          updateNote()
        }else if(id === 'new' && note !== null) {
          createNote()
        }
       history('/');
      }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
              <ArrowLeft onClick={handleSubmit}/>
            </h3>
            {id !== 'new' ? (<button onClick={deleteNote}>delete</button>):
            ( <button onClick={handleSubmit} >Done</button> )
            }
            
        </div>
        <textarea onChange={(e) => {setNote({...note,'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage