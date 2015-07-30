# grunt-testem-all

> Grunt task for testem.js

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-testem-all --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-testem-all');
```

## The "testem" task

### Overview
In your project's Gruntfile, add a section named `testem` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  testem: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options
`grunt-testem-all` supports all Testem options. See [testem configuration reference](https://github.com/airportyh/testem/blob/master/docs/config_file.md).  
As testem configuration has all necessary options for files serving, you don't need to configure any grunt file mapping — all you need is `options` field in your targets.

### Running tasks
Tasks can be run with one of the optional flags:  
* `--dev` — run in `dev` mode (**default**)
* `--ci` — run in `ci` mode
* `--server` — run in `server` mode
* `--launchers` — show `launchers` list

#### Note on `--launchers`
It shows launchers based on specific options.  
`grunt testem --launchers` will show launchers list based on global options, `grunt testem:target --launchers` will show launchers list for specific target.

#### Options priority
Testem config files has higher priority.  
**Task options** does not overrides global options from config file, but adds absent properties.  
For example:
```js
// testem.json
{
    "framework": "mocha"
    "launch_in_dev": ["Chrome"]
}

// Gruntfile
testem: {
    options: {
        launch_in_dev: ["FireFox"],
        post: 3333
    }
    ...
}
```
In result `launch_in_dev` property will be `["Chrome"]`, but `port` options will be added.  

**If you have testem config file in root of your project, it will be used as global config, even if you don't provide a path to config in options**  



### Usage Examples
```js
grunt.initConfig({
    testem: {
        options: {
            launch_in_dev: ["Chrome"],
            framework: 'mocha'
        },
    component: {
        test_page: 'test/test_page.html',
        src_files:[
			'test/component.test.js'
		]
    },
    anotherComponent: {
        // this options overrides global task options
        options: {
            launch_in_dev: ["FireFox"]
        },
        test_page: 'test/another_test_page.html',
        src_files:[
			'test/anotherComponent.test.js'
		]
    }
  }
});
```
Run task
```
grunt testem:component // run component target in dev mode
grunt testem:anotherComponent --ci // run anotherComponent target in ci mode
```
