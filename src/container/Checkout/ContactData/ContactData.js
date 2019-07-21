import React ,{Component} from 'react';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axiosorders';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import {updatedObject,checkValidity} from '../../../Shared/utility';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
state={
   orderForm:{
    name:{
        elementType:'input',
        elementConfig:{
            type:'text',
            placeholder:'Your Name'
        },
        value:'',
        validation:{
            required:true
        },
        valid:false,
        touched:false
    },
   
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        zipCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Zipcode'
            },
            value:'',
            validation:{
                required:true,
                minLength:5,
                 maxLength:5,
                 isNumeric:true

            },
            valid:false,
            touched:false
            
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Country'
            },
            value:'',
            validation:{
                required:true,

            },
            valid:false,
            touched:false,

        },
  
    email:{
        elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your Email'
            },
            value:'',
             validation:{
                required:true,
                isEmail:true

            },
            valid:false,
            touched:false,

    },

deliveryMethod :{
    elementType:'select',
        elementConfig: {
            options:[
                {value:'fastest',displayValue:'Fastest'},
                {value:'cheapset',displayValue:'Cheapset'}
            ]
        },
        valdidation:{},
        
        value:'fastest',
        valid:true
}

   },
    formIsValid:false,
}

orderHandler=(event)=>{
    event.preventDefault();
    const formData={}
    for(let formElementIdentifier in this.state.orderForm)
    {
        formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier]
    }
        const order={
        orderData:formData,
            ingredients:this.props.ings,
            price:this.props.price,
            userId:this.props.userId
            
        }
        this.props.onOrderBurger(order,this.props.token)
        //alert('You Continue Shopping')
     
}
changedHandler=(event,inputIdentifier)=>{
   
    const updatedFormElement= updatedObject(this.state.orderForm[inputIdentifier],{
        value:event.target.value,
        valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
        touched:true
    });
    const updatedForm=updatedObject(this.state.orderForm,{
        [inputIdentifier]:updatedFormElement
    })
   
     let formIsValid=true;
     for(let inputIdentifier in updatedForm)
     {
         formIsValid=updatedForm[inputIdentifier].valid && formIsValid
     }
     console.log(formIsValid);
    this.setState({orderForm:updatedForm, formIsValid:formIsValid})

}
render(){
    const formElementsArray=[];
    for(let key in this.state.orderForm)
    {
        formElementsArray.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }
    let form=(<form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement=>(
            <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.changedHandler(event,formElement.id)}
            />

        ))}
   
    
        <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        <Button btnType="Danger">CANCEL</Button>

                       
    </form>);
    if(this.props.loading)
{
    form=<Spinner />
}
    return(
        <div className={classes.ContactData}>
            <h4>Enter your contact details</h4>
            
         {form}
        </div>

    )
}
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
};
const mapDispatchToprops=dispatch=>{
    return{
    onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler( ContactData,axios));