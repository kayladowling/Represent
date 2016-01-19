module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        files: {
          'client/dist/app.dependencies.js': ['client/bower_components/jquery/dist/jquery.js',
          'client/bower_components/Materialize/dist/js/materialize.js', 'client/bower_components/angular/angular.js',
          'client/bower_components/angular-material/angular-material.js', 'client/bower_components/angular-animate/angular-animate.js',
          'client/bower_components/angular-aria/angular-aria.js', 'client/bower_components/angular-ui-router/release/angular-ui-router.js',
          'client/bower_components/angular-materialize/src/angular-materialize.js',
          'client/bower_components/progressbar.js/dist/progressbar.js'],
          'client/dist/app.js': ['client/app.js', 'client/components/results/resultsCtrl.js',
          'client/components/search/searchCtrl.js', 'client/auth/register.js', 'client/auth/login.js',
          'client/auth/logout.js', 'client/services/handleRequest.js', 'client/directives/directives.js',
          'client/directives/stateMap.js', 'client/directives/region.js', 'client/factories/dataCache.js',
          'client/factories/errors.js', 'client/components/search/stateMapCtrl.js', 'client/components/search/byStateCtrl.js',
          'client/components/results/byDistrictResultsCtrl.js', 'client/components/results/byStateResultsCtrl.js',
          'client/components/filters/filters.js']
        }
    }
  },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'client/dist/app.min.js': ['client/dist/app.js'],
          'client/dist/app.dependencies.min.js': ['client/dist/app.dependencies.js']
        }
      }
    },

    jshint: {
      files: [
        'index.js',
        'server.js',
        // components folder
        'components/**/*.js',
        // services folder
        'services/**/*.js',
        // client folder
        'public/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
        'client/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files:[{
          src: ['client/styles.css'],
          dest: 'client/dist/styles.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js'
        ],
        tasks: [
        'concat',
        'uglify'
        ]
      },
      css: {
        files: 'client/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function(target){
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
    });

    grunt.registerTask('build', [
      'concat',
      'uglify',
      'cssmin',
      'jshint',
    ]);

    grunt.registerTask('upload', function(n) {
      if(grunt.option('prod')) {
        grunt.task.run(['shell:prodServer']);
      } else {
        grunt.task.run([ 'server-dev' ]);
      }
    });

    grunt.registerTask('deploy', [
      'build',
      'upload'
    ]);
};
