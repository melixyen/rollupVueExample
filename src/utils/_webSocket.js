// import store from '@/store'
import ws from '@/ws'

export default {
    methods: {
        wsInit(param) {
            console.log('wsInit')
            ws.init(param)
        },
        wsConnect() {
            console.log('wsConnect')
            ws.connect()
        },
        wsSend(param) {
            ws.send('42' + param)
        }
    }
}
