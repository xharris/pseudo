module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      less: {
          main: {
              src: ['less/main.less'],
              dest: 'main.css'
          },
          blankeui: {
              src: ['includes/blanke-kit/blanke-ui.less'],
              dest: 'includes/blanke-kit/blanke-ui.css'
          }
        },
      watch: {
            files: ["less/*", "includes/blanke-kit/*.less"],
            tasks: ["less"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}
