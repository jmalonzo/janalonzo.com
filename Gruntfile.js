module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-critical');

  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    cssmin: {
      options: {
        report: 'min'
      },
      default: {
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
          dest: 'tmp',
          ext: '.js'
        }]
      }
    },
    uglify: {
      options: {
        report: 'min'
      },
      prod: {
        files: {
          'build/js/exifdata.min.js': [
            'assets/js/exif.js',
            'assets/js/react-0.12.0.js',
            'tmp/exifinfo.js'
          ]
        }
      },
      dev: {
        files: {
          'static/js/exifdata.min.js': [
            'assets/js/exif.js',
            'assets/js/react-0.12.0.js',
            'tmp/exifinfo.js'
          ]
        }
      }
    },
    copy: {
      options: {
        encoding: 'utf-8',
        timestamp: true
      },
      images: {
        files: [{
          expand: true,
          cwd: 'assets/photos',
          src: ['**/*.{jpg,png}'],
          dest: 'static/thumb'
        }, {
          expand: true,
          cwd: 'assets/images',
          src: ['**/*.{jpg,png,ico}'],
          dest: 'static/assets'
        }]
      },
      assets: {
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
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: ['**/*.js'],
          dest: 'static/js'
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
    imagemin: {
      prod: {
        files: [{
          expand: true,
          cwd: 'assets/photos',
          src: ['**/*.{png,jpg}'],
          dest: 'build/images'
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
          width: 320
        },{
          name: 'small',
          width: 640
        },{
          name: 'medium',
          width: 1024
        },{
          name: 'large',
          width: 2048
        }]
      },
      prod: {
        files: [{
          expand: true,
          src: ['**/*.{png,jpg,gif}'],
          cwd: 'build/images',
          dest: 'static/thumb'
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
      options: {
        removeComments: true,
        collapseWhitespace:  true
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: '**/*.html',
          dest: 'build/'
        }]
      }
    },
    clean: {
      build: [
        "static/css",
        "static/js",
        "build/"
      ],
      prod: [
        "build",
        "public",
        "tmp"
      ],
    },
    aws: grunt.file.readJSON("credentials.json"),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "janalonzo.com",
        region: "ap-southeast-2",
        gzip: true,
        dryRun: false,
        headers: {
          CacheControl: 31536000,
        },
        charset: "utf-8"
      },
      assets: {
        cwd: "public/assets",
        src: "**/*.{jpg,png,ico}",
        dest: "assets/"
      },
      css: {
        cwd: "public/css",
        src: "**/*.css",
        dest: "css/"
      },
      js: {
        cwd: "public/js",
        src: "**/*.js",
        dest: "js/"
      },
      fonts: {
        cwd: "public/fonts",
        src: "**",
        dest: "fonts/"
      },
      images: {
        cwd: "public/thumb",
        src: "**",
        dest: "thumb/"
      },
      markup: {
        options: {
          headers: {
            CacheControl: 86400
          }
        },
        cwd: "public",
        src: "**/*.{html,xml}"
      }
    },
    cloudfront: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        distributionId: 'E26EUWWL0LUUIU',
        invalidations: [
          '/index.html',
          '/photos.html',
          '/css/site.min.css',
          '/js/exifdata.min.js'
        ]
      }
    },
    shell: {
      options: {
        stderr: false
      },
      build: {
        command: 'hugo --uglyUrls=true'
      }
    },
    critical: {
      test: {
        options: {
          base: "./",
          css: [
            'assets/css/site.css',
            'assets/css/bootstrap.css',
            'assets/css/bootstrap-theme.css'
          ],
          width: 320,
          height: 480
        },
        src: './public/photos/newport-rocks.html',
        dest: './build/css/critical.css'
      }
    }
  });

  grunt.registerTask('dev', [
    'clean:build',
    'newer:cssmin',
    'newer:react:default',
    'newer:uglify:dev',
    'newer:copy:assets',
    'newer:copy:assets',
    'newer:copy:images',
    'newer:responsive_images:dev'
  ]);

  grunt.registerTask('prod', [
    'clean:build',
    'clean:prod',
    'newer:cssmin',
    'newer:react:default',
    'newer:uglify:prod',
    'newer:copy:assets',
    'newer:copy:prod'
  ]);

  grunt.registerTask('prod-images', [
    'newer:copy:images',
    'newer:imagemin:prod',
    'newer:imageoptim:prod',
    'newer:responsive_images:prod'
  ]);

  grunt.registerTask('deploy', [
    'shell:build',
    'htmlmin:prod',
    'copy:prod_html',
    's3:css',
    's3:js',
    's3:fonts',
    's3:markup',
    'cloudfront'
  ]);

  /** Run hugo (shell:build) prior to running this */
  grunt.registerTask('deploy-images', [
    's3:assets',
    's3:images'
  ]);
  
};
