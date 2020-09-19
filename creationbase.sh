mongoimport --db INFODB --collection membres --file membres.json --jsonArray --drop
mongoimport --db INFODB --collection produits --file produits.json --jsonArray --drop
mongoimport --db INFODB --collection panier --file panier.json --jsonArray --drop