module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/test.ts'
        ],
        browsers: ['Chrome'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        singleRun: true
    });
};