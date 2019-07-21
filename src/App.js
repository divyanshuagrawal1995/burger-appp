import React,{Component} from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import {connect} from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import Logout from './container/Auth/Logout/Logout'
const asyncCheckout=asyncComponent(()=>{
  return import('./container/Checkout/Checkout');
})
const asyncAuth=asyncComponent(()=>{
  return import('./container/Auth/Auth')
})
const asyncOrders=asyncComponent(()=>{
  return import('./container/Orders/Orders');
})
class App extends Component{
  
  componentDidMount()
  {
    this.props.onTryAutoSignup();
  }
  
  render(){
    let routes=(
      <Switch>
         <Route path ="/" exact component ={BurgerBuilder}/>
         <Route path="/auth" component={asyncAuth}/>

          <Redirect to="/"/>

      </Switch>

    )
    if(this.props.isAuthenticated)
    {  
      routes=(
      <Switch>
        
        <Route path="/Checkout" component={asyncCheckout}/>
          <Route path ="/orders" component ={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>

          <Route path ="/" exact component ={BurgerBuilder}/>
          <Redirect to="/" />
          
      </Switch>
      )
    }
    return (
      <div >
      <Layout>
      {routes}
      </Layout>
        
      </div>
    );

  }
}
const mapStateToProps=(state)=>{
  return{
    isAuthenticated:state.auth.token !==null
  }
}
 const mapDispatchToProps=dispatch=>{
   return {
     onTryAutoSignup:()=>dispatch(actions.authCheckState())
   }
 }


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
