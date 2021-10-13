import React from "react";
import { isAuthenticated } from "../services/auth";
import { BrowserRouter, Route, Switch, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Home from "../pages/Home";

// Private Route
export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
    if (!component) {
        throw Error("Component is Undefined");
    }

    // Component 
    const Component = component;

    // Render  
    const render = (props: RouteComponentProps<any>): React.ReactNode => {
        if (isAuthenticated()) {
            return (
                
                <div>
                    <Component {...props} />
                </div>
            )
        }

        
        return (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
    };

    
    return (<Route {...rest} render={render} />);
}


 
const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* Login */}
            <Route path="/login" component={Login} />
          
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />

            {/* Not Found */}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;