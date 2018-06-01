import request from 'superagent';
import io from 'socket.io-client/dist/socket.io.slim.js';
import Push from 'push.js';

export default class StackPie {

    constructor(api_key,options = {}) {
        this.api_key = api_key;
        let defaults = {
            url : 'https://stackpie.com/api/v2/',
        };
        this.options = Object.assign({}, defaults, options);
    }


    push(data)
    {
        return Push.create(data.title, {
            body: data.body,
            icon: 'https://www.stackpie.com/favicon-32x32.png',
            timeout: 4000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

    clientAuth(params) {

        let that = this;

        return new Promise(function (resolve, reject) {
            request
                .post(that.options.url + 'contact-auth')
                .send({
                    username: params.username,
                    password: params.password,
                    api_key: that.api_key,
                    type: 'customer'
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Accept', 'application/json')
                .then(function(res) {
                    if(res.success){
                        localStorage.setItem('api_token', res.api_token);
                        localStorage.setItem('sp_contact_id', res.contact_id);
                        localStorage.setItem('sp_contact_name', res.name);
                        localStorage.setItem('sp_contact_email', res.name);
                    }
                    resolve(res.body)
                }).catch(function (err) {
                reject(err)
            })
        })



    }

    checkCredentials() {
        let idToken = localStorage.getItem('some_token');
        if (!idToken) {
            return Promise.reject('No Token Found In Local Storage')
        }
        return fetch(`https://someValidateEndpoint`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        })
    }


}