# S3 Build Number Plugin

Webpack plugin for get and set the build number on s3.

## Install

```bash
npm install --save-dev s3-build-number-plugin
```

## Usage

In your `webpack.config.js`

```javascript
const S3BuildNumberPlugin = require('s3-build-number-plugin');

module.exports = {
    // ...
    plugins: [
        new S3BuildNumberPlugin({
            config: {
                accessKeyId: process.env.S3_CREDENTIALS_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_CREDENTIALS_SECRET_ACCESS_KEY,
                region: process.env.S3_REGION
            },
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: process.env.S3_BASE_PATH + 'packs' + '/build-number.json' // path and file name
            },
            var: 'BUILD_NUMBER' // env variable
        })
    ]
};
```
