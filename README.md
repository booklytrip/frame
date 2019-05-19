## Frame

Frame is a micro website which can be embedded to other website. It provides flights search,
booking and minimal management functionality.

## Getting Started

#### `yarn start`
Runs the app in development mode.
Open http://localhost:3000 to view frame in the browser.

#### `yarn storybook`
Runs storybook to view and test components.
Open http://localhost:9000 to view storybook in the browser.

#### `yarn test`
Runs the test watcher in an interactive mode.

#### `yarn build`
Builds the app for production to the `build` folder.

#### `yarn translate`
Generates files for each if defined locales with words and phrases for translation.

## Localization

To generate files for localization you need to run `yarn translate` command.
That will process each JS/JSX file using [babel plugin](https://github.com/yahoo/babel-plugin-react-intl) and generate pair of files with keys for translation into `src/intl/locales`.

Each locale consist of two files e.g. en.json and whitelist_en.json

* en.json - the list of keys for translation
* whitelist_en.json - the place where you can specify translation keys where translation is identical to the default message.

## Developer Resources
* [Create React App Docs](https://github.com/facebookincubator/create-react-app)
* [The react-intl library used for localization](https://github.com/yahoo/react-intl)
* [The FormatJS library also used for localization](https://formatjs.io)
