module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-imageoptim');

  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    cssmin: {
      options: {
        report: 'min'
      },
      prod: {
        files: {
          'build/css/site.min.css': [
            'assets/css/site.css'
          ]
        }
      },
      dev: {
        files: {
          'static/css/site.min.css': [
            'assets/css/site.css'
          ]
        }
      }
    },
    copy: {
      options: {
        encoding: 'utf-8',
        timestamp: true
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'assets/css/vendor',
          src: ['**/*.css'],
          dest: 'build/css'
        }, {
          expand: true,
          cwd: 'assets/js',
          src: ['**/*.js'],
          dest: 'build/js'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'assets/css/vendor',
          src: ['**/*.css'],
          dest: 'static/css'
        }, {
          expand: true,
          cwd: 'assets/js',
          src: ['**/*.js'],
          dest: 'static/js'
        }]
      }
    },
    imagemin: {
      prod: {
        files: [{
          expand: true,
          cwd: 'assets/photos',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'assets/photos',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'static/thumb'
        }, {
          expand: true,
          cwd: 'assets/images',
          src: ['**/*.{jpg,png}'],
          dest: 'static/assets'
        }]
      }
    },
    imageoptim: {
      prod: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quiteAfter: true
        },
        src: ['build/images']
      }
    },
    responsive_images: {
      options: {
        engine: 'im',
        newFilesOnly: true,
        sizes: [{
          name: 'xsmall',
          width: 640
        },{
          name: 'small',
          width: 1024
        },{
          name: 'medium',
          width: 2048
        },{
          name: 'large',
          width: 2560
        }]
      },
      prod: {
        files: [{
          expand: true,
          src: ['**/*.{png,jpg,gif}'],
          cwd: 'assets/photos',
          dest: 'build/images'
        }]
      },
      dev: {
        files: [{
          expand: true,
          src: ['**/*.{png,jpg,gif}'],
          cwd: 'assets/photos',
          dest: 'static/thumb'
        }]
      }
    },
    compress: {
      prod: {
        options: {
          mode: 'gzip',
          level: 1,
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'build/images',
          src: ['**/*.{jpg,png}'],
          dest: 'static/thumb'
        }, {
          expand: true,
          cwd: 'assets/images',
          src: ['**/*.{jpg,png}'],
          dest: 'static/assets'
        }, {
          expand: true,
          cwd: 'build/css',
          src: ['**/*.css'],
          dest: 'static/css'
        }, {
          expand: true,
          cwd: 'build/js',
          src: ['**/*.js'],
          dest: 'static/js'
        }]
      }
    },
    clean: {
      build: [
        "static/assets",
        "static/thumb",
        "static/css",
        "static/js",
        "public/",
        "build/"
      ],
      prod: [
        "build"
      ],
    },
    shell: {
      options: {
        stderr: false
      },
      build: {
        command: 'hugo --uglyUrls=true'
      },
      deploy: {
        // Deploy everything. Might need to separate image deployment
        // in the future
        command: [
          's3cmd -c ~/.s3cfg-personal sync --delete-removed --cf-invalidate-default-index --exclude=./public/thumb/ ~/Code/janalonzo.info/public/* s3://janalonzo.com/',
          's3cmd -c ~/.s3cfg-personal -m image/jpeg --cf-invalidate --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" put ~/Code/janalonzo.info/public/thumb/* s3://janalonzo.com/thumb/',
          's3cmd -c ~/.s3cfg-personal -m image/jpeg --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate put ~/Code/janalonzo.info/public/assets/bg.jpg s3://janalonzo.com/assets/',
          's3cmd -c ~/.s3cfg-personal -m image/png --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate put ~/Code/janalonzo.info/public/assets/profile.png s3://janalonzo.com/assets/',
          's3cmd -c ~/.s3cfg-personal -m text/css --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate put ~/Code/janalonzo.info/public/css/* s3://janalonzo.com/css/',
          's3cmd -c ~/.s3cfg-personal -m text/javascript --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate put ~/Code/janalonzo.info/public/js/* s3://janalonzo.com/js/',
          's3cmd -c ~/.s3cfg-personal --add-header="Cache-Control: max-age=31536000" --cf-invalidate put ~/Code/janalonzo.info/public/fonts/* s3://janalonzo.com/fonts/'
        ].join('&&')
      },
      sync: {
        // Sync non-image, css assets
        command: 's3cmd -c ~/.s3cfg-personal sync --delete-removed --cf-invalidate-default-index --exclude=./public/assets --exclude=./public/thumb/ --exclude=./public/css/ ~/Code/janalonzo.info/public/* s3://janalonzo.com/'
      }
    }
  });

  grunt.registerTask('default', [
    'clean:build',
    'cssmin:prod',
    'copy:prod',
    'imagemin:prod',
    'imageoptim:prod',
    'responsive_images:prod',
    'compress:prod'
  ]);

  grunt.registerTask('dev', [
    'clean:build',
    'cssmin:dev',
    'copy:dev',
    'imagemin:dev',
    'responsive_images:dev'
  ]);

  grunt.registerTask('deploy', [
    'shell:build',
    'shell:deploy',
  ]);
};
