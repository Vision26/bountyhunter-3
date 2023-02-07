import React, { useState } from "react"
import "../App.css"
import AddMovieForm from "./AddMovieForm"

function Movies(props) {
    const { title, description, imgUrl, genre, _id, edit, deleteMov} = props
    const [editToggle, setEditToggle] = useState(false)
    return (
        <div className="movie">
            {!editToggle ?
                <>
                    <h1>Title: {title}</h1>
                    <h4>Genre: {genre}</h4>
                    <button className="delete-btn" onClick={() => deleteMov(_id)}>Delete</button>
                    <button 
                    className="edit-btn"
                    onClick={() => setEditToggle(prevEditToggle => !prevEditToggle)}
                    >Edit</button>
                </>
                :
                <>
                <AddMovieForm
                    title={title}
                    genre={genre}
                    btnText="Submit Edit"
                    id={_id}
                    submit={edit}
                    />
                    <button
                    onClick={() => setEditToggle(prevToggle => !prevToggle)}
                    >Close</button>
                    </>
            }
        </div>
    )
}

export default Movies