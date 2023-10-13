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
import DailyMealPlan from './showDailyMealPlan';
import WeeklyMealPlan from './showWeeklyMealPlan';






const MealPlan = (props) => {

    const [show, setShow] = useState(false);


    const dailyMealClick = (e) => {
        setShow('daily')
    }
 
    const weeklyMealClick = (e) => {
        setShow('weekly')
    }

    return (
        <>
    <h1>Meal Plans</h1>
        <Container style={{marginBottom: 50 }}>
            <Row style={{marginBottom: 50 }}>
                <Col>
                    <Button style={{marginRight: 30}} onClick={dailyMealClick}>Create a Daily Meal Plan</Button>
                    <Button  onClick={weeklyMealClick}>Create a Weekly Plan</Button>
                </Col>
            </Row>
            <Row>
                <h1>Coming Soon</h1>
                {/* {
                (show === 'daily') ? <DailyMealPlan /> : null
                }
                {
                (show === 'weekly') ? <WeeklyMealPlan /> : null
                } */}
            </Row>
        </Container>
        </>
    ) 
}

export default MealPlan