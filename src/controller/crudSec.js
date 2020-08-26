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
        const comando = `SELECT * FROM SEÇÃO ORDER BY NUMERO`;
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
        let numero_sec = req.params.numero
        const comando = `SELECT * FROM SEÇÃO WHERE numero = ${numero_sec}`;
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
        console.log(prop)
        let key = prop.split('=')[0]
        let value = prop.split('=')[1]
        console.log(value)
        let comando;
        if(['capacidade', 'zona', 'numero'].includes(key)){
            comando = `SELECT * FROM SEÇÃO WHERE ${key} = ${value} ORDER BY NUMERO`;
        }else{
            comando = `SELECT * FROM SEÇÃO WHERE ${key} = '${value}' ORDER BY NUMERO`;
        }
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
    adicionar(req, res){
        let keys = []
        let values = []
        /**
         * a primeira validação é para saber se o valor é numerico(zona, numero, capacidade)
         * assim não precisa-se colcar o valor entre aspas
         * a segunda é para saber se o valor não foi preenchido, caso não, ele preenche com null 
         */
        for(key in req.body){
            keys.push(key)
            if(['zona', 'numero', 'capacidade'].includes(key)){
                if(req.body[key]== ''){
                    values.push('null')
                }else{
                    values.push(req.body[key])
                }
            }else{
                values.push(`'${req.body[key]}'`)
            }
        }
        const comando = `INSERT INTO SEÇÃO(cidade, capacidade, zona, numero, endereço, referência) VALUES(${values})`; 
        connection.query(comando, function(error, results, fields){
            if(error){
                if(error.message.split(':')[0] === 'ER_DUP_ENTRY'){
                    return res.json({erro:'você esta tentando cadastrar uma seção com o mesmo numero de idenficicação'})
                }else{
                    return res.json({erro:'erro no banco de dados'})
                }
            }else{
                res.json({message: 'seção adicionada com sucesso!!'})
            }
        })
    },
    remover(req, res){
        let numero_sec = req.params.numero;
        const comando = `DELETE FROM SEÇÃO WHERE numero = ${numero_sec}`;
        connection.query(comando, function(error, results){
            if(error){
                console.log(error);
                return res.json({erro:'error ao remover'});
            }else{
                res.json({message:'seção removida com sucesso!!'});
            }
        })
    },
    atualizar(req, res){
        let sec = req.body;
        let comando = 
        `UPDATE SEÇÃO SET CIDADE='${sec.cidade}', CAPACIDADE = ${sec.capacidade}, ZONA=${sec.zona}, NUMERO = ${sec.numero}, ENDEREÇO = '${sec.endereço}', REFERÊNCIA='${sec.referência}' WHERE numero=${sec.numero}`;
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