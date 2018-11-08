import React = require("react");
import { Store } from "@giveback007/proxy-state";

export const Context = React.createContext(null);

export class Provider<T> extends React.Component<{ store: Store<T> }> {
    unsubscribe: () => boolean;

    componentDidMount() {
        this.unsubscribe =
            this.props.store.subscribe((value) => this.setState(value));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
