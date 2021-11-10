# Convert a Google Spreadsheet to a localization file

Fork : [NeverwinterMoon/localize-with-spreadsheet-2](https://github.com/NeverwinterMoon/localize-with-spreadsheet-2)

## Installation

`npm install @colorix/localize-google-spreadsheet`

## Differences

- Authentication with Service Account instead of API key

## Example

Requires:

- Authentication with Service Account [How-to](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account)
- API key **not supported anymore** 
- Spreadsheet key
- Sheet name filter

Create a file `update-localization.js`

```javascript
const Localize = require('@colorix/localize-google-spreadsheet')

Localize.fromGoogleSpreadsheet("./config/myapp-1dd646d7c2af.json", 'YOUR-DOC-ID', ['YOUR-TAB-NAME']) // tab name can be *

  .then(localizer => {
    localizer.setKeyCol('KEY') // name of the column containing the translation key

    Array.from(['en', 'de']).forEach(language => localizer.save(
      `project-name/resource/${language}.lproj/Localizable.strings`,
      { valueCol: language, format: 'ios' } // format can also be 'android' or 'json'
    ))
  })
```

Run it with
`node update-localization.js`

## Advanced

You can filter the worksheets to include with the third parameter of 'fromGoogleSpreadsheet':

```
Localize.fromGoogleSpreadsheet('your-json-file', 'YOUR-DOC-ID', '*')
Localize.fromGoogleSpreadsheet('your-json-file', 'YOUR-DOC-ID', '[mobile-app]')
```
