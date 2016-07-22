'use strict';
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
  logging: false
});

// require('../../../server/db/models/box')(db);
// var Box = db.model('box');

var models = require('../../../server/db/models/');
var Lifestyle = models.Lifestyle

// Questionable test...
describe('Lifestyle model', function () {
  before(function () {
    return db.sync({ force: true });
    // return Lifestyle.sync({force: true});
  });

    // Do we need this?
    // afterEach(function () {
    //     return db.sync({force: true});
    // });

    var lifestyles = [
    { name: 'Adventurous'},
    { name: 'Classic' },
    { name: 'Clean & Natural'},
    { name: 'Fruity & Floral'}
    ]

    beforeEach(function () {
      return Lifestyle.destroy({ where: {}})
      .then(function(){ return Lifestyle.bulkCreate(lifestyles);})
    });

    it("Lifestyle should have four lifestyles", function (done) {
     Lifestyle.findAll()
     .then(function(lifestyleChoices){
      console.log(lifestyleChoices)
      expect(lifestyleChoices.length).to.equal(4);
    });
     done();
   });
  });



