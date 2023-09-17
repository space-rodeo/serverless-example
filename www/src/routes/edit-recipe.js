import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { Container } from 'reactstrap';
import { getRecipe, updateRecipe } from '../api/recipes';
import formatFormData from '../helpers/formDataFormatter';
import RecipeForm from '../components/recipe-form';

export async function loader({ params }) {
    const recipe = await getRecipe(params.recipeId);
    return { recipe };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const formattedUpdates = formatFormData(formData);
    await updateRecipe(params.recipeId, formattedUpdates);
    return redirect(`/recipe/${params.recipeId}`);
}

function EditRecipe() {
    const { recipe } = useLoaderData();

    return (
        <Container>
            <RecipeForm recipe={recipe} />
        </Container>
    )
}

export default EditRecipe;