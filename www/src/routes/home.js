import React from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { useLoaderData } from 'react-router-dom';
import { getRecentRecipes } from '../api/recipes';

import './home.css';

export async function loader() {
    const recipes = await getRecentRecipes();
    return { recipes };
}

function Home() {
    const { recipes } = useLoaderData();

    return (
        <Container>
            <Button href='/recipe/create' color='primary'>Create New Recipe</Button>
            <ListGroup flush className='recipes-list-group'>
                {recipes && recipes.map((currentRecipe) => (
                    <ListGroupItem className='recipe-item' key={currentRecipe.id}>
                        <a className='recipe-link' href={`/recipe/${currentRecipe.id}`}>
                            <div className='recipe-title'>{currentRecipe.title}</div>
                        </a>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Home;