import store from '@/store'
import Axios from 'axios'
import lib from '../lib.esm'

const setting = require('../../config/' + process.env.VUE_APP_MODE_NAME + '.js');
const apiBase = '/mem' // /v' + setting.apiVersion
var domains, path, selectedDomain
var domainUrls = []
var isNetworkChosen = false
var callback = undefined
export default {
    getIniData: function (cb = null) {
        if (typeof cb == "function")
            callback = cb;
        switch (process.env.VUE_APP_ENV) {
            case 'prod':
                domains = setting.defaultDomain.prod.urls
                path = setting.defaultDomain.prod.path
                break;
            case 'uat':
                domains = setting.defaultDomain.uat.urls
                path = setting.defaultDomain.uat.path
                break;
            case 'dev':
                domains = setting.defaultDomain.dev.urls
                path = setting.defaultDomain.dev.path
                break;
        }
        domains.forEach(domain => {
            Axios.get(
                domain + apiBase + '/getIniData.php?' + Date.now(),
            ).then(res => {
                this.getImage(res.data);
            })
        });
    },
    getImage: function (data) {
        var obj = this;
        data.urls.forEach(function (domain) {
            Axios.get(
                "https://" + domain.api + path + '/dist/images/noPhoto.png??' + Date.now(),
            ).then(function (response) {
                if (response.status == 200) {
                    obj.getSpeed(domain);
                }
            })
        });
    },
    getSpeed: function (domain) {
        var obj = this;
        var start = new Date();
        Axios.get(
            "https://" + domain.api + path + '/dist/images/speedTestImg.png??' + Date.now(),
        ).then(function (response) {
            if (response.status == 200) {
                var end = new Date();
                var diff = 0;
                diff = end.getTime() - start.getTime();
                var d = {api: domain.api, game: domain.game, ms: diff};
                domainUrls.push(d);
                if (!isNetworkChosen) {
                    isNetworkChosen = true;
                    selectedDomain = d;
                    store.commit('UPDATE_CURRENT_NETWORK', selectedDomain)
                    obj.setLang(selectedDomain)
                }
                store.commit('UPDATE_NETWORK_LINES', domainUrls)
            }
        })

    },
    setLang: function (currentdomain) {
        var language = localStorage.getItem("store") ? JSON.parse(localStorage.getItem("store")).setting.language : 'en'
        var defLang = language
        if (!language || language == 'undefind') {
            defLang = navigator.language.toLowerCase().substring(0, 2);
            if (defLang == 'zh') {
                if (navigator.language.toLowerCase().substring(3) == 'cn') {
                    defLang = 'cn';
                } else {
                    defLang = 'tw';
                }
            } else {
                defLang = 'en';
            }
        }

        var stores = localStorage.getItem('store') || '{}';
        var oPreference = JSON.parse(stores).setting;
        if (oPreference.language) {
            defLang = oPreference.language;
        }
        let param = {
            lang: defLang
        }

        lib.config.changeLang(defLang).then(() => {
            store.commit('UPDATE_LANG', defLang)
        })

        let _sessid = localStorage.getItem('_sessid');
        if (_sessid) {
            param._sessid = _sessid;
            store.commit('UPDATE_SESSENID', _sessid)
        }


        Axios.post(
            "https://" + currentdomain.api + apiBase + '/setLang.php',
            param,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            }
        ).then(function (response) {
            if (response.status == 200) {
                if (store.app.$route.name == 'Login') {
                    store.commit('UPDATE_SESSENID', response.data._sessid)
                    callback()
                }
            }
        })
    }
}
