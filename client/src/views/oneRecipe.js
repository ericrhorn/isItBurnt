import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';




const OneRecipe = (props) => {
    // const [recipeName, setRecipeName] = useState([]);
    const [recipe, setRecipe] = useState({
        recipeName : '',
        recipeImage : '',
        recipeUrl : '',
        recipeUrlName : '',
        recipeComments : '',
        recipeSummary : '',
        recipeInstructions : '',
    });
    const {id} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/one/${id}`)
        .then((res) => {
            console.log(res)
            console.log(res.data)
            setRecipe(res.data)
        })
        .catch((err) => console.log(err.data));
    }, [id]);

    const summary = recipe.recipeSummary

    const prettySummary = () => {
        return { __html: summary }
    }
    const instructions = recipe.recipeInstructions

    const prettyInstructions = () => {
        return { __html: instructions }
    }

    return (
        <Container>
            <h1 style={{marginBottom: 40}}>{recipe.recipeName}</h1>
            <Row>
                <Col md={4} style={{marginBottom: 30}}>
                    <Card>
                    <Card.Img variant="top" src={recipe.recipeImage} />
                    <Card.Body>
                        <Card.Title>{recipe.recipeName}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <a href={recipe.recipeUrl}>Full Recipe at {recipe.recipeUrlName}</a>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4} style={{marginBottom: 30}}>
                    <Card>
                    <Card.Body>
                    <Card.Title>Recipe Comments</Card.Title>
                        <Card.Text>
                            {recipe.recipeComments}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <div style={{marginBottom:50}}>
                    <h4>Summary</h4>
                    <div dangerouslySetInnerHTML={prettySummary()}/>
                </div>
                <div style={{marginBottom:50}}>
                <h4>Instructions</h4>
                    <div dangerouslySetInnerHTML={prettyInstructions()}/>
                </div>
            </Row>
        </Container>
    )
}

export default OneRecipe;