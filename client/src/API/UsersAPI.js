import axios from 'axios';

export async function secret() {
    return await axios.get(`https://fourteener-community.herokuapp.com/users/secret`);
}