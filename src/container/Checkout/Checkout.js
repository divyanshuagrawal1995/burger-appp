import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import{connect} from 'react-redux';
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
  
   
    checkoutCancelledHandler=()=>{
    this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/Checkout/contact-data')
    }
    render(){
        let summary=<Redirect to="/" />
        if(this.props.ings)
        { 
            const purchaseRedirect=this.props.purchased ?<Redirect to="/"/>:null;
            summary=(<div>
                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}/>
                <Route path={this.props.match.url + '/contact-data'}
                component={ContactData} />
            </div>);

        }
        return summary
    }
} 
const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.orders.purchased
    }
    
}

export default connect(mapStateToProps)(Checkout)