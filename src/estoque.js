var oracledb = require('oracledb');
var dbConfig = require('../Banco/dbconfig');
var sqlutil = require('../Banco/sqlutil');


module.exports = {


  est: function (ctx, bot, param) {

    var sql_query = `select pp.no_produto as NOME, p.id_modelo_produto as MODELO,
    p.quantidade_disponivel as QUANTIDADE
    from T_ESTOQUE_PRODUTO p,
         t_produto pp
    where pp.id_modelo = p.id_modelo_produto
    and p.id_modelo_produto = '${param}'
    order by 1`;

    sqlutil.executar_sql(sql_query, ctx, bot, this);

  },

  fetchRowsFromRS: function (connection, resultSet, numRows, ctx, bot) {
    resultSet.getRows(
      numRows,  // get this many rows


      function (err, rows) {
        var retornoEst = "";

        if (err) {
          console.error(err);
          doClose(connection, resultSet);   // always close the ResultSet
        } else if (rows.length <= 0){
          

          console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
          
          retornoEst += "Falar com o Rhenan, o banco não retornou linhas"
          //bot.sendMessage(ctx.chat.id, "" + retorno);
        } 
        else if (rows.length > 0) {
          console.log("fetchRowsFromRS(): Got " + rows.length + " rows");

          
          for (var i = 0; i < rows.length; i++) {
            retornoEst += rows[i].NOME + " - " + rows[i].MODELO + " - " + rows[i].QUANTIDADE + "\n";

          }

          bot.sendMessage(ctx.chat.id, "Estoque Produto X Quantidade: \n\n" + "<b>" + retornoEst + "</b>", { parse_mode: "HTML" });

          if (rows.length === numRows)      // might be more rows
            fetchRowsFromRS(connection, resultSet, numRows);
          else
            doClose(connection, resultSet); // always close the ResultSet
        } else { // no rows
          doClose(connection, resultSet);   // always close the ResultSet
        }
      });
  }

};

//Note: connections should always be released when not needed
function doRelease(connection) {
  connection.close(
    function (err) {
      if (err) {
        console.error(err.message);
      }
    });
}

function doClose(connection, resultSet) {
  resultSet.close(
    function (err) {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}