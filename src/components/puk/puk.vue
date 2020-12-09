<template>
	<div>
        <span class="puk_span">{{gap}}:{{timeFormat}}</span>
        <div class="div1">
            <span>Test scss blue</span>
            <div class="div2">
                <span> Test scss red </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "puk",
        props: ['gap', 'time'],
        computed: {
            timeFormat: function(){
                return this.timeStr + ' ' + this.time.toLocaleString();
            }
        },
        data() {
            return {
                timeStr: '時間為 '
            }
        },
        methods: {
        }

    }
</script>

<style lang="scss">

	.puk_span {
        font-size: 18px;
    }

    .div1 {
        color: #0000ff;

        .div2 {
            color: #ff0000;
        }
    }
</style>
