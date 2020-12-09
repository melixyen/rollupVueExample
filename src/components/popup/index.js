import Vue from 'vue'
import Confirm from './popupOption.vue'

const ConfirmBox = Vue.extend(Confirm);

Confirm.install = (Vue) => {
    // Vue.prototype.$popup = ConfirmBox;
    const MessageBoxInstance = Vue.extend(ConfirmBox);
    let currentMsg, instance;
    const initInstance = () => {
    // 例項化vue例項
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
    };
    // 在Vue的原型上新增例項方法，以全域性呼叫
    Vue.prototype.$popup = function(options){
            if (!instance) {
                initInstance();
            }

            return currentMsg.showMsgBox(options);
    };

    Confirm.mainFunction = Vue.prototype.$popup;
};

export default Confirm