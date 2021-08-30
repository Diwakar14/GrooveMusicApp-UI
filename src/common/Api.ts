import axios from "axios";

export class APIService {

    private Axiox = axios;
    constructor() {
        this.Axiox.defaults.baseURL = 'http://localhost:8000/';
    }


    public get(url: string) {
        return this.Axiox.get(url);
    }

    public post(url: string, data: any) {
        return this.Axiox.post(url, data);
    }

    public upload(url: string, data: any) {
        return this.Axiox.post(url, data);
    }

    public put(url: string, data: any) {
        return this.Axiox.put(url, data);
    }

    public delete(url: string,) {
        return this.Axiox.delete(url);
    }
}