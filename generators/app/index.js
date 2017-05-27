var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
  },

  default: function () {
    if (path.basename(this.destinationPath()) !== this.appname) {
      this.log(
        'Your generator must be inside a folder named ' + this.appname + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.appname);
      this.destinationRoot(this.destinationPath(this.appname));
    }
  },

  prompting: function () {
    if (this.options['skip-welcome-message'] !== 'true') {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the breathtaking ' + chalk.red('generator-joe') + ' generator!'
      ));
    }
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'name',
        default: this.appname,
      }
    ];

    return this.prompt(prompts).then(function (answers) {
      this.appname = answers.name;
    }.bind(this));

  },

  writing: {
    folders: function () {
    // copy only
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { appname: this.appname }
      );
    },

    readme: function () {
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        { appname: this.appname }
      );
    },

    babelrc: function () {
      this.fs.copyTpl(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc'),
        { appname: this.appname }
      );
    },

    eslintrc: function () {
      this.fs.copyTpl(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc.js'),
        { appname: this.appname }
      );
    },

    eslintignore: function () {
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    gitignore: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
  },

  install: function () {
    var options = {
      registry: 'https://registry.npm.taobao.org',
      disturl: 'https://npm.taobao.org/dist',
      sassBinarySite: 'http://npm.taobao.org/mirrors/node-sass'
    };
    this.npmInstall('', options);
  }
});
