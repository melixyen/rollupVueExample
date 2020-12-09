import Vue from 'vue'
import Alert from './alert.vue'

const AlertBox = Vue.extend(Alert);

Alert.install = (Vue) => {
    // Vue.prototype.$popup = ConfirmBox;
    const MessageBoxInstance = Vue.extend(AlertBox);
    let currentMsg, instance;
    const initInstance = () => {
        // 例項化vue例項
        currentMsg = new MessageBoxInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        // document.getElementById('app').appendChild(msgBoxEl);
        document.body.appendChild(msgBoxEl);
    };
    // 在Vue的原型上新增例項方法，以全域性呼叫
    Vue.prototype.$alert = function (options) {
        if (!instance) {
            initInstance();
        }

        return currentMsg.showAlertBox(options);
    };

    Alert.mainFunction = Vue.prototype.$alert;
};

export default Alert
