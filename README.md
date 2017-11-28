# vuenotes
A Vue Experiment - Chrome extension for replacing a new tab with notes.

This explores the concept of [Vue Single File Components](https://vuejs.org/v2/guide/single-file-components.html) along with other vue properties/functionalities and concepts involved in creating a chrome extension:

* use of multiple single file components and using a component in another component
* use of `manifest.json` for a simple chrome extension
* use of chrome storage for saving notes locally

# Development

```bash
$ yarn install

```

# Run locally

```bash
$ yarn start

```

# Install as a chrome extension on your machine

1) First, run it locally using `yarn start`
2) Then open Chrome. Go to chrome://extensions/. Make sure that Developer Mode is turned on. And then Load unpacked extension. Specify the dist directory. 

Now the extension is loaded, and you should see "+" when you open a new tab. Click on the "+" and start using vuenotes