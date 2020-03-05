import axios from 'axios';

class Services {

    getResult() {
        return axios.get('/result' ).then(response => response.data);
    }
    postCode(code) {
        return axios.post('/code', {code}).then(response => response.data);
    }

}

export let services = new Services();

