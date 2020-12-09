import store from '@/store';

// import lib from './../lib.esm';
export default {
    setLogin(res) {
        store.commit('UPDATE_SESSENID', res._sessid)
        store.commit('UPDATE_SID', res.sid)
        store.commit('UPDATE_CANSETNAME', res.canSetName)
    },
    kickAndLogin(res) {
        console.log('kickAndLogin', res)
    },
    completeLogin(res) {
        localStorage.setItem('_sessid', res._sessid)
        localStorage.setItem('sid', res.sid)
        localStorage.setItem('cid', res.user.iniClubID);
        localStorage.setItem('canSetName', res.canSetName)

        // var returnTables = res.returnTables || null;
        var param = {
            sid: res.sid,
            t1: res.token1,
            userID: res.user.userID,
            userName: res.user.userName,
            credit: res.user.credit,
            selfClubID: res.user.selfClubID,
            iniClubID: res.user.iniClubID,
            isLogin: true
        }
        store.commit('UPDATE_GAMEUSER', param)
        // var hasDefaultClubID = 1;
        // if (res.user.iniClubID) {
        //     hasDefaultClubID = res.user.iniClubID;
        // }
        if (res.nickNames) {
            store.commit('UPDATE_NICKNAMELIST', res.nickNames)
            localStorage.setItem("nickNameList", res.nickNames);
        }
        return param

    },
    getPreferences(res) {
        store.commit('UPDATE_PREFERENCE', {type: 'raiseBarAuto', value: res.settings.autoConfirm})
        store.commit('UPDATE_RAISEBUTTON', res.settings.raiseBtn)
        localStorage.setItem('userPreferences', JSON.stringify(res.settings))
        localStorage.setItem("store", JSON.stringify(store.state))
    },
    getInfo(res) {
        // console.log('info',res)
        // if (res.user.langs) {
        //     store.commit('UPDATE_LANG', res.user.langs)
        // }

        var param = {
            gems: res.gem,
            selfClubID: res.selfClubID,
            clubs: res.clubs,
            onlinePlayers: res.onlinePlayers,
        }
        store.commit('UPDATE_CLUBS', param)
        store.commit('UPDATE_USERINFO', res.user)
        localStorage.setItem("store", JSON.stringify(store.state))
    },
    getMyClubs(res) {
        var param = {
            gems: res.gem,
            selfClubID: res.selfClubID,
            clubs: res.clubs,
            onlinePlayers: res.onlinePlayers
        }
        store.commit('UPDATE_CLUBS', param)
        localStorage.setItem('myClubsInfo', JSON.stringify(res))
    },
    extendSession(res) {
        localStorage.setItem('myClubsInfo', JSON.stringify(res))
    },
}

