import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';






const SearchRes = ({recipe, recipeInfo, value}) => {

    const [recipeName, setRecipeName] = useState(value)
    useEffect(()=> setRecipeName(recipeInfo.title), [recipeInfo.title])
    const [recipeImage, setRecipeImage] = useState(value)
    useEffect(()=> setRecipeImage(recipeInfo.image), [recipeInfo.image])
    const [recipeUrl, setRecipeUrl] = useState(value)
    useEffect(()=> setRecipeUrl(recipeInfo.sourceUrl), [recipeInfo.sourceUrl])
    const [recipeUrlName, setRecipeUrlName] = useState(value)
    useEffect(()=> setRecipeUrlName(recipeInfo.sourceName), [recipeInfo.sourceName])
    const [recipeSummary, setRecipeSummary] = useState(value)
    useEffect(()=> setRecipeSummary(recipeInfo.summary), [recipeInfo.summary])
    const [recipeInstructions, setRecipeInstructions] = useState(value)
    useEffect(()=> setRecipeInstructions(recipeInfo.instructions), [recipeInfo.instructions])

    const [recipeComments, setRecipeComments] = useState('')

    // const [recipeName, setRecipeName] = useState(recipeInfo?.title)
    // const [recipeImage, setRecipeImage] = useState(recipeInfo?.image)
    // const [recipeUrl, setRecipeUrl] = useState(recipeInfo?.sourceUrl)
    // const [recipeUrlName, setRecipeUrlName] = useState(recipeInfo.sourceName)
    // const [recipeSummary, setRecipeSummary] = useState(recipeInfo.summary)
    // const [recipeInstructions, setRecipeInstructions] = useState(recipeInfo.instructions)

    const newRecipeHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/recipe/create-recipe', {
            recipeName,
            recipeImage,
            recipeUrl,
            recipeUrlName,
            recipeComments,
            recipeSummary,
            recipeInstructions,
        }, {withCredentials: true})
        .then((res) => {
            console.log(res)
            console.log(res.data)
            alert('This recipe has been saved')
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
        <Card>
            <Card.Img variant="top" src={recipe.image} />
            <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                {/* {recipe.id} */}
                </Card.Text>
                <a href={recipeInfo.sourceUrl}>Full Recipe at {recipeInfo.sourceName}</a>
                <form onSubmit={newRecipeHandler}>
                    <div >
                        <input type="text" name='recipeName' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                        <input type="text" name='recipeImage' value={recipeImage} onChange={(e) => setRecipeImage(e.target.value)} />
                        <input type="text" name='recipeUrl' value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} />
                        <input type="text" name='recipeUrlName' value={recipeUrlName} onChange={(e) => setRecipeUrlName(e.target.value)} />
                        <textarea type="textarea" name='recipeSummary' value={recipeSummary} onChange={(e) => setRecipeSummary(e.target.value)} />
                        <textarea type="textarea" name='recipeInstructions' value={recipeInstructions} onChange={(e) => setRecipeInstructions(e.target.value)} />
                        <input type="text" name='recipeComments' value={recipeComments} onChange={(e) => setRecipeComments(e.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-3" type='submit'>Save Recipe</button>
                </form>
            </Card.Body>
        </Card>
        <br/>
        </>
    )

}

export default SearchRes;