module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');

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
    react: {
      default: {
        files: [{
          expand: true,
          cwd: 'assets/jsx',
          src: ['**/*.jsx'],
          dest: 'build/js/tmp',
          ext: '.js'
        }]
      }
    },
    uglify: {
      options: {
        report: 'min',
        sourceMap: true,
        sourceMapName: 'static/js/sourcemap.map'
      },
      prod: {
        files: {
          'build/js/exifdata.min.js': [
            'assets/js/exif.js',
            'assets/js/react-0.12.0.js',
            'build/js/exifinfo.js'
          ]
        }
      },
      dev: {
        files: {
          'static/js/exifdata.min.js': [
            'assets/js/exif.js',
            'assets/js/react-0.12.0.js',
            'build/js/tmp/exifinfo.js'
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
          cwd: 'assets/js/vendor',
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
          cwd: 'assets/js/vendor',
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
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace:  true
        },
        files: {
          'build/index.html': 'public/index.html',
          'build/photos.html': 'public/photos.html'
        }
      }
    },
    compress: {
      options: {
        mode: 'gzip',
        level: 1,
        pretty: true
      },
      prod: {
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
        }, {
          expand: true,
          cwd: 'build',
          src: ['**/*.html'],
          dest: 'public'
        }]
      },
      prod_html: {
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*.html'],
          dest: 'public'
        }]
      }
    },
    clean: {
      build: [
        "static/assets",
        "static/thumb",
        "static/css",
        "static/js",
        "build/"
      ],
      prod: [
        "build",
        "public"
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
          's3cmd -c ~/.s3cfg-personal sync --delete-removed --cf-invalidate-default-index --exclude=./public/index.html --exclude=./public/photos.html --exclude=./public/thumb/ ./public/* s3://janalonzo.com/',
          's3cmd -c ~/.s3cfg-personal -m text/html --cf-invalidate --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=86400" put ./public/index.html s3://janalonzo.com/',
          's3cmd -c ~/.s3cfg-personal -m text/html --cf-invalidate --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=86400" put ./public/photos.html s3://janalonzo.com/',
          's3cmd -c ~/.s3cfg-personal -m image/jpeg --cf-invalidate --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" sync --delete-removed ./public/thumb/* s3://janalonzo.com/thumb/',
          's3cmd -c ~/.s3cfg-personal -m image/jpeg --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate sync--delete-removed ./public/assets/bg.jpg s3://janalonzo.com/assets/',
          's3cmd -c ~/.s3cfg-personal -m image/png --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate sync --delete-removed ./public/assets/profile.png s3://janalonzo.com/assets/',
          's3cmd -c ~/.s3cfg-personal -m text/css --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate sync --delete-removed ./public/css/* s3://janalonzo.com/css/',
          's3cmd -c ~/.s3cfg-personal -m text/javascript --add-header="Content-Encoding: gzip" --add-header="Cache-Control: max-age=31536000" --cf-invalidate sync --delete-removed ./public/js/* s3://janalonzo.com/js/',
          's3cmd -c ~/.s3cfg-personal --add-header="Cache-Control: max-age=31536000" --cf-invalidate sync --delete-removed ./public/fonts/* s3://janalonzo.com/fonts/'
        ].join('&&')
      },
      sync: {
        // Sync non-image, css assets
        command: 's3cmd -c ~/.s3cfg-personal sync --delete-removed --cf-invalidate-default-index --exclude=./public/index.html --exclude=./public/photos.html --exclude=./public/thumb/ ./public/* s3://janalonzo.com/'
      }
    }
  });

  grunt.registerTask('default', [
    'clean:build',
    'clean:prod',
    'newer:cssmin:prod',
    'newer:react:default',
    'newer:uglify:prod',
    'newer:copy:prod',
    'newer:imagemin:prod',
    'newer:imageoptim:prod',
    'responsive_images:prod',
    'newer:compress:prod'
  ]);

  grunt.registerTask('dev', [
    'clean:build',
    'newer:cssmin:dev',
    'newer:react:default',
    'newer:uglify:dev',
    'newer:copy:dev',
    'newer:imagemin:dev',
    'responsive_images:dev'
  ]);

  grunt.registerTask('deploy', [
    'shell:build',
    'htmlmin:prod',
    'compress:prod_html',
    'shell:deploy'
  ]);
};
