import React = require("react");
import ReactDOM = require("react-dom");
import { proxyState } from "@giveback007/proxy-state";
import { Store } from '@giveback007/proxy-state'
import { Provider } from "./provider";

export function initStateAndRender<S extends {}>(
    app: React.ReactElement<any>,
    container: Element,
    initState = { } as S
) {
    const store = proxyState<S>(initState);
    ReactDOM.render(<Provider store={store}>{app}</Provider>, container);
    
    return store;
}
