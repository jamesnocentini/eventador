'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EventadorGenerator = module.exports = function EventadorGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EventadorGenerator, yeoman.generators.Base);

EventadorGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // prompts is an array, containing an object for each question you wish to ask the user.
  // TODO(jamiltz): Add more questions?
  var prompts = [{
    name: 'eventPageName',
    message: 'Would do you want to call your Event Page?'
  }];

  this.prompt(prompts, function (props) {
    this.eventPageName = props.eventPageName;

    cb();
  }.bind(this));
};

// TODO: Project Structure
EventadorGenerator.prototype.app = function app() {
  //Initial folder structure
  this.mkdir('app');
  this.mkdir('app/events');
  this.mkdir('app/events_md');
  this.mkdir('app/styles');
  this.mkdir('app/scripts');
  this.mkdir('app/views');

  //Filenames preceded with an underscore indicate we use Lo-Dash to process them
  this.template('_main.md', 'app/views/main.md');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'app/index.html');

  //Dependencies files
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');
};

EventadorGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
