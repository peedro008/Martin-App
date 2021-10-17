const {Category} = require ('../src/bd.js')

function categories(){


  var meat =  Category.create({
    name: "Meat",
    description: "Red Meat: All livestock is considered red meat. This includes beef, pork, goat, and lamb. Poultry: Commonly referred to as white meat, poultry includes chicken and turkey. Seafood: That includes fish, as well as crustaceans, like crab and lobster, and molluscs, like clams, oysters, scallops, and mussels."
  });
  
  var dairy =  Category.create({
    name: "Dairy",
    description: "Dairy products or milk products are a type of food produced from or containing the milk of mammals, most commonly cattle, water buffaloes, goats, sheep, and camels. Dairy products include food items such as yogurt, cheese and butter."
  });
  
  var frozen =  Category.create({
    name: "Frozen",
    description: "Frozen food is defined as food products that are preserved under low temperature and used over a long period. The product market comprises various food products, including ready meals, vegetables & fruits, potatoes, meat & poultry, seafood, and soup."
  });
  var beverages =  Category.create({
    name: "Beverages",
    description: "Soft drinks comes in different variety like chilled, hot, bottled, canned or open liquids. The bottles or cans drinks are hygienically packed, e.g. aerated waters, mineral water, juices, squashes, syrups, smoothies, shakes etc. to be consumed as and when required."
  });
  
  var paperSupplies =  Category.create({
    name: "Paper supplies",
    description: "Paper and paper products includes newsprint; office, printing, fine, and pressure-sensitive papers; paper napkins, towels, and toilet tissue; kraft bag, construction, and other kraft industrial papers; paperboard, liquid packaging containers, containerboard, corrugated, and solid-fiber containers including linerboard."
  });
  
  var spice =  Category.create({
    name: "Spice",
    description: "A spice is a seed, fruit, root, bark, or other plant substance primarily used for flavoring or coloring food. Spices are distinguished from herbs, which are the leaves, flowers, or stems of plants used for flavoring or as a garnish."
  });
  var grains =  Category.create({
    name: "Grains",
    description: "Any food made from wheat, rice, oats, cornmeal, barley, or another cereal grain is a grain product. Bread, pasta, breakfast cereals, grits, and tortillas are examples of grain products. Foods such as popcorn, rice, and oatmeal are also included in the Grains Group."
  });
  var dressing_oil =  Category.create({
    name: "Dressing & oil",
    description: "A type of sauce that may use mayonnaise or a vinaigrette combined with other ingredients to create a topping or flavoring that can be mixed into salad greens or salad items being prepared."
  });
  
  var chemicals =  Category.create({
    name: "Chemicals",
    description: "Chlorine, ammonia and iodine are the three chemicals commonly used in commercial kitchens for cleaning and sanitization practices."
  });
  
  var produce =  Category.create({
    name: "Produce",
    description: "Botanically, fruits and vegetables are classified depending on which part of the plant they come from. A fruit develops from the flower of a plant, while the other parts of the plant are categorized as vegetables. Fruits contain seeds, while vegetables can consist of roots, stems and leaves."
  });
}

  module.exports= categories;
    
  