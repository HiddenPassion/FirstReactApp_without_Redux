import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact>Главная</NavigationItem>
		<NavigationItem link='/cart' exact>Корзина</NavigationItem>
		<NavigationItem link='/about' exact>О Компании</NavigationItem>
	</ul>
);

export default navigationItems;