import React from 'react';

import NavigationItems from './NavigationItems/NavigationItems';
import classes from './Header.css';
const header = (props) => (
	<header className={classes.Header}>
		<div className={classes.Name}>
			<h1 >Header</h1>
		</div>
		<nav className={classes.Navbar}>
			<NavigationItems />
		</nav>
	</header>
);

export default header;