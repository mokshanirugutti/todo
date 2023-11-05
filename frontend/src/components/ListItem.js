import React from 'react'
import { Link } from 'react-router-dom'

let getdate = (note) =>{
  return new Date(note.updated).toLocaleDateString()
}
let getTitle = (note )=>{
  let title = note.body.split('\n')[0]
  if(title.length > 10) {
    title.slice(0,10)
  }
  return title 
}

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}> 
    <div className='notes-list-item'>
      
        <h3>{getTitle(note)}</h3>
        <p><span>{getdate(note)}</span></p>
    </div>
    </Link>
  )
}

export default ListItem