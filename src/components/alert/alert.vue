<template>
	<transition name="drop">
		<div class="notifyjs-corner" style="left: 45%;" v-if="isShow">
			<div class="notifyjs-wrapper notifyjs-hidable">
				<div class="notifyjs-container" style="">
					<div class="notifyjs-bootstrap-base" :class="'notifyjs-bootstrap-'+alert.type">
						<div class="notifyjs-arrow"></div>
						<span v-text="alert.msg"></span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
    export default {
        name: "alert",
        data() {
            return {
                isShow: false,
                alert: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showAlertBox: function (popup) {
                if(typeof(popup)=='string') popup = {msg: popup};
                popup.type = popup.type || 'info';
                popup.duration = popup.duration || 5000;
                this.alert = popup;
                this.isShow = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                setTimeout(() => {
                    this.isShow = false;
                }, this.alert.duration)
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
	@import '../../style/scss/_app_plugin-overrides.scss';

	.drop-enter-active {
		transition: all .3s linear;
	}

	.drop-leave-active {
		transition: all .3s ease;
	}

	.drop-leave, .drop-enter-active {
		top: 5px;
	}

	.drop-enter, .drop-leave-active {
		top: -30px;
	}
</style>
