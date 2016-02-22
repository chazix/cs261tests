describe('/motd', function() {
    var endpoint = this.title;
    before(function(done) {
        this.endpoint = endpoint;
        this.url = testContext.getRoot() + this.endpoint;
        if (!testContext.shouldTest(this.endpoint))
            this.skip();

        // Do any endpoint-level setup here
        done();
    });

    describe('/get', function() {
        var method = this.title;
        var payload;
        before(function(done) {
            this.method = method;

            // Do any method-level setup here
            request(this.url).get(this.method).end(function(err, response) {
                if (err) {
                    console.log(this.url);
                    return done(err);
                }
                payload = response.body;
                done();
            });
        });

        it('should return success', function(done) {
            payload.should.have.property('status');
            payload.status.should.equal('success');
            done();
        });

        it('should return a string in motd', function(done) {
            payload.should.have.property('data');
            payload.data.should.have.property('motd');
            payload.data.motd.length.should.be.greaterThan(0);
            done();
        });

        it('should return a date in lastModified', function(done) {
            payload.should.have.property('data');
            payload.data.should.have.property('lastModified');
            payload.data.lastModified.length.should.be.greaterThan(0);
            var date = new Date(payload.data.lastModified);
            date.should.be.Date();
            done();
        });
    });
});
