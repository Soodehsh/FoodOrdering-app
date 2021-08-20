import React from 'react';
import { Fragment } from 'react';
import MealsImage from '../../assets/Meal.jpg';
import Classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = props =>{
    return <Fragment>
        <header className={Classes.header}>
            <h1>Mealish</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={Classes['main-image']}>
            <img src={MealsImage} alt='delicious food!' />
        </div>
    </Fragment> 
};
export default Header;