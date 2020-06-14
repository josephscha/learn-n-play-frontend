import React from 'react';


const ReadingSpellingForm = props => {

    const {problem, answer, image, changeHandler, addToQuestions, type} = props;
        return (
            <form className="group-form" onChange={changeHandler}>
                <label htmlFor="problem">Problem:</label>
                <input autoFocus={true} type="text" name="problem" value={problem} placeholder={type === "SpellingProblem" ? "Example: a _ _ _ e" : null}/>
                <label htmlFor="answer">Description:</label>
                <input type="text" name="answer" value={answer} placeholder={type === "SpellingProblem" ? "Example: apple" : null}/>
                <label htmlFor="image">Upload image</label>
                <input type="file" name="image"/>
                <input className="r-btn" type="submit" onClick={(event)=> addToQuestions(event)}/>
            </form> 
        )
}
  
export default ReadingSpellingForm;