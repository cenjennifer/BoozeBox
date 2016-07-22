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
var Box = models.Box;
var Lifestyle = models.Lifestyle;

describe('Box model', function () {
  before(function () {
    db.sync({ force: true });
    // return Box.sync({force: true});
    return Lifestyle.create({
      name:'Test Lifestyle'
    });
    done();
  });

  // before(function(done){
    // return Lifestyle.create({
    //   name:'Test Lifestyle'
    // })
    // .then(function(result){
    //   console.log("SUCCESSFUL LIFESTYLE",result);
    // });
    // done();
  // });

    // Do we need this?
    // after(function () {
    //     return db.sync({force: true});
    // });

    var box;
    beforeEach(function (done) {
      return Box.create({
        name: 'Test Drink',
        photo: 'http://bit.ly/1WE3BTq',
      })
      .then(function (b) {
          //console.log("THERE IS A LIFESTYLE",b)
          box = b;
          done();
        });
    });

    it('Box should have the correct fields', function (done) {
      expect(box.dataValues).to.include.all.keys(
        ['id',
        'name',
        'photo',
        'lifestyleId',
        'updatedAt',
        'createdAt']
        );
      done();
    });

    it('Box should require a name', function (done) {
      Box.create()
      .then(function (result) {
        expect.fail();
        done();
      })
      .catch(function (err) {
        expect(err['name']).to.be.equal('SequelizeValidationError');
        done();
      });
    });

    it('Box should associate with a lifestyle', function(done){

      box.setLifestyle('Test Lifestyle')
      console.log(box.dataValues.lifestyleId)
      expect(box.dataValues.lifestyleId).to.not.be.null
      // .then(function(result){
        // console.log("BOX HAS LIFESTYLE?", result)
      // });
      done();
    });
  });

