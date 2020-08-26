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
        const comando = `SELECT * FROM PESSOA ORDER BY NOME`;
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
    buscar(req, res){
        let id_user = req.params.id
        const comando = `SELECT * FROM PESSOA WHERE id = ${id_user}`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error)
                return res.json({erro: 'erro na busca'})
            }
            else{
                return res.json(results);
            }
        });
    },
    filtrar(req, res){
        let prop = req.params.prop
        let key = prop.split('=')[0]
        let value = prop.split('=')[1]
        let comando;
        if(key === 'seção'){
            comando = `SELECT * FROM PESSOA WHERE ${key} = ${value} ORDER BY NOME`;
        }else{
            comando = `SELECT * FROM PESSOA WHERE ${key} = '${value}' ORDER BY NOME`;
        }
        connection.query(comando, function(error, results){
            if(error){
                console.log(error)
                return res.json({erro: 'erro na filtragem'})
            }
            else{
                return res.json(results);
            }
        });
    },
    adicionar(req, res){
        let keys = []
        let values = []
        for(key in req.body){
            keys.push(key)
            if(['capacidade', 'seção'].includes(key)){
                if(req.body[key] === ''){
                    values.push('null')    
                }else{
                    values.push(req.body[key])
                }
            }else{
                values.push(`'${req.body[key]}'`)
            }
        }
        const comando = `INSERT INTO PESSOA(cidade, nome, apelido, data_de_nascimento, endereço, seção, telefone, referência, situação) VALUES(${values})`;
        connection.query(comando, function(error, results, fields){
            if(error){
                console.log(error)
                return res.json({erro:'erro no banco de dados'})
            }else{
                res.json({message: 'pessoa adicionada com sucesso!!'})
            }
        })
    },
    remover(req, res){
        let id = req.params.id;
        const comando = `DELETE FROM PESSOA WHERE id = ${id}`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro:'error ao remover'});
            }else{
                res.json({message:'pessoa removida com sucesso!!'});
            }
        })
    },
    atualizar(req, res){
        let pessoa = req.body
        let id = parseInt(req.params.id);
        let comando = `UPDATE PESSOA SET CIDADE = '${pessoa.cidade}', NOME = '${pessoa.nome}', APELIDO = '${pessoa.apelido}', DATA_DE_NASCIMENTO = '${pessoa.data_de_nascimento}', ENDEREÇO = '${pessoa.endereço}', SEÇÃO = ${pessoa.seção}, TELEFONE = '${pessoa.telefone}', REFERÊNCIA = '${pessoa.referência}', SITUAÇÃO = '${pessoa.situação}' WHERE id=${id}`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro: 'erro ao atualizar cadastro'});
            }else{
                res.json({message:'cadastro atualizado!!'});
            }
        })
    }
}