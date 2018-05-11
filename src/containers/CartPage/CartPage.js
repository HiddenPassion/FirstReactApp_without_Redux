import React, { Component } from 'react';

import Cart from '../../components/Cart/Cart';
import axios from '../../axios';
import classes from './CartPage.css';

class CartPage extends Component {
	state = {
		cartProducts: [],
		clicked: false,
	};
	
	loadData() {
		axios.get('/get-cart')
			.then(res => {
				this.setState({ cartProducts: res.data });
			})
			.catch(err => console.log('Error(fetching cart)'));
	}

	componentDidMount() {
		this.loadData();
	}
	
	removeFromCartHandler = (id) => {
		axios.patch('/remove-from-cart', {ID: id})
			.then(res => {
				this.loadData();
				console.log(res.body)
			})
			.catch(err => console.log(err));
	}

	render() {
		const cartProducts = this.state.cartProducts.map( product => (
			<Cart
				key={product.ID}
				name={product.name}
				count={product.count} 
				clicked={() => this.removeFromCartHandler(product.ID)}/>
		))
		return (
			<div className={classes.CartPage}>
				<h1>Корзина</h1>
				<div className={classes.Carts}>
					{cartProducts}
				</div>
			</div>
		);
	}
}

export default CartPage;