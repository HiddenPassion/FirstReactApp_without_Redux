import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Page from '../Page/Page';
//import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AboutPage from '../../components/AboutPage/AboutPage';
import CartPage from '../CartPage/CartPage';
import Good from '../../components/Good/Good';
import GoodByID from '../../components/Good/GoodById';
import classes from './MainPage.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'



class MainPage extends Component {
	render() {
		return (			
			<div className={classes.MainPage}>
			<Toolbar />
			<main className={classes.MainContent}>
			<Switch>
				<Route path='/about' exact component={AboutPage} />
				<Route path='/cart' exact component={CartPage} />
				<Route path='/selectedProduct' exact component={Good} />
				<Route path='/selectedProduct/:id' component={GoodByID} />
				<Route path='/' component={Page} />
				<Route render={() => <h1>Error 404 - Page Not Found!</h1>}/>
			</Switch>			
			</main>
			<Footer />
			</ div>
		);
	}
}

export default MainPage;