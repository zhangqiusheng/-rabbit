function Module(name, src, test, dest, dependencies){
	this.name = name;
	this.src = src;
	this.test = test;
	this.dest = dest;
	this.dependencies = dependencies;
	this.develop = 'build/develop/';
	this.production = 'build/production/';
};
module.exports = Module;
