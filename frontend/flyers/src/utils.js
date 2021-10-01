export async function handleErrors(response) {
    if (!response.ok) {
        const body = await response.json();
        throw Error(body.msg || response.statusText);
    }
    return response;
}