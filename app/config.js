var config = (function(){
    var self = {};

    var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if(app) {
        // PhoneGap application
        self.host = 'http://lit-temple-4147.herokuapp.com';
    } else {
        // Web page
        self.host = '';
    }

    return self;
})();