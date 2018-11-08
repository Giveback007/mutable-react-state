import React = require("react");
import { Context } from "./provider";

export function connect<S, P extends Object>(mapStateToProps: (s: S) => P) {
    return (Comp: (props: P) => JSX.Element) => {
        const map = (context: S) => <Comp { ...mapStateToProps(context) } />
        const { Consumer } = Context;
        
        return () => (<Consumer>{(context: S) => map(context)}</Consumer>)
    }
}
