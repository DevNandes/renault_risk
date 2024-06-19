import { apiRWS } from "~/services/apiRWS";

export const makeRequestRWS = async function (endpoint, params) {
    const promise = new Promise(function (resolve, reject) {
        apiRWS.get(endpoint)
            .then(response => {
                resolve(params !== undefined ? response.data[params] : response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
    return await promise;
};