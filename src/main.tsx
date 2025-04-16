import { App } from "@/app/App"
import "./index.scss"
import { createRoot } from "react-dom/client"
import {HashRouter} from 'react-router';
import {Provider} from 'react-redux';
import {store} from '@/app/store.ts';

createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>


)
