import axios from 'axios';

export async function secret() {
    return await axios.get(`https://fourteener-community.herokuapp.com/users/secret`);
}

export async function getUsersById(arr) {
    const userArray = arr.map(element => ({_id: element.userId}))
  console.log(userArray)
    return await axios.post(`http://localhost:5000/users/getUsersById`, userArray);
}