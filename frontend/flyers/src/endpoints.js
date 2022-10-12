
export const getFlyers = (page, limit) => {
    return fetch(`/api/flyers?page=${page}&limit=${limit}`, {
        "ContentType": "application/json"
    });
}