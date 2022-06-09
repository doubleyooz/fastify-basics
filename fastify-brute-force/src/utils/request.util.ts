import axios from 'axios';

// Example POST method implementation:
export const postData = async (url: string, data: any) => {
    return axios.post(url, data);
};
