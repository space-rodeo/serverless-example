import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Home, { loader as homeLoader } from './routes/home';
import Recipe, { loader as recipeLoader } from './routes/recipe';
import CreateRecipe, { action as createRecipeAction } from './routes/create-recipe';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            index: true,
            element: <Home />,
            loader: homeLoader
        },{
            path: 'recipe/:recipeId',
            element: <Recipe />,
            loader: recipeLoader
        },{
            path: 'recipe/create',
            element: <CreateRecipe />,
            action: createRecipeAction
        }]
    }
]);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);