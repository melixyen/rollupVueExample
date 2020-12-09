import lib from './../lib.esm';
import store from '@/store';

export default {
    setServerTime: function (serverTime) {
        store.commit('UPDATE_SERVERTIMEDIFF', Date.now() - serverTime)
    },
    tableSort(table, type, role) {
        switch (type) {
            case 'table':
                if (role == 'asc') {
                    table.sort((a, b) => {
                        if (a.name == '' && b.name == '') {
                            return a.id - b.id
                        } else if (parseInt(a.name) > 0 && !parseInt(b.name)) {
                            return -1
                        } else if (!parseInt(a.name) > 0 && parseInt(b.name) > 0) {
                            return 1
                        } else {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                    })
                } else {
                    table.sort((a, b) => {
                        if (a.name == '' && b.name == '') {
                            return b.id - a.id
                        } else if (parseInt(a.name) > 0 && !parseInt(b.name)) {
                            return 1
                        } else if (!parseInt(a.name) > 0 && parseInt(b.name) > 0) {
                            return -1
                        } else {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                    })
                }
                break;
            case 'players':
                if (role == 'asc')
                    table.sort((a, b) => {
                        return a.sitPersons - b.sitPersons
                    })
                else
                    table.sort((a, b) => {
                        return b.sitPersons - a.sitPersons
                    })
                break;
            case 'min balance':
                if (role == 'asc')
                    table.sort((a, b) => {
                        return a.minBalanceChips - b.minBalanceChips
                    })
                else
                    table.sort((a, b) => {
                        return b.minBalanceChips - a.minBalanceChips
                    })
                break;
            case 'max buy':
                if (role == 'asc')
                    table.sort((a, b) => {
                        return a.maxChips - b.maxChips
                    })
                else
                    table.sort((a, b) => {
                        return b.maxChips - a.maxChips
                    })
                break;
            case 'min buy':
            case 'min/max bet':
                if (role == 'asc') {
                    table.sort((a, b) => {
                        return a.minChips - b.minChips
                    })
                } else {
                    table.sort((a, b) => {
                        return b.minChips - a.minChips
                    })
                }
                break;
            case 'banker':
                if (role == 'asc')
                    table.sort((a, b) => {
                        return a.minBankerBalanceChips - b.minBankerBalanceChips
                    })
                else
                    table.sort((a, b) => {
                        return b.minBankerBalanceChips - a.minBankerBalanceChips
                    })
                break;
            case 'side bet':
            case 'blinds':
            case 'ante':
            case 'stake/pt':
            case 'stake':
                table.sort((a, b) => {
                    var valueA, valueB;
                    switch (parseInt(a.gameID)) {
                        case 1:
                        case 3:
                        case 6:
                        case 15:
                            valueA = a.forcedBet.split('/')[1];
                            break;
                        case 2:
                        case 11:
                        case 12:
                            valueA = parseInt(a.forcedBet);
                            break;
                        case 13:
                        case 14:
                        case 16:
                            if (a.isSideBet) {
                                valueA = parseInt(a.minChips);
                            } else {
                                valueA = 0;
                            }
                            break;
                        default:
                            valueA = a.id;
                    }
                    switch (parseInt(b.gameID)) {
                        case 1:
                        case 3:
                        case 6:
                        case 15:
                            valueB = b.forcedBet.split('/')[1];
                            break;
                        case 2:
                        case 11:
                        case 12:
                            valueB = parseInt(b.forcedBet);
                            break;
                        case 13:
                        case 14:
                        case 16:
                            if (b.isSideBet) {
                                valueB = parseInt(b.minChips);
                            } else {
                                valueB = 0;
                            }
                            break;
                        default:
                            valueB = b.id
                    }

                    if (role == 'asc')
                        return valueA - valueB;
                    else
                        return valueB - valueA;
                })

                break;
        }
    },
    sortTourneyList: (table, type, role) => {
        switch (type) {
            case 'status':
                table.sort(function (a, b) {
                    if (a.stage == 3 && b.stage != 3) {
                        return -1
                    } else if (a.stage != 3 && b.stage == 3) {
                        return 1
                    } else if (a.stage == 3 && b.stage == 3) {
                        if (a.type > b.type) return 1
                        if (a.type < b.type) return -1

                        if (new Date(a.tourneyTime) < new Date(b.tourneyTime)) return -1
                        if (new Date(a.tourneyTime) > new Date(b.tourneyTime)) return 1
                        return 0
                    } else if (a.stage == 5 && b.stage != 5) {
                        return -1
                    } else if (a.stage != 5 && b.stage == 5) {
                        return 1
                    } else if (a.stage == 5 && b.stage == 5) {
                        if (a.type > b.type) return 1
                        if (a.type < b.type) return -1

                        if (new Date(a.lateEntryLeftTime) < new Date(b.lateEntryLeftTime)) return -1
                        if (new Date(a.lateEntryLeftTime) > new Date(b.lateEntryLeftTime)) return 1
                        return 0
                    } else if (a.stage == 2 && b.stage != 2) {
                        return -1
                    } else if (a.stage != 2 && b.stage == 2) {
                        return 1
                    } else if (a.stage == 2 && b.stage == 2) {
                        if (a.type > b.type) return 1
                        if (a.type < b.type) return -1

                        if (new Date(a.tourneyTime) < new Date(b.tourneyTime)) return -1
                        if (new Date(a.tourneyTime) > new Date(b.tourneyTime)) return 1
                        return 0
                    } else {
                        if (a.type > b.type) return 1
                        if (a.type < b.type) return -1

                        if (new Date(a.tourneyTime) < new Date(b.tourneyTime)) return -1
                        if (new Date(a.tourneyTime) > new Date(b.tourneyTime)) return 1
                        return 0
                    }
                });
                break;
            case'speed':
                if (role == 'asc') {
                    table.sort((a, b) => {
                        return a.speed - b.speed
                    })
                } else {
                    table.sort((a, b) => {
                        return b.speed - a.speed
                    })
                }
                break;
            case'prize type':
                // table.sort((a, b) => {
                //     var prizeJsonA = app.tournamentFunc.getPrize(a.gtdPrizeAmt, a.isSatellite, a.entries, a.buyIn, a.satTicketAmt);
                //     var prizeJsonB = app.tournamentFunc.getPrize(b.gtdPrizeAmt, b.isSatellite, b.entries, b.buyIn, b.satTicketAmt);
                //     if (role == 'asc') {
                //
                //         return parseInt(prizeJsonA.type) - parseInt(prizeJsonB.type)
                //     } else {
                //         return parseInt(prizeJsonB.type) - parseInt(prizeJsonA.type)
                //     }
                //
                // })

                break;
            case'buy-in':
                table.sort((a, b) => {
                    var valueA = parseFloat(a.buyIn) + parseFloat(a.tax)
                    var valueB = parseFloat(b.buyIn) + parseFloat(b.tax)
                    if (role == 'asc') {
                        return valueA - valueB;
                    } else {
                        return valueB - valueA;
                    }
                    // return (a.buyIn + a.tax) - (b.buyIn + b.tax)
                })


                break;
            case'title':
                if (role == 'asc') {
                    table.sort((a, b) => {
                        if (a.name == '' && b.name == '') {
                            return a.tyid - b.tyid
                        } else if (parseInt(a.name) > 0 && !parseInt(b.name)) {
                            return -1
                        } else if (!parseInt(a.name) > 0 && parseInt(b.name) > 0) {
                            return 1
                        } else {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                    })
                } else {
                    table.sort((a, b) => {
                        if (a.name == '' && b.name == '') {
                            return b.tyid - a.tyid
                        } else if (parseInt(a.name) > 0 && !parseInt(b.name)) {
                            return 1
                        } else if (!parseInt(a.name) > 0 && parseInt(b.name) > 0) {
                            return -1
                        } else {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                    })
                }
                break;
            case'players':
                table.sort((a, b) => {
                    if (role == 'asc') {
                        return a.players - b.players;
                    } else {
                        return b.players - a.players;
                    }
                })
                break;
        }
    },
    controlTableRange: function (table) {
        var range, value;
        var result;
        switch (parseInt(table.gameID)) {
            case 1:
            case 3:
                range = [499, 999, 2499, 4999];
                value = table.forcedBet.split('/');
                value = value[0];
                if (value < range[0]) {
                    result = 'tiny';
                } else if (value >= range[0] && value < range[1]) {
                    result = 'small'
                } else if (value >= range[1] && value < range[2]) {
                    result = 'medium'
                } else if (value >= range[2] && value < range[3]) {
                    result = 'large'
                } else {
                    result = 'vip'
                }
                break;
            case 6:
            case 15: // todo

                range = [999, 1999, 4999, 9999];
                value = table.forcedBet.split('/');
                value = value[0];
                if (value < range[0]) {
                    result = 'tiny';
                } else if (value >= range[0] && value < range[1]) {
                    result = 'small'
                } else if (value >= range[1] && value < range[2]) {
                    result = 'medium'
                } else if (value >= range[2] && value < range[3]) {
                    result = 'large'
                } else {
                    result = 'vip'
                }
                break;
            case 2:
            case 11:
                range = [1999, 4999, 9999, 19999];
                value = parseInt(table.forcedBet);
                if (value < range[0]) {
                    result = 'tiny';
                } else if (value >= range[0] && value < range[1]) {
                    result = 'small'
                } else if (value >= range[1] && value < range[2]) {
                    result = 'medium'
                } else if (value >= range[2] && value < range[3]) {
                    result = 'large'
                } else {
                    result = 'vip'
                }
                break;
            case 12:
            case 20:
                range = [1999, 3999, 6999, 19999];
                value = parseInt(table.forcedBet);
                if (value < range[0]) {
                    result = 'tiny';
                } else if (value >= range[0] && value < range[1]) {
                    result = 'small'
                } else if (value >= range[1] && value < range[2]) {
                    result = 'medium'
                } else if (value >= range[2] && value < range[3]) {
                    result = 'large'
                } else {
                    result = 'vip'
                }
                break;
            case 13:
            case 14:
            case 16:
                range = [1999, 3999, 6999, 19999];
                value = table.forcedBet.split('/');
                value = value[0];
                if (value < range[0]) {
                    result = 'tiny';
                } else if (value >= range[0] && value < range[1]) {
                    result = 'small'
                } else if (value >= range[1] && value < range[2]) {
                    result = 'medium'
                } else if (value >= range[2] && value < range[3]) {
                    result = 'large'
                } else {
                    result = 'vip'
                }
                break;
            default:
                break;
        }
        return result;
    },
    formatNumber: (number) => {
        if (typeof number == 'undefined') return

        if (number.toString().indexOf('/') !== -1) {
            var _n1 = _format(number.toString().split('/')[0]);
            var _n2 = _format(number.toString().split('/')[1]);
            return _n1 + '/' + _n2;
        } else {
            number = parseInt(number);
            number = _format(number);
            return number;
        }

        function _format(number) {
            if (number >= 1000000) {
                number = Math.round(number / 100000) / 10 + 'm';
            } else if (number >= 1000) {
                number = Math.round(number / 100) / 10 + 'k';
            }
            return number;
        }
    },
    getHeadUrl: function (imgUrl) {
        var url;
        if (imgUrl.substr(0, 6) == 'https:' || imgUrl.substr(0, 5) == 'http:') {
            url = imgUrl;
        } else {
            url = store.state.network.apiUrls.apiServerUrl + imgUrl;
        }
        return url;
    },
    getSpeed(speed) {
        var res = ''
        if (speed == '1') {
            res = 'regular';
        } else if (speed == '2') {
            res = 'turbo';
        } else if (speed == '3') {
            res = 'hyper';
        }
        return res
    },
    getTime: function (date) {
        let diff = Math.abs(date);
        var days = Math.floor(diff / (60 * 60 * 24));
        let hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
        let minutes = Math.floor((diff % (60 * 60)) / (60));
        if (days <= 0 && hours <= 0 && minutes <= 0) {
            minutes = 1;
        }

        let hour = hours.toString();
        let min = minutes.toString();

        let result = {
            time: undefined,
            date: {
                day: undefined,
                month: undefined,
                year: undefined
            },
            days: days
        }

        if (hour.length == 1) {
            hour = '0' + hour
        }

        if (min.length == 1) {
            min = '0' + min;
        }
        result.time = hour + 'h' + min + 'm';
        date = isNaN(date) ? 0 : date

        let newDate = lib.date.getDateText(date);
        result.day = newDate.day;
        result.month = newDate.month;
        result.year = newDate.year;

        return result;
    },
    getGameName: function (gameID) {
        let gameName = '';
        let gameShortName = '';
        let gameClass = '';
        let gameLimit = '';
        switch (gameID) {
            case 1:
                gameName = lib.game.getGameName(gameID, 0);
                gameClass = 'holdem';
                gameShortName = 'nlh';
                gameLimit = 'no limit';
                break;
            case 3:
                gameName = lib.game.getGameName(gameID);
                gameClass = 'omaha';
                gameShortName = 'plo';
                gameLimit = 'pot limit';
                break;
            case 6:
                gameName = lib.game.getGameName(gameID);
                gameClass = 'holdem6plus';
                gameShortName = '6+';
                gameLimit = 'no limit';
                break;
            case 10:
                gameName = lib.game.getGameName(gameID);
                gameClass = 'holdem5plus';
                gameShortName = '5+';
                gameLimit = 'no limit';
                break;
            default:
                break;
        }

        let response = {
            'name': gameName,
            'class': gameClass,
            'shortName': gameShortName,
            'limitType': gameLimit
        }

        return response;
    },
    getPrize: function (gtdPrizeAmt, isSatellite, entries, buyIn, satTicketAmt) {
        //Prize Type
        let prizeType = '';
        let prizeName = '';
        let prizePool = '';
        let isGTD = parseFloat(gtdPrizeAmt) > 0 ? true : false;
        let isSat = parseFloat(isSatellite) > 0 ? true : false;

        // PRIZE POOL
        // 1 Non-GTD Cash      - Entries * Buy-In
        // 2 GTD Cash          - Entries * Buy-In VS GTD (Whichever Bigger)
        // 3 Non-GTD Satellite - Entries * Buy-In / Target Amount, if remainder add '+'
        // 4 GTD isSatellite   - Entries * Buy-In VS GTD (Whichever Bigger) / TargetAmount, if remainder add '+'

        let totalPotSize = parseFloat(entries) * parseFloat(buyIn);
        let gtdAmt = parseFloat(gtdPrizeAmt);
        let satAmt = parseFloat(satTicketAmt);

        if (!isGTD && !isSat) {
            prizeType = '1';
            prizeName = 'Non-GTD Cash';
            prizePool = lib.num.abbrNum(totalPotSize, 3);
        } else if (isGTD && !isSat) {
            prizeType = '2';
            prizeName = 'GTD Cash';
            let baseAmt = gtdAmt > totalPotSize ? gtdAmt : totalPotSize;
            prizePool = lib.num.abbrNum(baseAmt, 3);
        } else if (!isGTD && isSat) {
            prizeType = '3';
            prizeName = 'Satellite';
            prizePool = Math.floor(totalPotSize / satAmt) + (totalPotSize % satAmt != 0 ? '+' : '')
        } else if (isGTD && isSat) {
            prizeType = '4';
            prizeName = 'GTD Satellite';
            let baseAmt = gtdAmt > totalPotSize ? gtdAmt : totalPotSize;
            prizePool = Math.floor(baseAmt / satAmt) + (baseAmt & satAmt != 0 ? '+' : '');
        }

        let response = {
            'type': prizeType,
            'name': prizeName,
            'pool': prizePool
        }

        return response;
    },
    getStatus: function (joinStatus, stage) {
        let eventClass = '';
        let status = '';
        let text = '';
        if (joinStatus == 1 && (stage == 1 || stage == 4)) {
            eventClass = 'joined';
            status = 'joined';
            text = 'starting in';
        } else {
            switch (stage) {
                case 1:
                case 4:
                    eventClass = 'registering';
                    status = 'registering';
                    text = 'starting in';
                    break

                case 2:
                    eventClass = 'latereg';
                    status = 'late reg';
                    text = 'closes in';
                    break

                case 3:
                case 5:
                    eventClass = 'live';
                    status = 'live';
                    text = 'running for';
                    break
                case 6:
                    eventClass = 'completed';
                    status = 'completed';
                    text = 'finished in';
                    break;
            }
        }

        let response = {
            'class': eventClass,
            'name': status,
            'text': text
        }

        return response;
    },
    getBuyIn: function (tourney) {
        if (!tourney.tyid)
            return
        // param - isLvTax, buyIn, tax, lvBuyIn, lvTax, currentLv*
        let buyInDisplay = '';
        let param = {
            isLvTax: tourney.isLvTax,
            buyIn: tourney.buyIn,
            tax: tourney.tax,
            lvBuyIn: tourney.lvBuyIn,
            lvTax: tourney.lvTax
        };

        if (parseInt(param.isLvTax) > 0) {
            let currLvBuyIn = param.lvBuyIn.reg;
            let currLvTax = param.lvTax.reg;
            let showCurrentLv = false;

            if (typeof param.currentLv != 'undefined') {
                currLvBuyIn = param.lvBuyIn.reEntry;
                currLvTax = param.lvTax.reEntry;
                showCurrentLv = true;
            }

            if (showCurrentLv) {
                let lvl = parseInt(param.currentLv) + 1 > 10 ? 10 : parseInt(param.currentLv) + 1;
                buyInDisplay = currLvBuyIn[lvl] > 0 ? currLvBuyIn[lvl] : lib.str.translate('LB_02234');
                buyInDisplay += currLvTax[lvl] > 0 ? ' + ' + currLvTax[lvl] : '';
            } else {
                if (lib.util.checkArrRepeatVal(currLvBuyIn)) {
                    if (parseInt(currLvBuyIn[0]) == 0) {
                        buyInDisplay = lib.str.translate('LB_02234');
                    } else {
                        let decimal = currLvBuyIn[0].toString().includes('.') ? 2 : 0;
                        buyInDisplay = lib.num.checkNumCommas(lib.num.roundUpFixed(currLvBuyIn[0], decimal));
                    }
                } else {
                    buyInDisplay = lib.str.translate('LB_01659');
                }

                buyInDisplay += ' + ' + lib.str.translate('LB_02221');
            }
        } else {
            if (parseFloat(param.buyIn) == 0) {
                buyInDisplay = lib.str.translate('LB_02234');
            } else {
                let decimal = param.buyIn.toString().includes('.') ? 2 : 0;
                buyInDisplay = lib.num.checkNumCommas(lib.num.roundUpFixed(param.buyIn, decimal));
            }

            if (parseFloat(param.tax) != 0) {
                let taxDcm = param.buyIn.toString().includes('.') ? 2 : 0;
                buyInDisplay += ' + ' + lib.num.checkNumCommas(lib.num.roundUpFixed(param.tax, taxDcm));
            }
        }

        return buyInDisplay;
    },
    getBtnSetting: function (state) {
        let result = {};

        switch (state) {
            case 'register':
                result = {
                    numOfBtn: 'one',
                    btnState: 'register',
                    btnText: 'register',
                    editDisabled: true,
                    mainDisabled: false
                };
                break

            case 'unregister':
                result = {
                    numOfBtn: 'two',
                    btnState: 'unregister',
                    btnText: 'unregister',
                    editDisabled: false,
                    mainDisabled: false
                };
                break

            case 're-enter':
                result = {
                    numOfBtn: 'one',
                    btnState: 're-enter',
                    btnText: 're-enter',
                    editDisabled: false,
                    mainDisabled: false
                };
                break

            case 'full':
                result = {
                    numOfBtn: 'one',
                    btnState: 'full',
                    btnText: 'full',
                    editDisabled: true,
                    mainDisabled: true
                };
                break

            case 'closed':
                result = {
                    numOfBtn: 'one',
                    btnState: 'closed',
                    btnText: 'closed',
                    editDisabled: true,
                    mainDisabled: true
                };
                break

            case 'rejoin':
                result = {
                    numOfBtn: 'one',
                    btnState: 're-join',
                    btnText: 'take seat',
                    editDisabled: true,
                    mainDisabled: false
                };
                break
        }

        return result;
    },
    msToTime: function (completed, ms) {
        var weeks, days, hours, minutes, sec

        if (completed) {
            weeks = Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
            days = Math.floor(ms / (24 * 60 * 60 * 1000));
            var daysms = ms % (24 * 60 * 60 * 1000);
            hours = Math.floor((daysms) / (60 * 60 * 1000));
            var hoursms = ms % (60 * 60 * 1000);
            minutes = Math.floor((hoursms) / (60 * 1000));
            var minutesms = ms % (60 * 1000);
            sec = Math.floor((minutesms) / (1000));
        } else {
            weeks = Math.floor((ms / 86400) / 7);
            days = Math.floor(ms / 86400);
            hours = Math.floor((ms - (days * 86400)) / 3600);
            minutes = Math.floor((ms - (days * 86400) - (hours * 3600)) / 60);
            sec = Math.floor((ms - (days * 86400) - (hours * 3600) - (minutes * 60)));
        }
        weeks = (weeks < 10) ? "0" + weeks : weeks;
        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        sec = (sec < 10) ? "0" + sec : sec;

        return [weeks, days, hours, minutes, sec];
    },
    setEventStatusLine: function (tourney, rank) {
        let statusLine = '';
        let tnZone = "ZZ";
        let tnFormat = "DD MMM YYYY ddd h:mm A";

        if (tourney.stage == 6) {
            let tnEndTime = lib.moment(tourney.endTime).format(tnFormat) + ' GMT ' + lib.moment(tourney.endTime).format(tnZone);
            //Tourney completed
            if (tourney.type == 1) {
                statusLine = lib.str.translate('LB_01886');
                statusLine = statusLine.replace('(+datetime+)', tnEndTime);
            } else {
                statusLine = lib.str.translate('LB_01772');
                statusLine = statusLine.replace('(+datetime+)', tnEndTime);
            }
        } else {
            if (tourney.leftTime >= 0) {
                //Before start
                if (tourney.type == 1) {
                    statusLine = lib.str.translate('LB_01888');
                    statusLine = statusLine.replace('(+num+)', lib.num.checkNumCommas(tourney.minEntry));
                } else {
                    let tnTime = lib.moment(tourney.tourneyTime).format(tnFormat) + ' GMT ' + lib.moment(tourney.tourneyTime).format(tnZone);
                    statusLine = lib.str.translate('LB_01774');
                    statusLine = statusLine.replace('(+datetime+)', tnTime);
                }
            } else {
                //Tourney started
                let playerCount = 0;

                if (typeof rank[1] != "undefined") {
                    let idxArr = Object.keys(rank);

                    idxArr.forEach((idx) => {
                        if (rank[idx].length > 0) {
                            rank[idx].forEach((entry) => {
                                if (tourney.bullets > 1) {
                                    if (entry.balanceChips > 0 || entry.balanceBullets > 0) playerCount++;
                                } else {
                                    if (entry.balanceChips > 0) playerCount++;
                                }
                            });
                        }
                    });
                }

                if (tourney.type == 1) {
                    statusLine = lib.str.translate('LB_01887');
                    statusLine = statusLine.replace('(+num+)', playerCount);
                } else {
                    statusLine = lib.str.translate('LB_01773');
                    statusLine = statusLine.replace('(+num+)', playerCount);
                }
            }
        }
        return statusLine
    }
}

