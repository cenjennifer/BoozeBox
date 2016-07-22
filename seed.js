/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
var chalk = require('chalk');
var db = require('./server/db/models').db;
var User = require('./server/db/models').User;
var Box = require('./server/db/models').Box;
var Lifestyle = require('./server/db/models').Lifestyle;
var Product = require('./server/db/models').Product;
var Plan = require('./server/db/models').Plan;
var Subscription = require('./server/db/models').Subscription;
// var Cart = require('./server/db/models').Cart;
var Cart_Detail = require('./server/db/models').Cart_Detail;

var Promise = require('sequelize').Promise;

var seedLifestyles = function(){
    var lifestyles = [
    {
        name: 'Bold'
    },
    {
        name: 'Classic'
    }, 
    {
        name: 'Fresh'
    },
    {
        name: 'Sweet'
    }  

    ]

    return Lifestyle.destroy({ where: {}})
    .then(function(){
        return Lifestyle.bulkCreate(lifestyles);
    })
    .catch(err=>console.error(err));
}

var seedBoxes = function(){
    var boxes = [
       {
        name: 'Mint Julep',
        photo: 'http://cdn.skim.gs/images/mljhz8lq7pd2iidizt51/mint-julep-recipes',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Mint_Julep_Cocktail_Kit_1.png?v=1433264374'
        description: 'Minty goodness.'
    },
    {
        name: 'Negroni',
        photo: 'https://arcalameda.org/content/uploads/sites/12/2016/06/Negroni-Cocktail.jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Negroni_Kit.png?v=1433187938'
        description: 'Gin, vermouth, campari drink.'
    },
    {
        name: 'Bloody Mary',
        photo: 'http://andrewzimmern.com/wp-content/uploads/2014/03/Bloody-Mary1.jpg',
        // photo: 'http://cdn.shopify.com/s/files/1/0100/5392/products/UltimateBloodyMary_64dbfc5b-59c5-4dc7-bc0c-7f58aed2e55b_grande.jpg?v=1422658268'
        description: 'Veggies and alcohol.'
    },
    {
        name: 'French 75s',
        photo: 'https://media.timeout.com/images/103339799/image.jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/PacNW_French_75_1.png?v=1423768736'
        description: 'Champagne, lemon, and a some hard liquor.'
    },
    {
        name: 'Grapefruit Blossom Aperitifs',
        photo: 'http://www.marthastewart.com/sites/files/marthastewart.com/styles/wmax-1500/public/d31/lillet-rose-cocktails-mld108276/lillet-rose-cocktails-mld108276_horiz.jpg?itok=2UVrrtF1',
        // photo: 'https://www.google.com/search?q=grapefruit+blossom+aperitifs+cocktail+kit&biw=1280&bih=706&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiqxuHMn6jNAhUBRT4KHS6rCIoQ_AUIBygC#imgrc=BPFAKZULqe15PM%3A'
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Smoked_Palomino_1.jpg?v=1440703365'
        description: 'Fancy grapefruit drink.'
    },
    {
        name: 'Brooklyn',
        photo: 'http://www.seriouseats.com/recipes/assets_c/2015/04/20150323-cocktails-vicky-wasik-Brooklyn-thumb-1500xauto-421619.jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Classic_Manhattan.jpg?v=1447704929'
        description: 'Not to be confused with a Manhattan.'
    },
    {
        name: 'Manhattan',
        photo: 'http://www.trbimg.com/img-56a7fb04/turbine/sc-barrel-aged-cocktails-drink-food-0129-20160126',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Aged_Manhattan_1.png?v=1445869928'
        description: 'Not to be confused with a Brookyln.'
    },
    {
        name: 'Whiskey Sour',
        photo: 'http://philly.thedrinknation.com/uploads/How_to_Make_a_Whiskey_Sour_Drink_Nation_full(4).jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Ward_8.jpg?v=1459774895'
        description: 'Lemon-y drink sometimes called a Boston sour.'
    },
    {
        name: 'Martini',
        photo: 'https://s3.amazonaws.com/fff-blog/wp-content/uploads/2015/09/unnamed-1-660x400.jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Classic_Martini.jpg?v=1459774610'
        description: 'One of the best known mixed alcoholic beverages.'
    },
    {
        name: 'Eves Black Heart',
        photo: 'http://search.chow.com/thumbnail/800/492/www.chowstatic.com/assets/recipe_photos/29940_steamroller.jpg',
        // photo: 'https://cdn.shopify.com/s/files/1/0252/8179/products/Bert_Lhar_Sale.jpg?v=1442513785'
        description: "If you like dark beer, you'll like this."
    },
    {
        name: 'Lavender Bees Knees',
        photo: 'http://cdn.honestlyyum.com/wp-content/uploads/2013/03/lavender-bees-knees-cocktail1.jpg',
        description: 'Lemon-y and lavender-y.'
    },
    {
        name: 'Pineapple Dream',
        photo: 'http://wishfulchef.cdn.kinsta.com/wp-content/uploads/2011/09/PineappleLimeCocktail.jpg',
        description: "Feels like you're at the beach :D"

    },
    {
        name: 'Belmosa',
        photo: 'http://pdxfoodlove.com/wp-content/uploads/2015/12/orangecocktail2.jpg',
        description: 'Orange-y goodness.'
    },
    {
        name: 'Thunder in Paradise',
        photo: 'https://mylifeonandofftheguestlist.com/wp-content/uploads/2015/08/Cruzan_Blueberry-Lemonade-Colada1.jpg',
        description: 'Rum and coconut goodness.'
    },
    {
        name: 'Cucumber Rose Collins',
        photo: 'http://farm4.staticflickr.com/3804/11959171654_82eff625b6_z.jpg',
        description: 'Refreshing and bubbly!'
    },
    {
        name: 'Corpse Reviver #2',
        photo: 'http://www.travelstart.co.za/blog/wp-content/uploads/2013/12/Corpse-Reviver-2.jpg',
        description: "It's in the name."
    },
    {
        name: 'Rude Little Pig',
        photo: 'http://www.gqindia.com/wp-content/uploads/2016/01/cocktail-bacon.jpg?adaptive-images=false',
        description: "There's bacon. That is all."
    },
    {
        name: 'Red Pearl',
        photo: 'http://www.magic4walls.com/wp-content/uploads/2014/09/fresh-fruit-juice-kiwi-cocktail-drink-hearth-glass-wallpaper.jpg',
        description: "Sweet and spicy."
    },
    {
        name: 'Eastern Smoke',
        photo: 'https://cdn0.vox-cdn.com/uploads/chorus_image/image/45728840/Hutchinson_HI-RES_-39.0.0.jpg',
        description: 'Just a little sweet.'
    },
    {
        name: 'The Long Count',
        photo: 'https://s-media-cache-ak0.pinimg.com/736x/ab/14/99/ab1499dfa36ee8205a888fdfacbcf505.jpg',
        description: "Rye and pineapple--whut?!"
    }
    ]

// make a map
// loop thru every box
// setLifestyle
// create everything WITHOUT associations first
var boxesMap = {
   'Mint Julep':'Fresh',
   'Negroni':'Fresh',
   'Bloody Mary':'Fresh',
   'French 75s':'Fresh',
   'Grapefruit Blossom Aperitifs':'Fresh',
   'Brooklyn':'Classic',
   'Manhattan':'Classic',
   'Whiskey Sour':'Classic',
   'Martini':'Classic',
   'Eves Black Heart':'Classic',
   'Lavender Bees Knees':'Sweet',
   'Pineapple Dream':'Sweet',
   'Belmosa':'Sweet',
   'Thunder in Paradise':'Sweet',
   'Cucumber Rose Collins':'Sweet',
   'Corpse Reviver #2': 'Bold',
   'Rude Little Pig': 'Bold',
   'Red Pearl': 'Bold',
   'Eastern Smoke': 'Bold',
   'The Long Count': 'Bold'

}

return Box.destroy({ where: {}})
.then(function(){
    return Promise.map(boxes, function(box){
        // console.log('i am the first box', box)
        var newBox;
        return Box.create(box)
        .then(function(_newBox){
            newBox = _newBox;
            // console.log('i am the new box', newBox)
            return Lifestyle.findOne({
                where: {
                    name: boxesMap[newBox.name]
                }
            })
            .then(function(lifestyle){
                return newBox.setLifestyle(lifestyle);
            })
        })
    })

})

}

