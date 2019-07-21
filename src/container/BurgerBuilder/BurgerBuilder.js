import React,{Component} from 'react';
import axios from '../../axiosorders';

import  * as actions from '../../store/actions/index';
import{connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modals/Modals';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component{
    //constructor(props){
       // super(props);
    //}
    state={
        purchasing:false,
       
    }
   componentDidMount(){
       
    this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum >0;
    }
    
    purchaseHandler=()=>{
        if(this.props.isAuthenticated)
        {
        this.setState({purchasing:true})
        }else{
            this.props.onsetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }

    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
       /* */
       this.props.onInitPurchase()
        
        this.props.history.push('/Checkout')
            
        
    }
    render() {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;
       
        let burger=this.props.error?<p style={{textAlign:'center'}}>Ingredient can't load</p>:<Spinner/>;
        if(this.props.ings)
        {
            burger=(
             <Auxiliary>  
                <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientAdded={this.props.oningredientsAdded}
            ingredientRemoved={this.props.oningredientsRemoved}
            disabled={disabledInfo}
            purchase={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}   
            isAuth={this.props.isAuthenticated}  />
          </Auxiliary>  

            );
           orderSummary= <OrderSummary ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price}/>;
        }
       
        return (<Auxiliary>
            <Modal show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
            {burger}

        </Auxiliary>);
    }
}
const mapStatetoProps=state=>{
    return{ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !==null

    }
}
const mapDispatchToProps=dispatch=>{
    return{
        oningredientsAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        oningredientsRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));