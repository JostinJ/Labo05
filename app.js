const http = require('http');
const path = require('path');
const fs = require('fs')
const PORT = 8000;

http.createServer((requete, reponse)=>{
    // afficher la page Web demandée???
    if (requete.url === '/' || requete.url === '/index.html') {
        let nomFichier = path.join(__dirname,'pagesWeb','index.html');
        fournirPageWeb(nomFichier, reponse);
    } else {
        let nomFichier = path.join(__dirname,'pagesWeb',requete.url);
        fournirPageWeb(nomFichier,reponse)
    }
    console.log(requete.url);
}).listen(PORT, ()=>console.log('Le service Web est démarré sur le port=', PORT));



function fournirPageWeb(fileName,reponse) {
    console.log('La page web à afficher est :', fileName);
    let typeFichier = path.extname(fileName);
    let typeContenu = 'text/html';
    switch(typeFichier) {
        case '.js':
            typeContenu = 'text/javascript';
            break;
        case '.css':
            typeContenu = 'text/css';
            break;
        case '.png':
            typeContenu = 'image/png';
            break;
        case '.jpg':
            typeContenu = 'image/jpg';
            break;
        case '.gif':
            typeContenu = 'image/gif';
            break;
        case '.jpeg':
            typeContenu = 'image/jpeg';
            break;
    }
    fs.readFile(fileName,(err,data)=>{
        if(err){
            if(err.code==='ENOENT'){
                reponse.writeHead(404, { 'Content-Type': 'text/html'});
                reponse.write('<h1>Page demand&eacute;e introuvable</h1>\n');
                reponse.write(`<h2>${path.basename(fileName)}</h2>`);
                reponse.end();
            }else{
                reponse.writeHead(500, { 'Content-Type': 'text/html'});
                reponse.write('<h1>Erreur interne du serveur</h1>\n');
                reponse.write(`<h2>Code${err.code}</h2>`);
                reponse.end();
            }
        }else{
            reponse.writeHead(200,{'Content-Type': typeContenu})
            reponse.write(data)
            reponse.end();
        }
    })
}