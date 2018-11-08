// import React = require("react");
// import { proxyState } from "@giveback007/proxy-state";
// import { Consumer } from "react";

// const Context = React.createContext(null);

// type P = { store: ReturnType<typeof proxyState> }
// export class Provider extends React.Component<P> {
//     state = {};

//     unsubscribe: () => boolean;

//     componentDidMount() {
//         this.unsubscribe = this.props.store.subscribe(
//             (state) => this.setState(state)).unsubscribe;
//     }

//     componentWillUnmount() {
//         if (this.unsubscribe) this.unsubscribe()
//     }

//     render() {
//         return(
//             <Context.Provider value={this.state}>
//                 {this.props.children}
//             </Context.Provider>
//         )
//     }
// }

// function connect<S, P = {}>(mapStateToProps: (s: S) => any) {
//     return (Component: Consumer<any>) => (
//         <Context.Consumer>
//             { (context) => <Component { ...mapStateToProps(context) }/> }
//         </Context.Consumer>
//     )
// }
