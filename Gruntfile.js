module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  //require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          base: '.',
          keepalive: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', []);
};