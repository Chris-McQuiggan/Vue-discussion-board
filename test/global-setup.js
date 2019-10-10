// Sets up chai
exports.before = function () {
    chai.should();
    chai.use(chaiAsPromised);
   };