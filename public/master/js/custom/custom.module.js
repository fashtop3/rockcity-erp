(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.order', ['ngFileUpload', 'app.bootstrapui', 'naif.base64'])
        .constant("baseURL", "/api/")
})();