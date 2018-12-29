const AWS = require('aws-sdk');

class S3BuildNumberPlugin {
    constructor(options) {
        this.name = 'S3BuildNumberPlugin';
        this.options = options;
        this.params = {
            Bucket: this.options.params.Bucket,
            Key: this.options.params.Key,
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise(this.name, this.handle.bind(this));
    }

    handle() {
        this.config();
        this.connect();

        return this.getBuildNumber();
    }

    config() {
        AWS.config.update(this.options.config);
    }

    connect() {
        this.s3 = new AWS.S3();
    }

    async getBuildNumber() {
        let data = await this.s3.getObject(this.options.params).promise();
        let num = process.env[this.options.var] = data.Body.toString('UTF-8');

        return this.setBuildNumber(num);
    }

    async setBuildNumber(num) {
        this.params.Body = new Buffer(`${num ? ++num : 0}`)
        await this.s3.putObject(this.params).promise();
    }
}

module.exports = S3BuildNumberPlugin;