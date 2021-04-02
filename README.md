# Link to the Past Randomizer Tracker

## Using the tracker

Grab the latest release from [here](https://github.com/freddyJarva/lttpr_tracker/releases). The simplest way is to download the zip file, extract it somewhere on your computer, and open `index.html`.



## Running the project for development

Install the dependencies...

```bash
cd lttpr_tracker
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see tracker running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.

