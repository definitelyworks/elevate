var bowerPath           =  'bower_components/',
    baseJsVendorPath    =  bowerPath+'jquery/dist/';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/app.min.css': 'src/scss/app.scss'
        }
      },
      dev: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          'assets/css/app.css': 'src/scss/app.scss'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        banner: '\n',
      },
      vendor: {
        src: [
          baseJsVendorPath  + 'jquery.js',
          bowerPath  + 'css3-mediaqueries-js/css3-mediaqueries.js',

          //your script
          //'src/js/slider.js'
        ],

        dest: 'assets/js/app.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'assets/js/app.min.js':['js/app.js']
        }
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['development-task']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['development-task']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('development-task', ['sass:dev','concat:vendor']);
  grunt.registerTask('production-task', ['sass:dist','uglify']);

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);
}
