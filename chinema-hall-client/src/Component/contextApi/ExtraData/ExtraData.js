import React, { createContext } from 'react';
import { } from 'react-router-dom';

let Context = null;
const { Provider, Consumer } = Context = createContext();

const ExtraDataProvider = (props) => {

    const myName = "ABU HASAN"

    return (
        <Provider value={
            {
                myName
            }
        }>
            {props.children}
        </Provider>
    )

}

export { ExtraDataProvider, Consumer as UserConsumer, Context as ExtraDataContext };