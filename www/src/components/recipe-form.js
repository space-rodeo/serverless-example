import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Button, Label, ListGroup, ListGroupItem } from 'reactstrap';

import './recipe-form.css';

let ingredientsLength = 0;
let stepsLength = 0;

function getIngredients(recipe) {
    if (recipe && recipe.ingredients) {
        return recipe.ingredients.map((item) => {
            return {
                data: item,
                originalIndex: ingredientsLength++
            };
        });
    }
    return [];
}

function getSteps(recipe) {
    if (recipe && recipe.steps) {
        return recipe.steps.map((item) => {
            return {
                data: item,
                originalIndex: stepsLength++
            };
        });
    }
    return [];
}

function RecipeForm({ recipe }) {
    const navigate = useNavigate();

    let ingredientsTemp = getIngredients(recipe);
    let stepsTemp = getSteps(recipe);

    const [ingredients, setIngredients] = useState(ingredientsTemp);
    const [steps, setSteps] = useState(stepsTemp);

    return (
        <Form method='post' id='recipe-form' autoComplete='off'>
            <div>
                <Label className='title'>Title</Label>
                <input className='title-input'
                    placeholder='My Favorite Chili'
                    aria-label='Recipe Title'
                    type='text'
                    name='title'
                    defaultValue={recipe.title} />
            </div>
            <div>
                <div>
                    <Label>Difficulty</Label>
                    <input placeholder='Easy'
                        aria-label='Difficulty'
                        type='text'
                        name='difficulty'
                        defaultValue={recipe.difficulty} />
                </div>
                <div>
                    <Label>Active Time (minutes)</Label>
                    <input
                        aria-label='Active Cooking Time in minutes'
                        type='number'
                        name='activeTime'
                        defaultValue={recipe.activeTime}
                        min='0' />
                </div>
                <div>
                    <Label>Total Time (minutes)</Label>
                    <input
                        aria-label='Total Cook Time in minutes'
                        type='number'
                        name='totalTime'
                        defaultValue={recipe.totalTime}
                        min='0' />
                </div>
                <div>
                    <Label>Servings</Label>
                    <input
                        aria-label='Number of servings'
                        type='number'
                        name='servingsCount'
                        defaultValue={recipe.servingsCount}
                        min='0' />
                </div>
            </div>
            <div>
                <Label>Ingredients</Label>
                {ingredients && ingredients.length ? (
                    <ListGroup>
                    {ingredients.map((item, index) => (
                        <ListGroupItem key={item.originalIndex}>
                        <input type='text'
                            className='ingredient'
                            name={`ingredients[${index}]`}
                            key={item.originalIndex}
                            placeholder=''
                            defaultValue={item.data}
                            aria-label='Ingredient' />
                            <Button onClick={() => {
                                const temp = [...ingredients];
                                temp.splice(index, 1);
                                setIngredients(temp);
                            }}>Delete</Button>
                        </ListGroupItem>
                    ))}
                    </ListGroup>
                ) : (
                    <ListGroup>
                    </ListGroup>
                )}
                <Button className='addItem-button' onClick={() => {
                    const temp = ingredients && ingredients.length ? [...ingredients] : [];
                    temp.push({
                        originalIndex: ingredientsLength++,
                        data: ''
                    });
                    setIngredients(temp);
                }}>Add</Button>
            </div>
            <div>
                <Label>Steps</Label>
                {steps && steps.length ? (
                    <ListGroup>
                    {steps.map((item, index) => (
                        <ListGroupItem key={item.originalIndex}>
                        <textarea className='step'
                            key={item.originalIndex}
                            name={`steps[${index}]`}
                            placeholder=''
                            defaultValue={item.data}
                            aria-label='Recipe Step' />
                            <Button onClick={() => {
                                const temp = [...steps];
                                temp.splice(index, 1);
                                setSteps(temp);
                            }}>Delete</Button>
                        </ListGroupItem>
                    ))}
                    </ListGroup>
                ) : (
                    <ListGroup>
                    </ListGroup>
                )}
                <Button className='addItem-button' onClick={() => {
                    const temp = steps && steps.length ? [...steps] : [];
                    temp.push({
                        originalIndex: stepsLength++,
                        data: ''
                    });
                    setSteps(temp);
                }}>Add</Button>
            </div>
            <div className='form-submit-area'>
                <Button type='submit'>Save</Button>
                <Button type='button' onClick={() => navigate(-1)}>Cancel</Button>
            </div>
        </Form>
    )
}

export default RecipeForm;