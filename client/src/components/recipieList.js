import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import SearchRes from '../views/searchRes';


const RecipeList = ({recipe, props}) => {


    const [recipeInfo, setRecipeInfo] = useState({});
    // const [recipeInfo, setRecipeInfo] = useState([]);

    useEffect (() => {
        axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=a204b3541d2f4c0da0e019afe998f3c6`)
        .then((response)=>{
            console.log(response.data)
            setRecipeInfo(response.data)
        })
        .catch((err) => console.log(err))
    }, [recipe.id]);

    return (
        <>
        <Col md={6}>
            <SearchRes recipe={recipe} recipeInfo={recipeInfo}/>
        </Col>
        </>
    )

}

export default RecipeList;