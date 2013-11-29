(function ($) {

  $.fn.uploadFile = function (url, options) {

    var deferred = $.Deferred(),
        promise  = deferred.promise(),
        file    = this.get(0).files[0];

    if (file && file.name) {

      var xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-File-Name', encodeURIComponent(file.name));
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');

      xhr.upload.addEventListener('progress', function (e) {
        deferred.notify(e, file);
      }, false);

      xhr.upload.addEventListener('load', function (e) {
        deferred.resolve(e, file);
      }, false);

      xhr.upload.addEventListener('error', function (e) {
        deferred.reject(e, file);
      }, false);

      xhr.send(file);

    } else {
      deferred.reject('file not present');
    }

    return promise;

  };

})(jQuery);