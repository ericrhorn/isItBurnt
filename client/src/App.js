import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './views/main';
import LoginUser from "./components/login";
import RegisterUser from "./components/register";
import Header from './views/header';
import Recipies from './components/recipies';
import MealPlan from './views/mealPlan';
import Dashboard from './views/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateRecipe from './views/updateRecipe';
import OneRecipe from './views/oneRecipe';
import DailyMealPlan from './views/showDailyMealPlan';
import WeeklyMealPlan from './views/showWeeklyMealPlan';


function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);



  return (
    <>
    <BrowserRouter>
      <div>
        <Header isLoggedin = {isLoggedin} setIsLoggedin = {setIsLoggedin}/>
      </div>
      <div className='container' style={{marginTop: 100}}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/recipies' element={<Recipies />} />
          <Route path='/meal_plan' element={<MealPlan />} />
          <Route path='/daily' element={<DailyMealPlan />} />
          <Route path='/weekly' element={<WeeklyMealPlan />} />
          <Route path='/dashboard/:userName' element={<Dashboard />} />
          <Route path='/update/:id' element={<UpdateRecipe />} />
          <Route path='/one-recipe/:id' element={<OneRecipe />} />
          <Route path='/login' element={<LoginUser setIsLoggedin = {setIsLoggedin}/>} />
          <Route path='/register' element={<RegisterUser setIsLoggedin = {setIsLoggedin}/>} />
        </Routes>
      </div>

    </BrowserRouter>
    {/* <div>
      <Header/>
    </div>
    <div className='container' style={{marginTop: 100}}>
      <div>
        <Router>
          <Main path = '/'/>
          <LoginUser path = '/login' isLoggedin = {isLoggedin} setIsLoggedin = {setIsLoggedin}/>
          <RegisterUser path = '/register' isLoggedin = {isLoggedin} setIsLoggedin = {setIsLoggedin}/>
          <Recipies path = '/recipies'/>
          <MealPlan path = '/meal_plan'/>
        </Router>
      </div>
    </div> */}
    </>

  );
}

export default App;
