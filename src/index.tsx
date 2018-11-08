import React = require("react");
import ReactDOM = require("react-dom");
import { proxyState, Store } from "@giveback007/proxy-state";

/// /// ///
const Context = React.createContext(null);

class Provider<T> extends React.Component<{ store: Store<T> }> {
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

const App = () => (<Title />)



function connectAndRender<S extends {}>(
    app: () => React.ReactElement<any>,
    container: Element,
    initState = { } as S
) {
    const store = proxyState<S>(initState);

    function connect<P>(mapStateToProps: (s: S) => P) {
        return (Comp: (props: P) => JSX.Element) => {
            const render = (context: S) => <Comp { ...mapStateToProps(context) } />
            const { Consumer } = Context;
            
            return () => (<Consumer>{(context: S) => render(context)}</Consumer>)
        }
    }

    ReactDOM.render(<Provider store={store}><App /></Provider>, container);

    return { store, connect };
}

/// /// ///
const { store, connect } = connectAndRender(App, document.getElementById('app-root'), { title: 'I am a title' });

const Title = connect((state) => state)(({ title }) => (
    <h1>{title}</h1>
))

window['store'] = store;
