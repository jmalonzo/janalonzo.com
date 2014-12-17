module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-webp');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
          ],
          'static/css/cover.min.css': [
            'assets/css/cover.css'
          ],
          'static/css/blog.min.css': [
            'assets/css/blog.css'
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
      default: {
        files: {
          'static/js/site.min.js': [
            'assets/js/site.js',
            'assets/js/exif.js',
            'assets/js/react-0.12.0.js',
            'tmp/exifinfo.js',
          ],
          'static/js/styles.min.js': [
            'assets/js/styles.js'
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
        }, {
          expand: true,
          cwd: 'assets/fonts',
          src: ['**/*'],
          dest: 'static/fonts'
        }, {
          expand: true,
          cwd: 'assets',
          src: ['google7586b5755010558e.html'],
          dest: 'static'
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
    responsive_images: {
      options: {
        engine: 'im',
        newFilesOnly: false,
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
      default: {
        files: [{
          expand: true,
          src: ['**/*.{png,jpg,gif}'],
          cwd: 'assets/photos',
          dest: 'static/thumb'
        }]
      }
    },
    webp: {
      options: {
        preset: 'photo',
        verbose: true,
        quality: 80,
        metadata: 'exif'
      },
      default: {
        files: [{
          expand: true,
          src: ['**/*.{png,jpg}'],
          cwd: 'static/thumb',
          dest: 'static/thumb'
        }, {
          expand: true,
          src: ['**.*.jpg'],
          cwd: 'static/assets',
          dest: 'static/assets'
        }]
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace:  true
      },
      default: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: '**/*.html',
          dest: 'build/'
        }]
      }
    },
    clean: {
      default: [
        "static/",
        "build/",
        "tmp",
        "public"
      ]
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
          CacheControl: {
            MaxAge: 31536000,
            StaleWhileRevalidate: 86400
          }
        },
        charset: "utf-8"
      },
      assets: {
        cwd: "public/assets",
        src: "**/*.{jpg,png,ico,webp}",
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
        src: "**/*.{jpg,webp}",
        dest: "thumb/"
      },
      images: {
        cwd: "public/thumb",
        src: "**/*.{jpg,webp}",
        dest: "thumb/"
      },
      markup: {
        options: {
          headers: {
            CacheControl: {
              MaxAge: 864000,
              StaleWhileRevalidate: 1728000
            }
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
          '/post.html',
          '/css/site.min.css',
          '/css/cover.min.css',
          '/css/blog.min.css',
          '/js/site.min.js',
          '/js/styles.min.js'
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
    },
    watch: {
      css: {
        files: ['assets/css/**/*.css', 'assets/css/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['assets/js/**/*.js', 'assets/js/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'newer:cssmin',
    'newer:react',
    'newer:uglify',
    'newer:copy:assets',
    'newer:copy:images',
    'responsive_images',
    'webp'
  ]);

  grunt.registerTask('deploy', [
    'shell:build',
    'htmlmin',
    'copy:prod_html',
    's3:css',
    's3:js',
    's3:fonts',
    's3:markup',
    'cloudfront',
    's3:assets',
    's3:images'
  ]);  
};
