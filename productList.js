export const handler = async (event) => {
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

    products = JSON.stringify(products);
    products = products.replace(/\\"/g, '"');

    return {
        statusCode: 200,
        body: products
    };
};