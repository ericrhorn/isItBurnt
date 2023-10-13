import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import RecipeList from '../components/recipieList';
import 'bootstrap/dist/css/bootstrap.min.css';


const Recipie = (props) => {


    const cuisineOptions = [
        {value :'African', text :'African'},
        {value :'American', text :'American'},
        {value :'British', text :'British'},
        {value : 'Cajun', text : 'Cajun'},
        {value : 'Caribbean', text : 'Caribbean'},
        {value : 'Chinese', text : 'Chinese'},
        {value : 'Eastern European', text: 'Eastern European'},
        {value : 'European', text : 'European'},
        {value : 'French', text : 'French'},
        {value :'German', text :'German'},
        {value : 'Greek', text : 'Greek'},
        {value :'Indian', text :'Indian'},
        {value :'Irish', text :'Irish'},
        {value :'Italian', text :'Italian'},
        {value :'Japanese', text :'Japanese'},
        {value :'Jewish', text :'Jewish'},
        {value :'Korean', text :'Korean'},
        {value :'Latin American', text :'Latin American'},
        {value :'Mediterranean', text :'Mediterranean'},
        {value : 'Mexican', text : 'Mexican'},
        {value : 'Middle Eastern',  text : 'Middle Eastern'},
        {value : 'Nordic', text : 'Nordic'},
        {value :'Southern', text :'Southern'},
        {value :'Spanish', text :'Spanish'},
        {value :'Thai', text:'Thai'},
        {value :'Vietnamese', text :'Vietnamese'}
    ]

    const resultOptions = [
        {value : '1', text : '1'},
        {value : '5', text : '5'},
        {value : '10', text : '10'},
        {value : '20', text : '20'},
        {value : '30', text : '30'},
        {value : '40', text : '40'},
        {value : '50', text : '50'},
    ]

    
const [recipeData, setRecipeData] = useState([]);
const [numberOfResults, setNumberOfResults] = useState('');
const [cuisine, setCuisine] = useState('');

const handleCuisineChange = (e) => {
    console.log(e.target.value)
    setCuisine(e.target.value)
}
const handleNumChange = (e) => {
    console.log(e.target.value)
    setNumberOfResults(e.target.value)
}

const getMealData = (e) => {
    e.preventDefault();
    return axios
    .get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=a204b3541d2f4c0da0e019afe998f3c6&query=${cuisine}&number=${numberOfResults}`)
    .then((response) => {
        console.log(response.data.results);
        setRecipeData(response.data.results)
    })
    .catch((err) => console.log(err));
}

    return (
        <>
        <h1>Recipies</h1>
        <Container>
            <Row>
                <Col lg={3} style={{marginBottom:10}}>
                    <Form>
                        <Form.Select value={cuisine} onChange={handleCuisineChange}>
                            <option>Cuisine</option>
                            {cuisineOptions.map(option => 
                                <option key={option.value} value={option.value}>{option.text}</option>
                            )}
                        </Form.Select>
                        <br />
                        <Form.Select value={numberOfResults} onChange={handleNumChange}>
                            <option>Numner of Results</option>
                            {resultOptions.map(index => 
                                <option key={index.value} value={index.value}>{index.text}</option>
                            )}
                        </Form.Select>
                        <br />
                    </Form>
                    <Button onClick={getMealData} variant="primary" type="submit">
                            Submit
                    </Button>
                </Col>
                <Col lg={9} style={{marginBottom:50}}>
                    <Row className="g-4">
                        {recipeData.map((recipe) => (
                            <RecipeList key={recipe.id} recipe={recipe}/>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Recipie