import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'

class AddClient extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: ''
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = (e) => {
		e.preventDefault()

		const newClient = this.state 

		const { firestore, history } = this.props

		//If no balance make zero
		if(newClient.balance === '') {
			newClient.balance = 0;
		}

		firestore.add({ collection: 'clients' }, newClient)
		.then(() => history.push('/'))
	}

  render() {
	const { disableBalanceOnAdd } = this.props.settings

	 return (
		<div>
		  <div className="row">
			  <div className="col-md-6">
					<Link to="/" className="btn btn-link">
						<i className="fas fa-arrow-circle-left"></i> Back to Dashboard
					</Link>
			  </div>
		  </div>

		  <div className="card">
			  <div className="card-header">Add Client</div>
			  <div className="card-body">
				  <form onSubmit={this.onSubmit}>
					  <div className="form-group">
						  <label htmlFor="firstName">First Name</label>
						  <input type="text"
						  name="firstName"
						  minLength="2"
						  required 
						  onChange={this.onChange}
							value={this.state.firstName}
						  className="form-control"/>
					  </div>

					  <div className="form-group">
						  <label htmlFor="lastName">Last Name</label>
						  <input type="text"
						  name="lastName"
						  minLength="2"
						  required 
						  onChange={this.onChange}
							value={this.state.lastName}
						  className="form-control"/>
					  </div>

					  <div className="form-group">
						  <label htmlFor="email">Email</label>
						  <input type="email"
						  name="email"
						  required 
						  onChange={this.onChange}
							value={this.state.email}
						  className="form-control"/>
					  </div>

					  <div className="form-group">
						  <label htmlFor="phone">Phone</label>
						  <input type="text"
						  name="phone"
						  minLength="10"
						  required 
						  onChange={this.onChange}
							value={this.state.phone}
						  className="form-control"/>
					  </div>

					  <div className="form-group">
						  <label htmlFor="balance">Balance</label>
						  <input type="text"
						  name="balance"
						  onChange={this.onChange}
							value={this.state.balance}
						  className="form-control"
							disabled={disableBalanceOnAdd}
						  />
					  </div>


					  <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
				  </form>
			  </div>
		  </div>
		</div>
	 )
  }
}

AddClient.propTypes = {
	firestore: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired
}


export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		settings: state.settings
	}))
)(AddClient)