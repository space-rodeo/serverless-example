import axios from 'axios';
import config from '../config';

export async function getRecipe(id) {
    const result = await axios({
        url: `${config.api_base_url}/recipes/${id}`
    });
    if (result && result.status === 200 && result.data.Item) {
        return result.data.Item;
    }
    throw new Error(result.data);
}

export async function getRecentRecipes() {
    const result = await axios({
        url: `${config.api_base_url}/recipes`
    });
    if (result && result.status === 200 && result.data) {
        return result.data;
    }
    throw new Error(result.data);
}

export async function createRecipe(newRecipe) {
    if (!newRecipe || newRecipe === '') return;
    const result = await axios({
        method: 'POST',
        url: `${config.api_base_url}/recipes`,
        data: newRecipe
    });

    if (result && result.status === 200 && result.data) {
        return result.data;
    }
    throw new Error(result.data);
}
