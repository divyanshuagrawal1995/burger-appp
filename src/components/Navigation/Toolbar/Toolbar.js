import React from 'react';
import DrawToggler from '../SideDrawer/DrawToggler/DrawToggler'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.css'
import NavigationItems from '../Navigationitems/Navigationitems';
const toolbar =(props)=>(
    <header className={classes.Toolbar}>
        <DrawToggler clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
    <Logo  />
    </div>
    
    <nav className={classes.DesktopOnly}>
    <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
    </header>
    

);
export default toolbar;

