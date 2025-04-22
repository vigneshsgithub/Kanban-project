'use client'
import {redirect} from 'next/navigation';
import { Provider } from 'react-redux';
import {store} from './redux/store'


export default function Home() 
{   

    return(
        <Provider store={store}>
    {redirect("/signup")}
    </Provider>
    )
}