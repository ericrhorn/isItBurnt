import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Main from '../views/main';
import {navigate} from '@gatsbyjs/reach-router'
import cookingImg from '../images/cooking.jpg'
import Image, { propTypes } from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import RecipeList from '../components/recipieList';






const WeeklyMealPlan = (props) => {

    const diet = [
        {value : 'none', text : 'none'},
        {value : 'Gluten Free', text : 'Gluten Free'},
        {value : 'Ketogenic', text : 'Ketogenic'},
        {value : 'Vegetarian', text : 'Vegetarian'},
        {value : 'Lacto-Vegetarian', text : 'Lacto-Vegetarian'},
        {value : 'Ovo-Vegetarian', text : 'Ovo-Vegetarian'},
        {value : 'Vegan', text : 'Vegan'},
        {value : 'Pescetarian', text : 'Pescetarian'},
        {value : 'Paleo', text : 'Paleo'},
        {value : 'Primal', text : 'Primal'},
        {value : 'Low FODMAP', text : 'Low FODMAP'},
        {value : 'Whole30', text : 'Whole30'},
    ]

    const calories = [
        {value : '1500', text : '1500'},
        {value : '2000', text : '2000'},
        {value : '2500', text : '2500'},
        {value : '3000', text : '3000'},
        {value : '3500', text : '3500'},
    ]

    const handleDiet = (e) => {
        console.log(e.target.value)
        setMealDiet(e.target.value)
    }
    const handleCalories = (e) => {
        console.log(e.target.value)
        setMealCalories(e.target.value)
    }

    const [mealPlanData, setMealPlanData] = useState([]);
    const [mealDiet, setMealDiet] = useState('');
    const [mealCalories, setMealCalories] = useState('');


    const getMealPlanData = (e) => {
        e.preventDefault();
        return axios
        .get(`https://api.spoonacular.com/mealplanner/generate?apiKey=a204b3541d2f4c0da0e019afe998f3c6&timeFrame=week&targetCalories=${mealCalories}&diet=${mealDiet}`)
        .then((response) => {
            console.log(response.data);
            setMealPlanData(response.data)
        })
        .catch((err) => console.log(err));
    }


    return (
        <>
        <h1>Weekly Meal Plan</h1>
        <Container>
                <Row>
                    <Col lg={3} style={{marginBottom:10}}>
                    <Form>
                        <Form.Select value={mealDiet} onChange={handleDiet}>
                            <option>Diet</option>
                            {diet.map(option => 
                                <option key={option.value} value={option.value}>{option.text}</option>
                            )}
                        </Form.Select>
                        <br />
                        <Form.Select value={mealCalories} onChange={handleCalories}>
                            <option>Calories Per Day</option>
                            {calories.map(index => 
                                <option key={index.value} value={index.value}>{index.text}</option>
                            )}
                        </Form.Select>
                        <br />
                    </Form>
                        <Button onClick={getMealPlanData} variant="primary" type="submit">
                                Submit
                        </Button>
                    </Col>
                    <Col lg={9} style={{marginBottom:50}}>
                    {/* <Row className="g-4">
                            {mealPlanData.map((mealData) => (
                                <RecipeList key={mealData.id} mealPlanData={mealData}/>
                            ))}
                        </Row> */}
                    </Col>
                </Row>
            </Container>
        </>
    ) 
}

export default WeeklyMealPlan