const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//config pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//utilizando templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da aplicacao

//pagina inicial 
//req: requisicao
//res: respostas
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {

    //req.query:Quey strings da nossa url
    // console.log(req.query)      

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {

    // //req.bory: o copor do nosso formulário
    // console.log(req.body)
    //inserir dados

    //2 Inserir dados da tabela 
    const query = `
       INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
        
    ]

    function afterInsertData (err){
        if(err){
           console.log(err)
           return res.send ("Erro no cadastro!")
        }
        console.log ("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})

    }

    db.run(query,values, afterInsertData) 



    

})

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        return res.render("search-results.html",{total: 0 })

    }

    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city = '${search}'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        // console.log(rows)
        //mostra a pagina html com os dados do banco de dados
        return res.render("search-results.html",{places: rows,total:total})
    })
        
})

server.listen(3000)