var seedPlans = function(){
    var plans = [
    {
        name: 'Bold Basic',
        price: 39.99
    },
    {
        name: 'Bold Premium',
        price: 69.99
    },
    {
        name: 'Classic Basic',
        price: 39.99
    }, 
    {
        name: 'Classic Premium',
        price: 69.99
    }, 
    {
        name: 'Fresh Basic',
        price: 39.99
    },
    {
        name: 'Fresh Premium',
        price: 69.99
    },
    {
        name: 'Sweet Basic',
        price: 39.99
    },  
    {
        name: 'Sweet Premium',
        price: 69.99
    },
    {
        name: 'Free Trial',
        price: 0.00
    }    
    ]

    var plansMap = {
        'Bold Basic':'Bold',
        'Classic Basic':'Classic',
        'Fresh Basic':'Fresh',
        'Sweet Basic':'Sweet',
        'Bold Premium':'Bold',
        'Classic Premium':'Classic',
        'Fresh Premium':'Fresh',
        'Sweet Premium':'Sweet'
    }    

    return Plan.destroy({ where: {}})
    .then(function(){
        return Promise.map(plans, function(plan){
            var newPlan;
            return Plan.create(plan)
            .then(function(_newPlan){
                newPlan=_newPlan;
                return Lifestyle.findOne({
                    where:{
                        name:plansMap[newPlan.name]
                    }
                })
                .then(function(lifestyle){
                    return newPlan.setLifestyle(lifestyle)
                })
            })
        })
    })
}

