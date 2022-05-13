const { expect } = require('chai');
const productsModel = require('./../../../models/productsModel');
const connection = require('./../../../models/connection');
const { response } = require('express');
const sinon = require('sinon');
const { execute } = require('./../../../models/connection');

describe("Busca todos os produtos no BD - func getAllProductsModel", () => {
  describe("Quando não existe produto cadastrado", () => {

    const resultExecute = [[]]
      before(() => {
        sinon.stub(connection, 'execute')
        .resolves(resultExecute);
      });

      after(() => {
        connection.execute.restore();
      });
        
    it('Retorna um array', async () => {
        const result = await productsModel.getAllProductsModel();

        expect(result).to.be.an("array");
    });
    it('Se o array está vazio', async () => {
        const result = await productsModel.getAllProductsModel();

        expect(result).to.be.empty;
    });
  });
  describe('Quando existem produtos no BD', async () => {

		const resultExecute = [{
			id:1,
			name: 'Martelo de Thor',
			quantity: 10
		},
    {
			id: 2,
			name: "Traje de encolhimento",
			quantity: 20
		}
  ]
			before(() => {
				sinon.stub(connection, 'execute')
				.resolves([resultExecute]);
			});

			after(() => {
				connection.execute.restore();
			});

    it('Retorna um array', async () => {
        const result = await productsModel.getAllProductsModel();     
        
        expect(result).to.be.an('array')
    })
    it('O array não está vazio', async () => {
        const result = await productsModel.getAllProductsModel();

        expect(result).to.be.not.empty;
    });
    it('O array possui objetos', async () => {
        const [result] = await productsModel.getAllProductsModel();

        expect(result).to.be.an('object')
    });
    it('Objeto do array contém os atributos id, name e quantity', async () => {
        const [result] = await productsModel.getAllProductsModel();
        expect(result).to.be.includes.all.keys(
            'id',
            'name',
            'quantity'
        )    
    });
  });
})

describe('Verifica produto procurado pelo id - func getByIdProductsModel', () => {
  describe('O id é encontrado', () => {

      const resultExecute = [{
			  id:1,
		  	name: 'Martelo de Thor',
		  	quantity: 10
		  }]
    
			before(() => {
				sinon.stub(connection, 'execute')
				.resolves([resultExecute]);
			});

			after(() => {
				connection.execute.restore();
			});
    it('Retorna um objeto', async () => {
         const result = await productsModel.getByIdProductsModel();
         expect(result).to.be.an('object');
    })
    it('Objeto  contém os atributos id, name e quantity', async () => {
         const result = await productsModel.getByIdProductsModel();
         expect(result).to.be.includes.all.keys(
          'id',
          'name',
          'quantity'
      );    
    });  
   });
  describe('O id não é encontrado', () => {
      const resultExecute = [];

        before(() => {
        sinon.stub(connection, 'execute')
       .resolves([resultExecute]);
     });

        after(() => {
        connection.execute.restore();
     });
    it('Retorna undefined, se o id não é encontrado', async () => {
        const result = await productsModel.getByIdProductsModel(6);
        expect(result).to.be.an('undefined')
    })  
   })
});
describe('Testa se encontra o produto buscado pelo nome, func getProductName', () => {
    describe('Quando o produto é encontrado', () => {
      const resultExecute = [{
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      }]

      const name = 'capa de herói'

      before(() => {
        sinon.stub(connection, 'execute').resolves([resultExecute]);
      })
      after(() => {
        connection.execute.restore();
      })
      it('Se um array é retornado', async () => {
       
        const result = await productsModel.getProductName(name);
        
        expect(result).to.be.an('array')
      })
      it('Existe a chave name no objeto que vem dentro do array', async () => {
       
        const [result] = await productsModel.getProductName(name);

        expect(result).to.be.includes.all.keys('name');
      })
    })
    describe('Quando o produto não é encontrado', () => {
      const resultExecute = [[]]

      before(() => {
        sinon.stub(connection, 'execute').resolves(resultExecute);
      })
      after(() => {
        connection.execute.restore();
      })
      it('Retorna um array vazio', async () => {
        const result = await productsModel.getProductName();
  
        expect(result).to.be.empty;
      })
    })
    
})
describe('Criação de um novo produto no BD, func createNameModel', () => {
  describe('Quando um novo produto é inserido ', () => {
    const resultExecute = [{
      insertId: 1
    }]

    before(() => {

      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    })

    it('Retorna um número', async () => {
      const result = await productsModel.createNameModel()
      console.log(result)
      expect(result).to.be.a('number')
    })
  })
})