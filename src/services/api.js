import axios from "axios";

export default class Services {
    static getAll() {
        return axios.get('http://172.105.73.116/api/websites');
    }

    static updateMail(id, emails){
       return axios.put(`http://172.105.73.116/api/websites/${id}`, {emails})
    }
    static addWebsite(data) {
        return axios.post('http://172.105.73.116/api/websites', data)
    }
    static removeWebsite(id){
        axios.delete(`http://172.105.73.116/api/websites/${id}`)
    }
}
