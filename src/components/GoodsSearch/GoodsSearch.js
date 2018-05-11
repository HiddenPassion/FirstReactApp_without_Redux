import React from 'react';

import classes from './GoodSearch.css';

const goodsSearch = (props) => {

	return (
		<input className={classes.InputElement}	onChange={props.changed} value={props.value}/>
	)
};

export default goodsSearch;

