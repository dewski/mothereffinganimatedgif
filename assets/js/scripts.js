(function(window, $){
    
    var App = {};
    App.MAX_BYTES = 102400; // 100 KB
    App.timeline = [];

    $(function() {
        var fileList = $(".files ul").empty();
        var opts = {
            on: {
                loadend: function(e, file) {
                    fileList.append("<li><img src='"+e.target.result+"' /></li>");
                    
                    var originalimg = new Image();
                    originalimg.src = e.target.result;
                    App.timeline.push(originalimg);
                },
                groupstart: function(group) {
                },
                groupend: function(group) {
                }
            }
        };

        FileReaderJS.setupDrop(document.body, opts);
        FileReaderJS.setupClipboard(document.body, opts);

    });

    $('.play').on('click', function(e) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');

        var encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(300);
        canvas.width = 75;
        canvas.height = 75;
        encoder.setSize(75,75);

        encoder.start();

        for(var i=0; i<App.timeline.length; i++) {
            var animframe = App.timeline[i];
            var ctx = canvas.getContext('2d');

            ctx.drawImage(animframe, 0, 0, animframe.width, animframe.height, 0, 0, canvas.width, canvas.height);
            
            encoder.addFrame(ctx);    
        }

        encoder.finish();
        $('#animresult').attr('src', 'data:image/gif;base64,'+$.base64.encode(encoder.stream().getData()));

        return false;
    });

})(window, jQuery);
