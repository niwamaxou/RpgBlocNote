// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/js/**/*.js']
    },

    //concat all js files in specific orders
    concat: {
        dist: {
          src: ['public/js/app.js', 'public/js/AppRoutes.js', 'public/js/services/*.js',
           'public/js/interceptors/*.js', 'public/js/filter/*.js','public/js/controllers/*.js'],
          dest: 'public/dist/js/app.js',
        },
      },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': 'public/dist/js/app.js'
        }
      }
    },

    //unit testing
    karma: {
          options: {
            // point all tasks to karma config file
            configFile: 'test/karma-conf.js'
          },
          unit: {
            // run tests once instead of continuously
            singleRun: true
          }
        },


    // CSS TASKS ===============================================================
    // process the less file to style.css
    /*less: {
      build: {
        files: {
          'public/dist/css/style.css': 'public/src/css/style.less'
        }
      }
    },*/

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/css/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/css/style.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['concat', 'jshint', 'uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('default', ['cssmin', 'concat', 'jshint', 'uglify', 'concurrent']);
  grunt.registerTask('test', ['concat', 'karma']);
  grunt.registerTask('dist', ['jshint', 'concat', 'uglify'])
};