import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



const UpdateRecipe = (props) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [recipeUrlName, setRecipeUrlName] = useState('');
    const [recipeComments, setRecipeComments] = useState('');
    const [recipeSummary, setRecipeSummary] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');

    const {id} = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/one/${id}`)
        .then((res) => {
            console.log(res)
            console.log(res.data)
            setRecipeName(res.data.recipeName)
            setRecipeImage(res.data.recipeImage)
            setRecipeUrl(res.data.recipeUrl)
            setRecipeUrlName(res.data.recipeUrlName)
            setRecipeComments(res.data.recipeComments)
            setRecipeSummary(res.data.recipeSummary)
            setRecipeInstructions(res.data.recipeInstructions)
        })
        .catch((err) => console.log(err.data));
    }, [id]);

    const updateRecipeHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/recipe/update/${id}`, {
            recipeName,
            recipeImage,
            recipeUrl,
            recipeUrlName,
            recipeComments,
            recipeSummary,
            recipeInstructions,
        })
        .then((res) => {
            console.log(res)
            console.log(res.data)
            alert('This recipe has been updated')
            // navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container style={{paddingBottom:50}}>
            <h1 style={{marginBottom: 40}}>Update Recipe</h1>
            <Row>
                <Col md={4} style={{marginBottom: 30}}>
                    <Card>
                    <Card.Img variant="top" src={recipeImage} />
                    <Card.Body>
                        <Card.Title>{recipeName}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <a href={recipeUrl}>Full Recipe at {recipeUrlName}</a>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={updateRecipeHandler}>
                    <Row>
                        <Form.Group style={{width:300}} className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control name='recipeName' value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>                        
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as="textarea" rows={3} name='recipeComments' value={recipeComments} onChange={(e) => setRecipeComments(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control as="textarea" rows={5} name='recipeSummary' value={recipeSummary} onChange={(e) => setRecipeSummary(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control as="textarea" rows={3} name='recipeInstructions' value={recipeInstructions} onChange={(e) => setRecipeInstructions(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <button className="btn btn-primary mt-3" type='submit'>Save Recipe</button>
                </Form>
            </Row>
        </Container>
    )
}

export default UpdateRecipe;