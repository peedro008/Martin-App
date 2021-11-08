const {Product} = require ('../src/bd')


 const products= async ()=>{

//   var beef = await Product.create({
//     name: "Beef",
//     description: "From a prehistoric looking T-bone steak to your average ballpark hot dogs and beef jerky, beef is a delicacy best enjoyed sparingly. It shares a main fatty acid with none other than olive oil—oleic acid. ",
//     img:"https://www.res.com.ar/media/catalog/product/cache/dbcd7fcd96d4e43f69e3e3703d135006/r/o/roast_beef.jpg",
//     price:5.15,
//     categoryId:1
//   });
 
  
//    var chicken = await Product.create({
//     name: "Chicken",
//     description: "Chicken meat is high and protein and low in fat, which varies in white and dark meat. Boneless, skinless chicken breast meat is one of the only types of meat that doesn't contain saturated fat. ",
//     img:"https://solidstarts.com/wp-content/uploads/chicken-drumstick_edited-scaled.jpg",
//     price:2.25,
//     categoryId:1
//   });
  
   
//    var milk = await Product.create({
//     name: "Milk",
//     description: "cacium",
//     img:"https://statics-cuidateplus.marca.com/cms/lecheok_0.jpg",
//     price:0.75,
//     categoryId:1
//   });
 
//   var WholeChicken = await Product.create({
//     name: "Whole Chicken",
//     description: "Chicken meat is high and protein and low in fat, which varies in white and dark meat. Boneless, skinless chicken breast meat is one of the only types of meat that doesn't contain saturated fat. ",
//     img:"https://solidstarts.com/wp-content/uploads/chicken-drumstick_edited-scaled.jpg",
//     price:2.25,
//     sale: true,
//     salePercent: 20,
//     categoryId:1
//   });
  
   
//    var salmon = await Product.create({
//     name: "Salmon",
//     description: "It's very low in saturated fat and a good source of protein. It's also one of the best sources of vitamin B12.",
//     img:"https://sevilla.abc.es/gurme/wp-content/uploads/sites/24/2014/09/recetasdesalmon.jpg",
//     price:6.99,
//     categoryId:1
//   });
 
//   var RedTuna = await Product.create({
//     name: "Red Tuna",
//     description: "Red Tuna is a low glycemic index (GI) food and an excellent source of selenium, Vitamin B3 (niacin), Vitamin B12, Vitamin B6, protein, phosphorus, Vitamin D and potassium.",
//     img:"https://cdn.shopify.com/s/files/1/0263/7086/7274/products/bluefinloin_620x.jpg?v=1627309052",
//     price:5.75,
//     categoryId:1
//   });
  
//   var PorkLeg = await Product.create({
//     name: "Pork Leg",
//     description: "Pork is a rich source of certain vitamins and minerals your body needs to function, like iron and zinc. It’s also an excellent source of high-quality protein.",
//     img:"https://cdn.shopify.com/s/files/1/0028/0235/2172/products/LegRoast_1200x1200.png?v=1568872025",
//     price:4.85,
//     sale:true,
//     salePercent: 10,
//     categoryId:1
//   });

//   var Bacon = await Product.create({
//     name: "Bacon",
//     description: "caciuBacon contains the following essential minerals and vitamins that are part of a healthy diet.",
//     img:"https://www.hola.com/imagenes/cocina/noticiaslibros/20210204183620/que-es-beicon/0-916-187/tocineta-adobe-z.jpg",
//     price:2.50,
//     categoryId:1
//   });
  
//   var BoneChuckRoast = await Product.create({
//     name: "Bone Chuck Roast",
//     description: "Bone Chuck Roast derives from the shoulder section of a cow. This meat is often tough because there are a lot of muscles in this area, so it is best to use slow cooking methods when preparing the steak",
//     img:"https://embed.widencdn.net/img/beef/b4oefjv7ez/800x600px/Chuck%20Arm%20Roast.psd?keep=c&u=7fueml",
//     price:5.75,
//     categoryId:1
//   });
  
//   var PorkCrownRoast = await Product.create({
//     name: "Pork Crown Roast",
//     description: "cacium",
//     img:"https://www.simplyrecipes.com/thmb/AMibX4FCk8bM44qt1_OO5RmFqRM=/800x533/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2008__12__crown-roast-pork-horiz-raw-c36e48c691134cada7339ebb8890f98e.jpg",
//     price:4.75,
//     sale:true,
//     salePercent: 15,
//     categoryId:1
//   });
 
//   var ChikenBreast = await Product.create({
//     name: "Skinless Chicken Breast",
//     description: "This type of poultry is an excellent source of lean protein. Chicken is also a good source of vitamin B, vitamin D, calcium, iron, zinc, and trace amounts of vitamin A and vitamin C.",
//     img:"https://mytbones.com/wp-content/uploads/2018/11/Boneless-Skinless-Chicken-Breasts-3KG.jpg",
//     price:3.50,
//     sale:true,
//     salePercent: 5,
//     categoryId:1
//   });

//   var BeefStriploinSteak = await Product.create({
//     name: "Beef Striploin Steak",
//     description: "Meat is low in carbs, but high in protein.",
//     img:"https://statics-cuidateplus.marca.com/cms/lecheok_0.jpg",
//     price:6.80,
//     categoryId:1
//   });
var PorkLeg = await Product.create({
  name: "Pork leg",
  description: "Product description",
  img:"https://carniceriael12.com/wp-content/uploads/2020/10/Pernil-de-cerdo.jpg",
  price:8.75,
  categoryId:1
});

var BeefRibs = await Product.create({
  name: "Beef Ribs",
  description: "Product description",
  img:"https://s.cornershopapp.com/product-images/1298985.jpg?versionId=V_zxcN9eeb5LPWLmZrDwPDdx37.5EjX0",
  price:11,
  categoryId:1
});

var PorkTenderloin = await Product.create({
  name: "Pork Tenderloin",
  description: "Product description",
  img:"https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18191205/fc51kt076-9-main.jpg",
  price:10,
  categoryId:1,
  sale: true,
  salePercent: 20,
});


var BeefTenderloin = await Product.create({
  name: "Beef Tenderloin",
  description: "Product description",
  img:"https://www.filipinan-market.com/images/productos/productos-foto1-383.png",
  price:9.50,
  categoryId:1
});

var PorkRibs = await Product.create({
  name: "Pork Ribs",
  description: "Product description",
  img:"hhttps://mightynicemeats.com.au/wp-content/uploads/American-Pork-Ribs.jpg",
  price:12,
  categoryId:1
});

var SlicedBacon = await Product.create({
  name: "Sliced Bacon",
  description: "Product description",
  img:"https://pincopallino.com.mx/wp-content/uploads/2019/05/Tocino.jpg",
  price:6.50,
  categoryId:1
});

var PorkBlade = await Product.create({
  name: "Pork Blade",
  description: "Product description",
  img:"https://images.freshop.com/5453037/5d4a8a9db102ad058c9bc8a2ddc8b437_large.png",
  price:7,
  categoryId:1,
  sale: true,
  salePercent: 38,
});


var PorkBelly = await Product.create({
  name: "Pork Belly",
  description: "Product description",
  img:"http://cdn.shopify.com/s/files/1/0206/9470/products/pork_belly_1_e7c3a40d-faf0-476a-aa67-7519e6b27661_grande.jpeg?v=1568670525",
  price:8.30,
  categoryId:1
});


var PorkHamShanks = await Product.create({
  name: "Pork Ham Shanks",
  description: "Product description",
  img:"http://cunninghammeats.com/wp-content/uploads/2018/05/shutterstock_389092108.jpg",
  price:10,
  categoryId:1
});

var PorkJowl = await Product.create({
  name: "Pork Jowl",
  description: "Product description",
  img:"https://cdn.shopify.com/s/files/1/0260/0704/4144/products/PorkJowlFillet_1024x1024.png?v=1606278577",
  price:12.5,
  categoryId:1,
  sale: true,
  salePercent: 15,
});


var RawPorkSausages = await Product.create({
  name: "Raw Pork Sausages",
  description: "Product description",
  img:"https://previews.123rf.com/images/pamela4578/pamela45781507/pamela4578150700511/43158358-raw-pork-sausages.jpg",
  price:11.80,
  categoryId:1
});


var Chickenlegs = await Product.create({
  name: "Chicken legs",
  description: "Product description",
  img:"https://www.freshcityfarms.com/imagefly/w441-h374-c/resources/media/images/products/Organic_Chicken_Leg_-_Whole__5c1.jpeg",
  price:8.50,
  categoryId:1
});


var ChickenWings = await Product.create({
  name: "Chicken Wings",
  description: "Product description",
  img:"https://sc01.alicdn.com/kf/U7930a3ff549c47d8aa5a8917f819564ck/989395517/U7930a3ff549c47d8aa5a8917f819564ck.png",
  price:4,
  categoryId:1
});


var ChickenBreast = await Product.create({
  name: "Chicken Breast",
  description: "Product description",
  img:"https://5.imimg.com/data5/DF/CD/MY-7067025/boneless-chicken-breast-meat-500x500.jpg",
  price:6.50,
  categoryId:1
});


var BeefChuck = await Product.create({
  name: "Beef Chuck",
  description: "Product description",
  img:"https://embed.widencdn.net/img/beef/fl0ape3hb2/exact/Chuck%20Roast%20Boneless.psd?keep=c&u=7fueml",
  price:13,
  categoryId:1
});
 
 }


module.exports=products;