export const handler = async (event) => {
    const productId = event["product_id"];
    let products = [
        {
            "id": 1,
            "name": "Iphone 14",
            "price": 100
        },
        {
            "id": 2,
            "name": "Apple whatch",
            "price": 200
        },
        {
            "id": 3,
            "name": "IPhone headphones",
            "price": 300
        }
    ]
    let product = products.find(item => item.id === productId);

    if (product !== undefined) {
        return JSON.stringify(product);
    }

    return {
        statusCode: 404,
        body: "Not found exception."
    };
};