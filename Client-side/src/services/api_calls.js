import axios from "axios";

// here you can change to your localhost
export const URL = "http://localhost:3400";

// the api call that uses me all over the files
export const api_call = async (_url, _method, _bodyData) => {
    try {
        let respose = await axios({
            method: _method,
            url: _url,
            data: _bodyData,
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": localStorage["token"]
            }
        });
        return respose.data;
    } catch (error) {
        console.error(error);
    }
}
