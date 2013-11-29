$(document).ready(function () {

  var $uploaded = $('#uploaded');

  $('#files').bind('change', function () {

    if (!this.files[0]) return;

    var item = document.createElement('li'),
        span = document.createElement('span'),
        prog = document.createElement('progress');

    span.textContent = this.files[0].name;

    item.appendChild(span);
    item.appendChild(prog);
    $uploaded.append(item);

    // commence file upload
    $(this).uploadFile('/?upload')

    // notify user of progress
    .progress(function (e, file) {
      prog.max = e.total;
      prog.value = e.loaded;
    })

    // notify user of completion
    .then(function (e, file) {
      var link = document.createElement('a');

      link.href = '/uploaded/' + encodeURIComponent(file.name);
      link.textContent = file.name;
      link.target = '_blank';

      item.removeChild(prog);
      item.removeChild(span);
      item.appendChild(link);
    })

    // notify user of errors if there are any
    .fail(function (e, file) {
      console.log(e);

      span.className = 'error';
      item.removeChild(prog);
    });

  });

});
