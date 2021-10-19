const {Category} = require ('../src/bd')

function categories(){


  var meat =  Category.create({
    name: "Meat",
    description: "Red Meat: All livestock is considered red meat. This includes beef, pork, goat, and lamb. Poultry: Commonly referred to as white meat, poultry includes chicken and turkey. Seafood: That includes fish, as well as crustaceans, like crab and lobster, and molluscs, like clams, oysters, scallops, and mussels.",
    img:"https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive"
  });
  
  var dairy =  Category.create({
    name: "Dairy",
    description: "Dairy products or milk products are a type of food produced from or containing the milk of mammals, most commonly cattle, water buffaloes, goats, sheep, and camels. Dairy products include food items such as yogurt, cheese and butter.",
    img: "https://media-exp1.licdn.com/dms/image/C4E1BAQGR3x3xUt0apw/company-background_10000/0/1560802950655?e=2159024400&v=beta&t=Ix6FySV3CfLWil3iuFW2DMLGbHQiYBGh9bTd-bltlQs"
  });
  
  var frozen =  Category.create({
    name: "Frozen",
    description: "Frozen food is defined as food products that are preserved under low temperature and used over a long period. The product market comprises various food products, including ready meals, vegetables & fruits, potatoes, meat & poultry, seafood, and soup.",
    img:"https://img.packworld.com/files/base/pmmi/all/image/2020/04/2019_08_Happi_Foodi_NEW_PRODUCT_SHOOT__New_Products_5.5e8b3ed0d0c8d.png?auto=format&fit=max&w=1440"
  });
  var beverages =  Category.create({
    name: "Beverages",
    description: "Soft drinks comes in different variety like chilled, hot, bottled, canned or open liquids. The bottles or cans drinks are hygienically packed, e.g. aerated waters, mineral water, juices, squashes, syrups, smoothies, shakes etc. to be consumed as and when required.",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C1DMQ75z-6rv4NxofMr4-zCX5DyicaMC3kNUdQXuhXKaNKBh6d2dfWSXbUTQdNco_xU&usqp=CAU"
  });
  
  var paperSupplies =  Category.create({
    name: "Paper supplies",
    description: "Paper and paper products includes newsprint; office, printing, fine, and pressure-sensitive papers; paper napkins, towels, and toilet tissue; kraft bag, construction, and other kraft industrial papers; paperboard, liquid packaging containers, containerboard, corrugated, and solid-fiber containers including linerboard.",
    img:"https://www.saltayvuela.com/wp-content/uploads/2021/10/Paper-supplies.jpg"
  });
  
  var spices =  Category.create({
    name: "Spices",
    description: "A spice is a seed, fruit, root, bark, or other plant substance primarily used for flavoring or coloring food. Spices are distinguished from herbs, which are the leaves, flowers, or stems of plants used for flavoring or as a garnish.",
    img:"https://images.ctfassets.net/3s5io6mnxfqz/3pLESMFjNopcam5J5qGcoT/0427544b060a8fd29e3c0b68281d56cf/AdobeStock_191057762.jpeg?fm=jpg&w=900&fl=progressive"
  });
  var grains =  Category.create({
    name: "Grains",
    description: "Any food made from wheat, rice, oats, cornmeal, barley, or another cereal grain is a grain product. Bread, pasta, breakfast cereals, grits, and tortillas are examples of grain products. Foods such as popcorn, rice, and oatmeal are also included in the Grains Group.",
    img:"https://i.pinimg.com/564x/86/56/b5/8656b5721e1cd1b27e221ca3cef9dbfb.jpg"
  });
  var dressing_oil =  Category.create({
    name: "Dressing & oil",
    description: "A type of sauce that may use mayonnaise or a vinaigrette combined with other ingredients to create a topping or flavoring that can be mixed into salad greens or salad items being prepared.",
    img: "https://i.pinimg.com/564x/69/80/bb/6980bbe0e0890f5ceceeb2aee52e7f05.jpg"
  });
  
  var chemicals =  Category.create({
    name: "Chemicals",
    description: "Chlorine, ammonia and iodine are the three chemicals commonly used in commercial kitchens for cleaning and sanitization practices.",
    img:"https://i.pinimg.com/564x/d3/e0/17/d3e0177493e834122a74354471d04d0b.jpg"
  });
  
  var produce =  Category.create({
    name: "Produce",
    description: "Botanically, fruits and vegetables are classified depending on which part of the plant they come from. A fruit develops from the flower of a plant, while the other parts of the plant are categorized as vegetables. Fruits contain seeds, while vegetables can consist of roots, stems and leaves.",
    img:"https://i.pinimg.com/564x/52/da/d3/52dad320541b64bf4e9c8b50cc538be3.jpg"
  });
}

  module.exports= categories;
    
  