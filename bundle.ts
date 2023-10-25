const scopackager = require('simple-scorm-packager');

scopackager(
    {
        version: '2004 4th Edition',
        organization: 'Showpad',
        title: 'SCORM Test Application',
        language: 'en-US',
        identifier: '00',
        masteryScore: 80,
        startingPage: 'index.html',
        source: './dist',
        package: {
            version: '0.0.1',
            zip: true,
            outputFolder: './scormPackages',
        },
    },
    function (msg) {
        console.log(msg);
    }
);
