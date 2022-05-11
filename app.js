const express = require('express');
const router = require('./routes/router');
const err = require('./middlewares/middlewareError');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);
app.use(err);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

// COMENTÁRIOS

// Requisito 2, fluxo: requisição por id  ou de todos, bate na controller, que bate na Service (regra de negócio), na service a função da model é chamada. Na model, caso, fazemos a conexão com o banco/ select pra trazer os produtos. O retorno da função da model, cai na variável que está na service (que tem como valor a função da model sendo chamada), e então a regra de negócio (tipo de validação) é realizada. É retornado um throw em caso de falha, ou então o sucesso. Este retorno volta pra controller, se for o erro retornado cai no catch e o erro é lançado (conforme o midd de erro genérico), se for status de sucesso, retorna o status de sucesso no try (status 200 ou 201...).

// Requisito 3 e 4, fluxo: o usuário envia dados, esses dados primeiro batem no midd de validação products e midd de validação sales, dependendo do body e url que for. Caso não passe na validação do joi, nem segue o fluxo, neste caso a condição do if(error) do midd será satisfeita e o erro então  será lançado com  o status 400 ou 422. Caso os dados enviados satisfaçãm as validações do joi, o fluxo continua: a requisição bate na controlller. A createNameService por ex, é chamada, batemos na service, na service chamamos a getProductName que está na model, na model acessamos o banco de dados e selecionamos o nome de produto "igual" nome enviado pelo usuário, retornamos essa resposta em response. Essa resposta cai na service novamente, na variável verifyName, o retorno é um array, em razão, disso, caso este array seja maior que zero, quer dizer que o nome de produto já existe, logo n pode ser cadastrado no BD, e por isso, lançamos um throw. Caso o nome n exista, a função createNameModel é chamada na model, realizo a inserção no BD dos dados enviados pelo usuário (nome e quantidade do novo produto), e retorno o insertId deste produto, que é o id. Este retorno volta pra service na variável productInsertedId, em seguida, chamo a função getByIdProductsModel com o id do produto criado como parâmetro, na model,  seleciono o produto referente ao id passado e o retorno na primeira posição [0] é exatamente o produto que acabou de ser criado. Este retorno volta pra service na variável product e por fim retornamos este resultado, pra controller na variável newProduct, caindo no try, retornamos ao cliente o produto criado com seu nome e quantidade, se ocorrer erro, caímos no catch.

// Requisito 5, fluxo: os dados para atualizar são enviados, e passam pelos midd de validações, estando tudo ok, vai para controler. updateProduct na controller, possui a updateProductService sendo chamada, sendo assim, batemos na service, que através da getProductIdUp, pega o id referente ao produto que a pessoa passou no body,e  retorno os dados do produto referente a este id (um array), se não encontrar o produto no banco pelo id, erro not found, se encontrar, bate na model updateProductModel e o produto é atualizado np BD, retorno o id referente ao produto atualizado  pra dentro da variável getByIdProductsModel, utilizo por fim a função getByIdProductsModel, com o retorno do id do produto ja atualizado, e busco no banco este produto, e por fim retorno product atualizado. 

// Requisito 6, fluxo: é passado o parâmetro id referente ao produto que deve ser deletado, bate na controller, deleteProductService é chamada.Dentro da deleteProductService chamamos getProductIdUp da model, que retorno através do id, o produto. Verificamos, se o produto n existe, erro not found, se o produto existe , chamo deleteProductModel com o id, e realizo o delete do produto na model. Se der certo o delete, o try do controller retorna o  204, e finalizamos com o end, já que o requisito espera o delete do produto (no body returned for response), e n o retorno de um json por exemplo.

// Requisito 7, fluxo: preciso cadastrar uma nova venda no BD.Primeiro controller, recebe o body enviado pelo usuário com  o id da venda e a quantity (array de objetos, cada objeto é um produto da venda feita). Passo o body para a registerSalesService, na service, na registerSalesService chamo registerSalesModel, registerSalesModel insere a data (da venda) no banco e o id  da nova venda é inserido automatincamente (auto incremento); retorno o id do produto na service na variável saleId . Preciso cadastrar essa nova venda, na tabela sales_product: faço um map em sale (sale é um array da venda que contém meus produtos),chamo dentro do map a registerSalesProductModel com os parâmetros id da venda, id do produto e quantidade do produto, a registerSalesProductModel não me retorna a venda com os produtos inseridos, mas me retorna uma promisse, pq não tenho await no map. await Promise.all(returnPromisse): aqui minhas requisições são resolvidas,  para a venda ser cadastrada no BD na sale_product (com id, product id e quantify) com seus respectivos produtos. Const saleDone, para renomear as chaves do objeto (produto da venda cadastrada), e  por fim, retorno saleDone.
