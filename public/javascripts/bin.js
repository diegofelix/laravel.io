$(function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // Save shortcut
    Mousetrap.bind(['command+s', 'ctrl+s'], function() {
        if ($('.editor')) {
            $('.editor-form').submit();
        }
        return false;
    });

    // Fork shorcut
    Mousetrap.bind('f', function() {
        if ($('.button.fork')) {
            $('.button.fork')[0].click();
        }
        return false;
    });

    // New shorcut
    Mousetrap.bind('n', function() {
        if ($('.button.new')) {
            $('.button.new')[0].click();
        }
        return false;
    });

    // Fork shorcut
    Mousetrap.bind('r', function() {
        if ($('.button.raw')) {
            $('.button.raw')[0].click();
        }
        return false;
    });

    // Setup tabby
    var tabbyOptions = { tabString:'    ' };
    $('.editor').focus().tabby(tabbyOptions);

    // Setup zClip
    $('.button.copy').zclip({
        path: '/javascripts/vendor/ZeroClipboard.swf',
        copy: $('.paste-url').text(),
        afterCopy: function() {
            toastr.info('Copied URL to clipboard! ' + $('.paste-url').text());
        }
    });

    var line = new String(window.location.hash).slice(1) - 1;

    setTimeout(function() {
        $('.selectable ol li:eq('+line+')').addClass('selected');
        $('.selectable ol li').each(function(key, element) {
            $(this).click(function() {
                var line = key + 1;
                window.location.hash = '#'+ line;
            });
        });
    }, 1);

    $(window).bind('hashchange', function() {
        var line = new String(window.location.hash).slice(1) - 1;
        $('.selectable ol li').removeClass('selected');
        $('.selectable ol li:eq('+line+')').addClass('selected');
    });
});




// // drag and drop file api stuff
// function handleFileSelect(e) {
//   e.stopPropagation();
//   e.preventDefault();

//   var files = e.dataTransfer.files;

//   $.each(files, function() {
//     var file = this;

//     // if ( ! file.type.match('text.*')) {
//     //   continue;
//     // }

//     var reader = new FileReader();

//     reader.onload = (function() {
//       return function(e) {
//         addFile(file.name, e.target.result);
//       };
//     })(file);

//     reader.readAsText(file);
//   });
// }

// function handleDragOver(e) {
//   e.stopPropagation();
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
// }

// function bindDragAndDrop() {
//   var dropZone = document.getElementById('drop_zone');
//   dropZone.addEventListener('dragover', handleDragOver, false);
//   dropZone.addEventListener('drop', handleFileSelect, false);
// }

// //
// function addFile(name, contents) {
//   var template = $('._file_template').html();

//   template = template.replace(/\|filename\|/g, name);
//   template = template.replace(/\|contents\|/g, contents);

//   $('._files').append(template);
// }

// // go
// $(function() {
//   bindDragAndDrop();
// });