var seedProducts = function(){
    var products = [
    {
        name:'gin'
    },
    {
        name:'cognac'
    },
    {
        name:'rum'
    },
    {
        name:'champagne'
    },
    {
        name:'chartreuse'
    },
    {
        name: 'rye'
    },
    {
        name: 'absinthe'
    },
    {
        name: 'cointreau'
    },
    {
        name: 'vermouth'
    },
    {
        name:'sherry'
    },
    {
        name:'bourbon'
    },
        {
        name:'tequila'
    },
    {
        name:'whiskey'
    },
    {
        name:'vodka'
    },
    {
        name:'rose'
    },
    {
        name:'grapefruit'
    },
    {
        name:'club soda'
    },
    {
        name:'lemon juice'
    },
    {
        name:'lavender honey'
    },
    {
        name:'pineapple'
    },
    {
        name:'vanilla'
    },
    {
        name:'coconut'
    },
    {
        name:'lime'
    },
    {
        name:'mint'
    },
    {
        name:'cucumber'
    },
    {
        name:'orange juice'
    },
    {
        name:'bitters'
    },
    {
        name:'simple syrup'
    },
    {
        name:'rose syrup'
    },
    {
        name:'cherry liqueur'
    },
    {
        name:'campari'
    },
    {
        name:'tomato juice'
    },
    {
        name:'hot sauce'
    },
    {
        name:'horseradish'
    },
    {
        name:'hard cider'
    },
    {
        name:'stout'
    },
    {
        name:'calvados'
    },
        {
        name:'orange liqueur'
    },
            {
        name:'bacon'
    },
                {
        name:'chili'
    },
                    {
        name:'basil'
    },
                    {
        name:'kiwi'
    },
                        {
        name:'mescal'
    },
                        {
        name:'honey'
    }

    ]

    var productMap = {
        'gin': ['Lavender Bees Knees', 'Cucumber Rose Collins','Negroni','French 75s', 'Martini','Corpse Reviver #2'],
        'cognac': ['Belmosa'],
        'rum': ['Pineapple Dream', 'Thunder in Paradise'],
        'champagne': ['Belmosa','French 75s', 'Grapefruit Blossom Aperitifs'],
        'chartreuse': ['Belmosa'],
        'sherry': ['Thunder in Paradise'],
        'lemon juice': ['Lavender Bees Knees', 'Cucumber Rose Collins', 'Bloody Mary','French 75s', 'Whiskey Sour','Corpse Reviver #2','The Long Count'],
        'lavender honey': ['Lavender Bees Knees'],
        'pineapple': ['Pineapple Dream', 'The Long Count'],
        'vanilla': ['Pineapple Dream'],
        'coconut': ['Thunder in Paradise'],
        'lime': ['Pineapple Dream', 'Thunder in Paradise'],
        'orange juice': ['Belmosa'],
        'bitters': ['Belmosa', 'Manhattan', 'Brooklyn','Martini','Eastern Smoke','The Long Count'],
        'simple syrup': ['Thunder in Paradise','Mint Julep','French 75s','Whiskey Sour'],
        'rose syrup': ['Cucumber Rose Collins'],
        'cucumber': ['Cucumber Rose Collins'],
        'club soda': ['Cucumber Rose Collins'],
        'rye': ['Manhattan','Brooklyn','The Long Count'],
        'vermouth': ['Manhattan', 'Brooklyn','Negroni','Martini'],
        'cherry liqueur': ['Brooklyn'],
        'bourbon': ['Mint Julep'],
        'mint': ['Mint Julep'],
        'campari': ['Negroni'],
        'vodka': ['Bloody Mary','Red Pearl'],
        'tomato juice': ['Bloody Mary'],
        'hot sauce': ['Bloody Mary'],
        'horseradish': ['Bloody Mary'],
        'grapefruit': ['Grapefruit Blossom Aperitifs'],
        'rose': ['Grapefruit Blossom Aperitifs'],
        'whiskey': ['Whiskey Sour'],
        'stout': ['Eves Black Heart'],
        'hard cider': ['Eves Black Heart'],
        'calvados': ['Eves Black Heart'],
        'absinthe': ['Corpse Reviver #2'],
        'cointreau': ['Corpse Reviver #2'],
        'tequila': ['Rude Little Pig'],
        'orange liqueur': ['Rude Little Pig'],
        'bacon': ['Rude Little Pig'],
        'chili': ['Red Pearl'],
        'basil': ['Red Pearl'],
        'kiwi': ['Red Pearl'],
        'mescal': ['Eastern Smoke'],
        'honey': ['Eastern Smoke']
    }

    return Product.destroy({ where: {}})
    .then(function(){
        return Promise.map(products, function(product){
            var newProduct;
            return Product.create(product)
            .then(function(_newProduct){
                newProduct = _newProduct;
                return Box.findAll({
                    where:{
                        name: productMap[newProduct.name]
                    }
                })
                .then(function(boxes){
                    return newProduct.setBoxes(boxes);
                })
            })
        })
    })
}

