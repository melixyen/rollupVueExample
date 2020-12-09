if(typeof(cordova)=='undefined') var cordova = {};
export default {
    getOS: function(){
        // var osna = "Unknown";
        // if (navigator.appVersion.indexOf("Windows")!=-1) osna="Windows";
        // if (navigator.appVersion.indexOf("Mac")!=-1) osna="OSX";
        // if (navigator.appVersion.indexOf("X11")!=-1) osna="Unix";
        // if (navigator.appVersion.indexOf("Linux")!=-1) osna="Linux";
        // return osna;

        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    },
    getCordovaPermission: function () {
        if(!!window.cordova && this.getOS() == 'iOS'){
            this.getMicPermission()
            this.getCameraPermission()
        }
    },
    getMicPermission: function () {
        cordova.plugins.diagnostic.requestMicrophoneAuthorization(
            function (status) {
                if (status !== window.cordova.plugins.diagnostic.permissionStatus.GRANTED && status != "authorized") {
                    if (this.getOS() == 'iOS') {
                        alert('Microphone Access is required. Turn on Microphone Access under Settings > Privacy > Microphone > ' + process.env.VUE_APP_MODE_NAME);
                    } else {
                        alert("Microphone Access is required. Turn on Microphone Access under Settings.");
                    }
                }
            }
        );
    },
    getCameraPermission: function (cb) {
        var res = true
        cordova.plugins.diagnostic.requestCameraAuthorization(
            function (status) {
                if (status !== cordova.plugins.diagnostic.permissionStatus.GRANTED && status != "authorized") {
                    res = false;

                    if (this.getOS() == 'iOS') {
                        alert('Camera Access is required. Turn on Camera Access under Settings > Privacy > Camera > ' + process.env.VUE_APP_MODE_NAME);
                    } else {
                        alert("Camera Access is required. Turn on Camera Access under Settings.");
                    }
                }

                if (typeof cb === 'function') {
                    cb(res)
                }
            }, {
                externalStorage: false
            }
        );
    },
}