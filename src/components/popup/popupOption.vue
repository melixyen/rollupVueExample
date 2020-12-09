<template>
    <div class="popupWarpper" v-show="isShowMessageBox">
        <div class="popupMain">
            <div class="header">
                <i class="icon-arrow-left"></i>
                <h4 class="modal-title" v-text="popup.title">
                </h4>
                <i class="icon-cross" style="cursor: pointer;"></i>
            </div>
            <div class="content">
                <div class="jsContent" v-text="popup.content">
                </div>
            </div>
            <div class="footer">
                <div class="btn btn-left" v-on:click="submit('no')" v-if="popup.boolean">
                    NO
                </div>
                <div class="btn btn-right" v-on:click="submit('yes')" v-if="popup.boolean">
                    YES
                </div>
                <div class="btn btn-one" v-on:click="submit('ok')" v-if="!popup.boolean">
                    OK
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popuoOption",
        data() {
            return {
                isShowMessageBox: false,
                popup: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showMsgBox: function (popup) {
                this.popup = popup;
                this.isShowMessageBox = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                // 返回promise物件
                return this.promise;
            },
            submit: function (val) {
                this.resolve(val);
                this.isShowMessageBox = false;
            }
        }

    }
</script>

<style lang="scss">
    @import '../../style/scss/_all_variables.scss';
    @import '../../style/scss/_all_mixins.scss';
    @import '../../style/scss/_all_extends.scss';
    @import '../../style/template/popupOption';
</style>