const express = require('express');
const Router = express.Router();
const crudPessoa = require('./controller/crudPessoa.js')
const crudSec = require('./controller/crudSec')
const crudMarker = require('./controller/crudMarker')

Router.get('/', (req, res)=>{
    res.json({message: 'funcionando perfeitamente'});
})

Router.get('/pessoa/listar', crudPessoa.listar);

Router.get('/pessoa/buscar/:id', crudPessoa.buscar);

Router.get('/pessoa/filtrar/:prop', crudPessoa.filtrar)

Router.post('/pessoa/adicionar', crudPessoa.adicionar);

Router.delete('/pessoa/remover/:id', crudPessoa.remover);

Router.put('/pessoa/atualizar/:id', crudPessoa.atualizar);

//-=-=-=--==-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-

Router.get('/secao/listar', crudSec.listar);

Router.get('/secao/buscar/:numero', crudSec.buscar);

Router.get('/secao/filtrar/:prop', crudSec.filtrar)

Router.post('/secao/adicionar', crudSec.adicionar);

Router.delete('/secao/remover/:numero', crudSec.remover);

Router.put('/secao/atualizar/:numero', crudSec.atualizar);


//-=-=-=--==-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-

Router.get('/marker/listar', crudMarker.listar);

Router.post('/marker/buscar', crudMarker.buscar);

Router.post('/marker/adicionar', crudMarker.adicionar);

Router.delete('/marker/remover', crudMarker.remover)

Router.put('/marker/atualizar', crudMarker.atualizar)


module.exports = Router;