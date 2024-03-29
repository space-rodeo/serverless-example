import React from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../api/recipes';

import './recipe.css';

export async function loader({ params }) {
    const recipe = await getRecipe(params.recipeId);
    return { recipe };
}

export async function action({ params }) {
    await deleteRecipe(params.recipeId);
    return redirect(`/`);
}

function Recipe() {
    const { recipe } = useLoaderData();
    const submit = useSubmit();

    return (
        <Container>
        <div id='recipe'>
            <div className='recipe-header'>
                <div className='recipe-title'>
                    <h1>
                        {recipe.title}
                    </h1>
                </div>
            </div>
            <div className='info-container'>
                <div className='difficulty'>
                    Level: <strong>{recipe.difficulty}</strong>
                </div>
                <div className='timing'>
                    <div className='total-time'>
                        Total: <strong>{recipe.totalTime} min</strong>
                    </div>
                    <div className='cook-time'>
                        Active: <strong>{recipe.activeTime} min</strong>
                    </div>
                </div>
                <div className='servings'>
                    Servings: <strong>{recipe.servingsCount}</strong>
                </div>
            </div>
            <div className='ingredients-directions-container'>
                <div className='ingredients-container'>
                    <h2>Ingredients</h2>
                    <ListGroup>
                        {recipe.ingredients && recipe.ingredients.map((item, index) => (
                            <ListGroupItem key={index}>{item}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
                <div className='directions-container'>
                    <h2>Directions</h2>
                    <ListGroup>
                        {recipe.steps && recipe.steps.map((item, index) => (
                            <ListGroupItem key={index} className='no-flex no-border'>
                                <h3>Step {index + 1}</h3>
                                {item}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
            <Button href={`/recipe/${recipe.id}/edit`}>Edit</Button>
            <Button onClick={(e) => {
                submit(recipe.id, {
                    action: `/recipe/${recipe.id}`,
                    method: 'DELETE'
                });
            }} color='danger' title='Delete Recipe'>Delete</Button>

        </div>
        </Container>
    );
}

export default Recipe;