var seedUsers = function () {
    var users = [
    {
      username: 'patrice',
      email: 'patrice@gha.com',
      password: 'gha',
      isAdmin: 'true',
      birthday: '02/13/1993',
      street_address: '1 Hanover',
      city_address: 'New York City',
      state_address: 'NY',
      active_status: true
  },
  {
      username: 'graceh',
      email: 'grace@gha.com',
      password: 'gha',
      isAdmin: 'false',
      birthday: '12/09/1906',
      street_address: '1 Grace Street',
      city_address: 'New York City',
      state_address: 'NY',
      active_status: true
  }
  ]

  var userMap = {
    'patrice':['Sweet Basic','Classic Basic'],
    'graceh':['Bold Premium']
}

return User.destroy({ where: {}})
.then(function(){
    return Promise.map(users, function(user){
        var newUser;
        return User.create(user)
        .then(function(_newUser){
            newUser = _newUser;
            return Plan.findAll({
                where:{
                    name: userMap[newUser.name]
                }
            })
            .then(function(plans){
                return newUser.setPlans(plans);
            });
        });
    });
});
};



// db.sync({force:true})
db.sync()
.then(function(){
    return Promise.all([seedLifestyles(), seedBoxes(), seedPlans(), seedProducts(), seedUsers()])
})
.then(function () {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
})
.catch(function (err) {
    console.error(err);
    // process.kill(1);
});
