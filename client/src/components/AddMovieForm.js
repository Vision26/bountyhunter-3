import React, { useState } from "react"
import "../App.css"

function AddMovieForm(props) {
    const { submit } = props
    const inputs = {
        title: props.title || "",
        description: "",
        imgUrl: "",
        genre: props.genre || ""
    }
    const [state, setInputs] = useState(inputs)

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        submit(state, props.id)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={ state.title }
                    onChange={handleChange}
                />
                
                {/* <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={ state.description }
                    onChange={handleChange}
                />
                 <br/>
                <input
                    type="text"
                    placeholder="imgUrl"
                    name="imgUrl"
                    value={ state.imgUrl }
                    onChange={handleChange}
                />
                 <br/> */}
                <input
                    type="text"
                    placeholder="Type"
                    name="genre"
                    value={ state.genre }
                    onChange={handleChange}
                />
                <button>{props.btnText}</button>
            </form>
        </div>
    )
}

export default AddMovieForm 