import React from 'react';
import { redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { createRecipe } from '../api/recipes';
import RecipeForm from '../components/recipe-form';
import formatFormData from '../helpers/formDataFormatter';

export async function action({ request }) {
    const formData = await request.formData();
    const formattedUpdates = formatFormData(formData);
    const recipe = await createRecipe(formattedUpdates);
    if (recipe && recipe.id) {
        return redirect(`/recipe/${recipe.id}`);
    }
    return redirect('/');
}

function CreateRecipe() {
    return (
        <Container>
            <RecipeForm recipe={{}} />
        </Container>
    )
}

export default CreateRecipe;