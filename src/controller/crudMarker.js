const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'jackson',
    password: '20002000',
    database: 'eleição'
})
connection.connect(err=>{
    if(err){
        console.log(err)
    }else{
        console.log('conectou!')
    }
})
module.exports = {
    listar(req, res){
        const comando = `SELECT POSITION FROM LOCAIS_MARCADOS`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error)
                return res.json({erro: 'erro na listagem'})
            }
            else{
                return res.json(results);
            }
        });
    },
    buscar(req,res){
        let marker = req.body
        let comando = `SELECT NOME FROM LOCAIS_MARCADOS WHERE POSITION='${marker.position}'`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro: 'erro ao recuperar informações sobre'});
            }else{
                console.log(results)
                return res.json(results);
            }
        })
    },
    adicionar(req, res){
        const position = req.body.position
        const comando = `INSERT INTO LOCAIS_MARCADOS(POSITION) VALUES('${position}')`
        connection.query(comando, function(error, results, fields){
            if(error){
                console.log(error)
                return res.json({erro:'erro na marcação'})
            }else{
                res.json({message: 'marcação armazenada com sucesso!!'})
            }
        })
    },
    remover(req, res){
        let position = req.body.position;
        const comando = `DELETE FROM LOCAIS_MARCADOS WHERE POSITION = '${position}'`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro:'error ao remover marcação'});
            }else{
                res.json({message:'marcação removida com sucesso!!'});
            }
        })
    },
    atualizar(req,res){
        let marker = req.body
        let comando = `UPDATE LOCAIS_MARCADOS SET NOME = '${marker.nome}' WHERE POSITION='${marker.position}'`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro: 'erro ao atualizar nome da marcação'});
            }else{
                res.json({message:'Novo nome adicionado!!'});
            }
        })
    }
}