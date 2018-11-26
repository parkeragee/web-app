const axios = require('axios');

export function handler(event, context, callback) {
    const {identity, user} = context.clientContext;
    console.log('parker', identity, user);
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then(resp => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ data: resp.data.message })
            });
        })
        .catch(err => {
            console.log(err)
            callback(err);
        });
}
