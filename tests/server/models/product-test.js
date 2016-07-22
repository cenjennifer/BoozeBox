'use strict';
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
  logging: false
});

require('../../../server/db/models/product')(db);

var models = require('../../../server/db/models/');
var Product = models.Product

describe('Product model', function () {


  before(function () {
    return db.sync({ force: true });
    // return Product.sync({force: true});
  });

  // Do we need this?
  // afterEach(function () {
  //   return db.sync({force: true});
  // });

  var product;
  beforeEach(function () {
    return Product.create({
      name: 'vodka'
    })
    .then(function (p) {
      product = p;
    });
  });

  it("Product should have the correct fields", function (done) {
    expect(product.dataValues).to.include.all.keys(
      ['id',
      'name',
      'updatedAt',
      'createdAt']
      );
    done();
  });


  it("Product should require a name", function (done) {
    Product.create()
    .then(function (result) {
      expect.fail();
      done();
    })
    .catch(function (err) {
      expect(err['name']).to.be.equal('SequelizeValidationError');
      done();
    });
  });
});


