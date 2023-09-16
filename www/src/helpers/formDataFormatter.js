function formatFormData(formData) {
    const updates = Object.fromEntries(formData);
    const formattedUpdates = Object.keys(updates).reduce((memo, curVal) => {
        if (curVal.endsWith(']')) {
            const arrayName = curVal.split('[')[0];
            memo[arrayName] = memo[arrayName] || [];
            memo[arrayName].push(updates[curVal]);
        } else {
            memo[curVal] = updates[curVal];
        }
        return memo;
    }, {});
    return formattedUpdates;
}

export default formatFormData;