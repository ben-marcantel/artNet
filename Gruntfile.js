module.exports = function(grunt) {

    grunt.initConfig({
        "angular-builder": {
            options: {
                mainModule: "docPortal",
                externalModules: ["ngRoute"]
            },
            app: {
                src: "../client/**/*.js",
                dest: "../client/dist/project.js"
            }
        },
      jshint: {
        options: {
          predef: [ "document", "console", "$" ],
          esnext: true,
          globalstrict: true,
          globals: {"angular": true} 
        },
        files: ['./client/**/*.js']
      },
      sass: {
        dist: {
          files: {
            './client/css/main.css': './client/sass/main.scss'
          }
        }
      },
      watch: {
        javascripts: {
          files: ['./client/**/*.js'],
          tasks: ['jshint']
        },
        sass: {
          files: ['./client/sass/**/*.scss'],
          tasks: ['sass']
        }
      }
    });
  
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
    grunt.registerTask('default', ['jshint', 'sass', 'watch']);
  };