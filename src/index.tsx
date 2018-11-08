import React = require("react");
import ReactDOM = require("react-dom");
import { proxyState } from "@giveback007/proxy-state";

export const { store, subscribe } = proxyState({ num: 0 });
window['state'] = store;

/// /// ///
const Context = React.createContext(null);

class Provider extends React.Component {
    state = { data: 'IT WORKS' };
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

const App = () => (
    
        <Title />
)

const Title = () => (
    <Context.Consumer>
        {(context) => <h1>{context.data}</h1>}
    </Context.Consumer>
)

// function connect(mapStateToProps: (s) => any) {
//     return (component) => {
//         <Context.Consumer>
//             {(context) => <h1>{context.data}</h1>}
//         </Context.Consumer>
//     }
// }

function connectAndRender(app: JSX.Element, rootId: string) {
    // add arg to add state
    ReactDOM.render(<Provider>{app}</Provider>, document.getElementById(rootId));
}

connectAndRender(<App />, 'app-root');