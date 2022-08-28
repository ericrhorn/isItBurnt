import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';




const Dashboard = (props) => {
    const [recipeList, setRecipeList] = useState([]);
    // const {id} = useParams;
    const {userName} = useParams();
    console.log('username is', userName)

    // const {userName} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/my-recipies/${userName}`, 
        {withCredentials: true}
        )
        .then((res) => {
            console.log("what is", res)
            console.log("data - ", res.data)
            setRecipeList(res.data);
        })
        .catch((err) => console.log(err.data));
    }, []);


    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/recipe/show")
    //     .then((res) => {
    //         console.log(res)
    //         console.log(res.data)
    //         setRecipeList(res.data);
    //     })
    //     .catch((err) => console.log(err.data));
    // }, []);

    const deleteHandler = (id) => {
        axios
          .delete(`http://localhost:8000/api/recipe/delete/${id}`)
          .then((res) => {
            console.log(res.data)
            setRecipeList(recipeList.filter((recipe) => recipe._id !== id))
            })
            
          .catch((err) => console.log(err.data));
      };

    return (
        <Container>
            <h1 style={{marginBottom: 40}}>My Saved Recipes</h1>
            <Row>
                {recipeList.map((recipe, idx) => (
                    <Col key={idx} md={4} style={{marginBottom: 30}}>
                        <Card>
                        <Card.Img variant="top" src={recipe.recipeImage} />
                        <Card.Body>
                            <Card.Title>{recipe.recipeName}</Card.Title>
                            <Card.Text>
                            {/* {recipe.id} */}
                            </Card.Text>
                            <a href={recipe.recipeUrl}>Full Recipe at {recipe.recipeUrlName}</a>
                        </Card.Body>
                        <div>
                            <div className="text-center">
                                <Link to={`/one-recipe/${recipe._id}`}>
                                <button className="btn btn-outline-primary btn-sm mb-2" style={{width:100}} >Full Recipe</button>
                                </Link>
                                <Link to={`/update/${recipe._id}`}>
                                <button className="btn btn-outline-success btn-sm mb-2" style={{width:100}} >Edit</button>
                                </Link>
                                <button className="btn btn-outline-danger btn-sm mb-2" style={{width:100}} onClick={() => deleteHandler(recipe._id)}>Delete</button>
                            </div>
                        </div>
                    </Card>
                    </Col>  
                    ))}
            </Row>
        </Container>
    )
}

export default Dashboard;