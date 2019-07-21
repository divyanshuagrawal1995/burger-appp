import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../Shared/utility'
const initialState={
    ingredients:null,
        
    building:false,
    totalPrice:4
};
const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
const addIngredient=(state,action)=>{
    const updatedIngredient={  [action.ingredientName]:state.ingredients[action.ingredientName] + 1}
        const updatedIngredients=updatedObject(state.ingredients,updatedIngredient)
        const updatedState={
            ingredients:updatedIngredients,
            totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building:true

        }
        return updatedObject(state,updatedState)

}
const removeIngredient=(state,action)=>{
    const updatedIng={  [action.ingredientName]:state.ingredients[action.ingredientName] -1}
            const updatedIngs=updatedObject(state.ingredients,updatedIng)
            const updatedSt={
                ingredients:updatedIngs,
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
    
            }
            return updatedObject(state,updatedSt)

}
const setIngredient=(state,action)=>{
    return updatedObject(state,{
        ingredients:{
            salad:action.ingredients.salad,
        bacon:action.ingredients.bacon,
    cheese:action.ingredients.cheese,
meat:action.ingredients.meat
},
    error:false,
    totalPrice:4,
    building:false
})
        
}
const fetchedIngredients=(state,action)=>{
    return updatedObject(state,{error:true})

}
const burgerBuilderReducer=(state=initialState,action)=>{
switch(action.type)
{
    case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)
     case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action)
    case actionTypes.SET_INGRDIENT:return setIngredient(state,action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchedIngredients(state,action)   
    default:
        return state;
};
}

export default burgerBuilderReducer;