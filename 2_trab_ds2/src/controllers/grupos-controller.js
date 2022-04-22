let grupos = [];

const { nanoid } = require('nanoid');
const { dbcon } = require('../config/connection-db');
const { Filme, FilmeDAO } = require('../models/grupo');


class GruposController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

    async mostraAlterar(req, res) {
        const { id } = req.params;
        const grupo = await FilmeDAO.buscaPeloId(id);
        res.render('alterar-grupo', { grupo: grupo })
    }

    async alterar(req, res) {
        const { id } = req.params;
        const { nome, genero, sinopse, lancamento} = req.body;
        const grupo = new Filme(id, nome, genero, sinopse, lancamento);
        
        const resultado = await FilmeDAO.atualiza(grupo);
        res.send("Chamei o alterar do controller e fui pro banco... resultado " + resultado);
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({ session: req.session });
        // LISTAGEM DE TODOS OS FILMES MOSTRANDO O NOME
        // O NOME É CLICAVEL E REDIRECIONA PARA O DETALHAR DO FILME
        // let html = '';
        // filmes.forEach(filme => {
        //     html += `<a href="/filmes/${filme.id}">${filme.nome}</a><br></br>`
        // })
        const result = await dbcon.query('SELECT * FROM filmes');
        console.log({ result });

        // return res.send(html);
        return res.render('listagem', { user: req.session.user, filmes: result.rows });
    }

    async deletar(req, res) {
        const { id } = req.params;
        const grupoIdx = grupos.findIndex(f => f.id == id);
        filmes.splice(grupoIdx, 1);

        return res.redirect('/filmes')
    }

    async detalhar(req, res) {
        const { id } = req.params;
        const filme = await FilmeDAO.buscaPeloId(id);
        return res.render('detalhar', { filme: filme });

    }

    async cadastrar(req, res) {
        console.log(`Cadastrando um filme`);
        console.log({ body: req.body });
        
        const { nome, genero, sinopse, lancamento} = req.body;
        
        const grupo = new Grupo(null, nome, genero, sinopse, lancamento);
        await FilmeDAO.cadastrar(grupo);
        
        return res.redirect('/filmes');

    }
}

module.exports = { GruposController }