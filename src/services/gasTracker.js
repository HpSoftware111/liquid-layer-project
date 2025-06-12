
import axios from 'axios';

const getGasPrices = async () => {
    const response = await axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=AHRN41D61SZRDPTZHIY3W3RWJP88V5PC7W')
    return response
    // const promise1 =   Promise.resolve(response);
    //  promise1.then((rep) => {
    //     return rep.data.response
    //   });
};

export {
    getGasPrices
}


// import axios from 'axios'

// const api = axios.create({
//     baseURL: 'https://api.etherscan.io/',
//     timeout: 30000, // 30 secs
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//     }
// })

// export async function getGasPrices() {
//     const response = await api.get(
//         `api?module=gastracker&action=gasoracle&apikey=AHRN41D61SZRDPTZHIY3W3RWJP88V5PC7W`
//     )
//     return response
//     //   const { result } = response.data
//     //   return result
// }
