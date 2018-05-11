import React from 'react';
import Aux from '../../hoc/Auxiliary/Aux';
import classes from './GoodSearchResult.css';

const goodsSearchResult = (props) => {
	console.log(props.product.URL);
	return (
		<Aux>
			<div className={classes.Result} onClick={props.clicked}>
				<img src={props.product.URL} alt={props.product.name}/>
				<p>{props.product.name}</p>
			</div>
	</Aux>
);
};

export default goodsSearchResult;