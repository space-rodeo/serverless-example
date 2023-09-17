import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Home, { loader as homeLoader } from './routes/home';
import Recipe, { loader as recipeLoader, action as recipeAction } from './routes/recipe';
import CreateRecipe, { action as createRecipeAction } from './routes/create-recipe';
import EditRecipe, { loader as editRecipeLoader, action as editRecipeAction } from './routes/edit-recipe';

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
            loader: recipeLoader,
            action: recipeAction
        },{
            path: 'recipe/create',
            element: <CreateRecipe />,
            action: createRecipeAction
        },{
            path: 'recipe/:recipeId/edit',
            element: <EditRecipe />,
            loader: editRecipeLoader,
            action: editRecipeAction
        }]
    }
]);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);