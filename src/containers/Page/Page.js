import React, { Component } from 'react';

import GoodsSearch from '../../components/GoodsSearch/GoodsSearch';
import GoodsSearchResult from '../../components/GoodsSearchResult/GoodsSearchResult';
//import Good from '../../components/Good/Good';
//import Aux from '../../hoc/Auxiliary/Aux';
//import Cart from '../../components/Cart/Cart';
import classes from './Page.css';
//import IMG from '../../assets/images/img1.png';
import axios from '../../axios';


class Page extends Component {
	state = {
		allProducts: [],
		selectedProduct: '',
		selectedProductId: '',
		filteredProducts: [],
		cartProducts: [],
		value: '',

	}

	filterProduct = (value) => {
		const updatedFilteredProducts = [];
		const allProducts = [...this.state.allProducts];		
		allProducts.map(product => {
			return {...allProducts[product]};
		});

		for (let product of allProducts) {			
			if(product.name.indexOf(value) >= 0) {			
				updatedFilteredProducts.push(product);
			}		
		}
		
		this.setState( {
			filteredProducts: updatedFilteredProducts,
		} );
	}

	inputChangedHandler = (event) => {	 
	 this.filterProduct(event.target.value);
	 this.setState( {
		 value: event.target.value,
	 } );
	}

	goodClickedHandler = (id) => {		
		let selectedProduct = this.state.allProducts.filter(p => {		
			return p.ID === id;
		});
		selectedProduct = {...selectedProduct[0]}
		
		const queryParams = [];
		for (let i in selectedProduct) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(selectedProduct[i]));
		}
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: this.props.match.path + 'selectedProduct',
			search: '?' + queryString,
		});
		
		/*this.setState( {
			selectedProduct: selectedProduct,
			selectedProductId: id,
		} );*/
	}

	comebackToMainPageHandler = () => {		
		this.setState( {
			selectedProduct: '',
			selectedProductId: '',
		} );
	}

	addToCartHandler = (id) => {		
		const cartProducts = [...this.state.cartProducts];		
		cartProducts.map(product => {
			return {...cartProducts[product]};
		});		

		let tempCart = {};
		let IsAdded = false;

		if (Object.keys(cartProducts).length === 0) {
			for (let p of this.state.allProducts) {
				if(p.ID === id) {	
					tempCart = {...p};
					tempCart.count = 1;
					cartProducts.push(tempCart);		
				}
			}
		} else {
			for (let cart of cartProducts) {
				if (cart.ID === id) {
					IsAdded = true;				
					cart.count++;				
					break;
				}
			}

			if (!IsAdded) {
				for (let p of this.state.allProducts) {					
					if(p.ID === id) {	
						tempCart = {...p};
						tempCart.count = 1;
						cartProducts.push(tempCart);		
					}
				}
			}
		}	

		this.setState( {
			cartProducts: cartProducts,
		} );		
	}

	removeFromCartHandler = (id) => {
		const updatedCartProducts = [];
	/*	const cartProducts = [...this.state.cartProducts];		
		cartProducts.map(product => {
			return {...cartProducts[product]};
		});*/

		let tempCart = {};
 
		for (let product of this.state.cartProducts) {	
				tempCart = {...product};

				if (product.ID === id) {					
					tempCart.count--;					

					if ( tempCart.count !== 0) {
						updatedCartProducts.push({...tempCart});	
					}

				} else {
					updatedCartProducts.push({...tempCart});
				}
		}	

		this.setState( {
			cartProducts: updatedCartProducts,
		} );		
	}

	componentDidMount() {

		axios.get('get-allproducts')
			.then(res => {
				//console.log(res.data);
				this.setState( { 
					allProducts: res.data,
					filteredProducts: res.data } ) ;
				console.log(this.state.allProducts)
			})
			.catch(err => {
				console.log('Error');
				//this.setState( { error: false });
			});

/*
		const allProducts = [...this.state.allProducts];		
		allProducts.map(product => {
			return {...allProducts[product]};
		});
		this.setState( {
			filteredProducts: allProducts,
		})*/
	}

	render() {

		const filtered = this.state.filteredProducts.map(product => {	
			return (
				<GoodsSearchResult 
					key={product.ID || Math.random()}
					product={product}
					clicked={() => this.goodClickedHandler(product.ID)} />
			);
		});

		/*const cart = this.state.cartProducts.map( product => {
			return (
				<Cart 
					key={product.ID || Math.random()}
					product={product}
						clicked={() => this.removeFromCartHandler(product.ID)} />
			);
		})
*/
/*		const selectedGood = this.state.selectedProduct ? (
																	<Aux>
																	<Good 
																		product={this.state.selectedProduct} 
																		canceled={this.comebackToMainPageHandler} 
																		add={() => this.addToCartHandler(this.state.selectedProductId)}
																		remove={() => this.removeFromCartHandler(this.state.selectedProductId)}/> {cart} </Aux>) : null;*/
	/*	const output = !this.state.selectedProduct ? (
			<Aux>
				
			</Aux> ) : selectedGood;
*/
		return (
			<div className={classes.Page}>
				<GoodsSearch
					value={this.state.value} 
					changed={(event) => this.inputChangedHandler(event)} />
				<div className={classes.Filtered}>
					{filtered}
				</div>
			</div>
		);
	}
}

export default Page;