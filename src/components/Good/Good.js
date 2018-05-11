import React, { Component } from 'react';
import axios from '../../axios';

import classes from './Good.css';

class Good extends Component {
state = {
	product: null,
	cartProducts: [],
}

componentWillMount() {	
	const query = new URLSearchParams(this.props.location.search);
	const product = {};
	for (let param of query.entries()) {
		product[param[0]] = param[1];
	}
/*
	axios.get('/get-cart')
			.then(res => {
				this.setState({ cartProducts: res.data });
			})
			.catch(err => console.log('Error(fetching cart)'));
*/
	this.setState( {
		product: product,
	} );
}
	


addToCartHandler = () => {	
			axios.patch('/add-to-cart', {ID: this.state.product.ID})
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
}
		
render() {
	

	return (
		<div >
			<div className={classes.Good}>
				<h1>{this.state.product.name}</h1>
				<img src={this.state.product.URL} alt={this.state.product.name} />
				<p>{this.state.product.description}</p>
			</div>
			<button 
				className={[classes.Button, classes.Success].join(' ')}
				onClick={() => this.addToCartHandler()}>Add To Cart</button>
		</div>
	);
}
	
}

export default Good;