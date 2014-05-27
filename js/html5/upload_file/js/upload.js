/**
 *  html5 upload file
 *  author : lyview@gmail.com
 */
var iBytesHas = 0 , iBytesTotal = 0 , oTimer = 0 , sFileSize = '', html5Upload = {};
var _$ = function (id) {
    return typeof id != "object" ? document.getElementById(id) : id;
};
html5Upload = {
    allowType: /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/,
    fileSize: 0,
    prvLoaded: 0,
    uploadUrl: 'upload.php',
    secondsToTime: function (secs) {
        var hr = Math.floor(secs / 3600) , min = Math.floor(secs - (hr * 3600) / 60) , sec = Math.floor(secs - (hr * 3600) - (min * 60));
        if (hr < 10) {
            hr = "0" + hr;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (hr) {
            hr = "00";
        }
        return hr + ':' + min + ':' + sec;
    },
    bytesToSize: function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    },
    fileSelected: function (id) {
        var oFile = _$(id).files[0];
        if (!this.allowType.test(oFile.type)) {
            alert("禁止上传此类型文件");
            return false;
        }
        var oImage = _$("preview") , _self = this;
        // html5 FileReader
        var oReader = new FileReader();
        oReader.onload = function (e) {
            oImage.src = e.target.result;
            oImage.onload = function () {
                _self.fileSize = _self.bytesToSize(oFile.size);
                _$('fileinfo').style.display = 'block';
                _$('filename').innerHTML = '文件名: ' + oFile.name;
                _$('filesize').innerHTML = '大小: ' + _self.fileSize;
                _$('filetype').innerHTML = '类型: ' + oFile.type;
                _$('filedim').innerHTML = '分辨率: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;
            };
        }
        oReader.readAsDataURL(oFile);
    },
    startUploading: function () {
        this.prvLoaded = 0;
        var oPropress = _$("upload_response");
        oProgress.style.display = 'block';
        oProgress.style.width = '0px';
        // get form data for POSTing
        var vFD = new FormData(_$('upload_form'));
        // create XMLHttpRequest object, adding few event listeners, and POSTing our data
        var oXHR = new XMLHttpRequest();
        oXHR.upload.addEventListener('progress', this.uploadProgress, false);
        oXHR.addEventListener('load', this.uploadFinish, false);
        oXHR.addEventListener('error', this.uploadError, false);
        oXHR.addEventListener('abort', this.uploadAbort, false);
        oXHR.open('POST', this.uploadUrl);
        oXHR.send(vFD);
        // set inner timer
        oTimer = setInterval(this.doInnerUpdates, 300);
    },
    doInnerUpdates: function () {

    },
    uploadProgress: function () {

    },
    uploadFinish: function () {

    },
    uploadError: function (e) {
        clearInterval(oTimer);
    },
    uploadAbort: function (e) {
        clearInterval(oTimer);
    },
    clearErrors: function () {
        for (var i = 0 , argLen = arguments.length; i < argLen; i++) {
            _$(arguments[i]).sytle.display = none;
        }
    }
}