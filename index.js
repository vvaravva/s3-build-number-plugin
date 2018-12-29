const AWS = require('aws-sdk');

class S3BuildNumberPlugin {
    constructor(options) {
        AWS.config.update(options.config);
        this.name = 'S3BuildNumberPlugin';
        this.options = options;
        this.s3 = new AWS.S3();
        this.params = {
            Bucket: this.options.params.Bucket,
            Key: this.options.params.Key
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise(this.name, this.handle.bind(this));
    }

    async handle(compilation) {
        this.data = await this.getData();
        this.forwardData(compilation);
        this.prepareData();

        return await this.updateData();
    }

    getData() {
        return this.s3.getObject(this.options.params).promise();
    }

    updateData() {
        return this.s3.putObject(this.params).promise();
    }

    forwardData(compilation) {
        this.num = compilation[this.options.var] = this.data.Body.toString('UTF-8');
    }

    prepareData() {
        this.params.Body = new Buffer(`${this.num ? ++this.num : 0}`);
    }
}

module.exports = S3BuildNumberPlugin;