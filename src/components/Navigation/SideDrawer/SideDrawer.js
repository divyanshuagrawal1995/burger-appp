import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css'
import NavigationItems from '../Navigationitems/Navigationitems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const sideDrawer=( props )=>{
    let attachedClasses=[classes.SideDrawer,classes.Close]
    if(props.open)
    {
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return (
        <Auxiliary>
         <Backdrop show={props.open} clicked={props.closed} />
    <div className={attachedClasses.join(' ')} onClick={props.closed} >
            <div className={classes.Logo}>
               <Logo />
         </div>
         <nav>
             <NavigationItems isAuthenticated={props.isAuth}/>
         </nav>
</div>
        </Auxiliary>
        
    );

};
export default sideDrawer;