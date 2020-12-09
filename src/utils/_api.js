import axios from 'axios'
import store from '@/store'

import lib from './../lib.esm';

// const setting = require('../../config/' + process.env.VUE_APP_MODE_NAME + '.js');
const apiBase = 'mem'
const Axios = axios.create({
    timeout: 1000 * 30,
    config: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
    }
});
Axios.interceptors.response.use(response => {
    if (response.data.errCode > 0) {
        if (response.data.isLogout == 1) {
            store.app.$router.push({name: 'Login'})
        } else {
            lib.$alert({type: 'error', msg: response.data.errMsg, duration: 3000})
            throw response.data.errCode;
        }
    }
    return response
}, function (err) {
    if (err.isAxiosError)
        lib.$alert({type: 'error', msg: lib.str.translate('LB_01788'), duration: 3000})
})

export default {

    login(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl
        let url = ''
        const formdata = new FormData()
        formdata.append('token', credentials.key)
        formdata.append('acc', credentials.username)
        formdata.append('pwd', (getters.loginType.apkLogin) ? credentials.password : lib.util.loginPassword(credentials.password))
        formdata.append('t1', lib.util.getGuid())
        formdata.append('_sessid', getters.auth._sessid)
        formdata.append('vs', getters.setting.version)
        formdata.append('isApp', getters.setting.isApp)
        formdata.append('uuid', '')
        formdata.append('fuv', getters.setting.FUVersion)
        formdata.append('model', getters.setting.model)

        if (getters.network.networkLines.length > 0) {
            getters.network.networkLines.forEach((line, idx) => {
                formdata.append('ms' + idx, line.ms)
                formdata.append('api' + idx, line.api)
            })
        }
        if (!credentials.key)
            url = (getters.loginType.apkLogin) ? apiServerUrl + 'apis/IDN/' : apiServerUrl + apiBase + '/login.php' + '?' + Math.random();
        if (credentials.key) {
            let domain = (process.env.NODE_ENV == 'production') ? '' : 'https://www-idn.card168.cc'
            url = getters.setting.env == 'prod' ? domain + '/RealLogin.php' : domain + '/apis/IDN/RealLogin.php';
        }

        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    kickAndLogin(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/kickAndLogin.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getPreferences(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getPreferences.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    setLang(getters, lang) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('lang', lang)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/setLang.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    setPreferences(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl
        console.log(credentials)
        const formdata = new FormData()
        formdata.append(credentials.columns, credentials.value)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/setPreferences.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getInfo(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getInfo.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    setHead(getters, credentials) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('icon', credentials)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/setHead.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getMyClubs(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getMyClubs.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getMarquee(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getMarquee.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getBanners(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('lang', getters.language)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getBanners.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    extendSession(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)
        if (getters.network.networkLines.length > 0) {
            getters.network.networkLines.forEach((line, idx) => {
                formdata.append('ms' + idx, line.ms)
                formdata.append('api' + idx, line.api)
            })
        }
        formdata.append('crtUrl', getters.currentNetwork.api)

        let url = apiServerUrl + apiBase + '/extendSession.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    setFeedBack(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('subject', credentials.subject)
        formdata.append('content', credentials.content)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)


        let url = apiServerUrl + apiBase + '/setFeedBack.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getJackpotBoard(getters, gid) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('gid', gid)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + apiBase + '/getJackpotBoard.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getLeaderBoard(getters, type) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('type', type)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/getLeaderBoard.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getTablesByGID(getters, gameId) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('gid', gameId)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/getTablesByGID.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getTourneyByGID(getters, gameId) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('gid', gameId)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/getTourneyByGID.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getCompleteItems(getters, date) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('date', date)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/tourney/getCompleteItems.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getTourneyDetail(getters, tyid) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('tyid', tyid)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/tourney/getTourneyDetail.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getCompleteOne(getters, tyid) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('tyid', tyid)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/tourney/getCompleteOne.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getQSTables(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('gid', credentials.gid)
        formdata.append('aof', credentials.aof)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/getQSTables.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },

    getTotalData(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getTotalData.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },

    getDepositData(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date) //2020-08-14
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getDepositData.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getWithdrawData(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date) //2020-08-14
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getWithdrawData.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getWinLossByGame(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date) // 2020-08-14
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getWinLossByGame.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getTableData(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date) // 2020-08-14
        formdata.append('gid', credentials.gid) //gid = 91 (jackpot)
        formdata.append('aof', credentials.aof)
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getTableData.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getRoundsData(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date) // 2020-08-14
        formdata.append('gid', credentials.gid)
        formdata.append('aof', credentials.aof)
        formdata.append('tid', credentials.tid)
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getRoundsData.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getOneRound(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('tid', credentials.tid)
        formdata.append('rid', credentials.rid)
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/getOneRound.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getTournamentDetails(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('date', credentials.date)
        formdata.append('tyid', credentials.tyid)
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getTournamentDetails.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getJackpotDetails(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('rid', credentials.rid)
        formdata.append('cid', JSON.parse(localStorage.getItem('cid')))
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'mem/web/getJackpotDetails.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getPlayerPaymentAccount(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'apis/IDN/GetPlayerPaymentAccount.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    getCompanyPaymentAccount(getters) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'apis/IDN/GetCompanyPaymentAccount.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    depositForm(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('amt', credentials.amt)
        formdata.append('depositMethod', credentials.depositMethod)
        formdata.append('paymentType', credentials.paymentType)
        formdata.append('playerAccNum', credentials.playerAccNum)
        formdata.append('companyAccNum', credentials.companyAccNum)
        formdata.append('transactionDate', credentials.transactionDate)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'apis/IDN/DepositForm.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },
    withdrawalForm(getters, {credentials}) {
        const apiServerUrl = getters.apiUrls.apiServerUrl

        const formdata = new FormData()
        formdata.append('amt', credentials.amt)
        formdata.append('paymentType', credentials.paymentType)
        formdata.append('playerAccNum', credentials.playerAccNum)
        formdata.append('sid', getters.auth.sid)
        formdata.append('_sessid', getters.auth._sessid)

        let url = apiServerUrl + 'apis/IDN/WithdrawalForm.php' + '?' + Math.random();
        return Axios.post(
            url,
            formdata
        ).then(res => {
            return res
        })
    },


}


