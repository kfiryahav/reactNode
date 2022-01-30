import { api_call, URL } from '../services/api_calls';

// checks on the server if the token is valid
export const authantication = async () => {
    if (!localStorage['token']) {
        return { error: 'No token was received' };
    }

    try {
        let data = await api_call(URL + '/users/authantication', 'GET');
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}