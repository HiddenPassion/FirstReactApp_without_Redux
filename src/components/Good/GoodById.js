import React, { Component } from 'react';
import axios from '../../axios';

import classes from './Good.css';

class GoodById extends Component {
state = {
	product: {},
//	cartProducts: [],
}

componentWillMount() {
	axios.get(`/get-selectedProductById/${this.props.match.params.id}`)
			.then(res => {
				console.log(res.data);
				this.setState({ product: res.data });
			})
			.catch(err => console.log('Error(fetching cart)'));
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

export default GoodById;