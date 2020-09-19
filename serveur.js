const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
   
});

//app.use(require("cors")); // (méthode alternative)


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";

MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
    let db=client.db("INFODB");

/*Liste de produits */
app.get("/produits", (req,res)=> {
    console.log("/produits");
    try{
        db.collection("produits").find().toArray((err, documents)=> {
            res.end(JSON.stringify(documents,null," "));
        });
    } catch(e){
        console.log("Erreur sur /produits: "+e);
        res.end(JSON.stringify([]));
    }
})

app.get("/produits/:type/:prixmax/:prixmin", (req,res) => {
    // let categorie = req.params.categorie;
         
    let categorie = req.params.type;

    let prixmax = parseInt(req.params.prixmax);
    
    
    let prixmin = parseInt(req.params.prixmin);
    console.log("/produits/"+categorie+"/"+req.params.prixmax+"/"+req.params.prixmin);
    let o = {}
    if(categorie!="*"){
        o.type = categorie;
    }
    
    if(req.params.prixmax!="*" || req.params.prixmin!="*"){
           
        o.prix = {}
    
        if(req.params.prixmax!="*"){
                o.prix['$lte'] = prixmax;
            }
                
        if(req.params.prixmin!="*"){
                o.prix['$gte'] = prixmin;
            }
    }
        
    console.dir(o);

    try{
        
        db.collection("produits").find(o).toArray((err, documents) => {
            res.end(JSON.stringify(documents,null," ")); // la liste des objets seront qui ont été renvoyé par MongoDB dans la var documents
        });
               
    }catch{
        console.log("Erreur sur /produits/"+categorie+" : "+ e);
        res.end(JSON.stringify([]));

    }

});



/*Liste des catégories de produits*/
app.get("/categories",(req,res) => {
     console.log(db);
    console.log("/categories");
    categories = [];
    try{
        db.collection("produits").find().toArray((err,documents)=>{
            for (let doc of documents){
                if (!categories.includes(doc.type)) categories.push(doc.type);
            }
            console.log("Renvoi de"+JSON.stringify(categories) );
            res.end(JSON.stringify(categories,null," "));
        });
    } catch(e){
        console.log("Erreur sur /categories:"+e);
        res.end(JSON.stringify([]));
    }
});


/* Inscription */

app.post("/inscription", (req,res) => {
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let password = req.body.password;
    let sexe = req.body.sexe;

    console.log("/utilisateurs/inscription avec "+JSON.stringify(req.body));
    try{
        db.collection("membres")
        .find({email:email})
        .toArray((err, documents) => {
            console.log(JSON.stringify(documents));
            if (documents.length == 1){
                res.end(JSON.stringify({"resultat": 1, "message": "Utilisateur déjà existant"}));}
                else{
                db.collection("membres").insertOne({nom:nom, prenom:prenom, email:email, password:password, sexe:sexe});
                res.end(JSON.stringify({"resultat": 0, "message": "Inscription réussie"}));
        }});
    }catch (e){
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }

  });


/* Ajouter un produit au panier */

app.post("/ajouterAuPanier", (req,res) => {
    console.log(req.body);
    let produit={
    "email" : req.body.email,
    "img" : req.body.img,
    "nom" : req.body.nom,
    "marque" : req.body.marque,
    "prix" : req.body.prix,
    "quantite" : req.body.quantite
    }
    try{
        db.collection("panier").find({email:produit.email})
        .toArray((err, documents) => {
            console.log(JSON.stringify("user found : " + documents));
            if (documents.length == 0){
                db.collection("panier").insertOne({email:produit.email, produit:[produit]});
                res.end(JSON.stringify({email:produit.email, produit:[produit]}));}
                else{
                let listProduit = documents[0].produit;
                console.log(listProduit);
                var hasBeenEdit = false; 
                for (var i = 0; i < listProduit.length; i++){ 
                    console.log ("produit courant : " + JSON.stringify(produit));
                    console.log("produit comparé : " + JSON.stringify(listProduit[i]));
                    if (listProduit.nom === produit.nom && listProduit.marque === produit.marque){ 
                        hasBeenEdit = true;
                        listProduit[i].quantite = produit.quantite; }
                        console.log ( " ICI 1 :" + listProduit );
                     }
                      if (!hasBeenEdit) { 
                          listProduit.push(produit);
                          console.log ( " ICI  2 :" + listProduit ); 
                        }
                console.log("panier renvoyé : " + JSON.stringify(listProduit));
                db.collection("panier").update({email:produit.email},{email:produit.email, produit:listProduit});
                res.end(JSON.stringify(listProduit));
        }});
    }catch (e){
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }

  });

/*Liste des produits figurant dans le panier d'un utilisateur */

app.get("/produitsPanier/:email",(req,res) => {
    console.log(db);
    let email = req.params.email;

   try{
       db.collection("panier").find({email:email}).toArray((err,documents)=>{
            if ( documents.length != 0 ){
           console.log("Renvoi de"+JSON.stringify(documents[0].produit));
           res.end(JSON.stringify(documents[0].produit));
            }else{
                res.end(JSON.stringify([]));

            }
       });
   } catch(e){
       console.log("Erreur sur /panier:"+e);
       res.end(JSON.stringify([]));
   }
});

/* Supprimer un produit */

app.post("/supprimerProduit", (req, res) => {
    console.log("dans panier supprimer");
   
    let produit={
        "email" : req.body.email,
        "img" : req.body.img,
        "nom" : req.body.nom,
        "marque" : req.body.marque,
        "prix" : req.body.prix,
        "quantite" : req.body.quantite
        }
   console.log("produit recu : " + produit);

try{
    db.collection("panier").find({email:produit.email}).toArray((err, documents) => {

     
    
    if ( documents.length == 0 ){
    
        let panierVide = [];
        res.end(JSON.stringify(panierVide));
        
    } else {
    
    let listProduit = documents[0].produit ;

    console.log("ici 1   listProduit :"+listProduit);
  
    for (var i = 0; i < listProduit.length; i++) {
    if ( listProduit[i].nom.localeCompare(produit.nom) == 0 ){
    listProduit.splice(i, 1);

    console.log("ici 2   listProduit :"+listProduit);
    }
    }
    db.collection("panier").update({email:produit.email},{email:produit.email, produit:listProduit});
    res.end(JSON.stringify(listProduit));
    }
    })
    } catch (e){
    res.end(JSON.stringify({"panier":"erreur"}));
    }
    })
   
/* Vider un panier */




/* Connexion */

app.post("/membres/connexion", (req,res) => {
    let id = req.body.email;
    let password = req.body.password;
    console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
    try{
        db.collection("membres")
        .find({email:id, password:password})
        .toArray((err, documents) => {
            console.log(JSON.stringify("DOC RECU : " + documents));
            if (documents.length == 1){
                res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));}
                else{
                res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
        }});
    }catch (e){
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }

  });

});
app.listen(8888);
