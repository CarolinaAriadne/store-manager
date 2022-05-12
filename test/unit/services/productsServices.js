const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { execute } = require('./../../../models/connection');
const connection = require('./../../../models/connection');

describe('Busca todos os produtos no BD - func getAllServiceProducts', () => {
  describe('Quando não existe produto no banco', () => {

		const resultExecute = [[]]
			before(() => {
				sinon.stub(productsModel, 'getAllProductsModel')
				.resolves(resultExecute);
			});

			after(() => {
			productsModel.getAllProductsModel.restore()
			});
		      
    it('Retorna um array', async () => {
			const result = await productsService.getAllServiceProducts();

			expect(result).to.be.an("array");
		});
		it('Se o array está vazio', async () => {
			const [result] = await productsService.getAllServiceProducts();

			expect(result).to.be.empty;
		});
	})
	describe('Quando existem produtos no BD', async () => {
		const resultExecute = [{
			id:1,
			name: 'Martelo de Thor',
			quantity: 10,
			
		},
		{
			id: 2,
			name: "Traje de encolhimento",
			quantity: 20
		}
		]
			before(() => {
				sinon.stub(productsModel, 'getAllProductsModel')
				.resolves(resultExecute)
			});

			after(() => {
				productsModel.getAllProductsModel.restore();
			});

		it('Retorna um array', async () => {
			const result = await  productsService.getAllServiceProducts()     
			
			expect(result).to.be.an('array')
		});
		it('O array não está vazio', async () => {
			const result = await  productsService.getAllServiceProducts()

			expect(result).to.be.not.empty;
		});
		it('O array possui objetos', async () => {
			const [result] = await  productsService.getAllServiceProducts()
			// console.log(result);

			expect(result).to.be.an('object')
		});
		it('Objeto do array contém os atributos id, name e quantity', async () => {
			const [result] = await  productsService.getAllServiceProducts()
			expect(result).to.be.includes.all.keys(
					'id',
					'name',
					'quantity'
				)    
		});
	});
});

describe('Verifica produto procurado pelo id - func getByIdServiceProduct', () => {
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
		   const result = await productsService.getByIdServiceProduct();
		   expect(result).to.be.an('object');
	  })
	  it('Objeto  contém os atributos id, name e quantity', async () => {
		   const result = await  productsService.getByIdServiceProduct();
		   expect(result).to.be.includes.all.keys(
			'id',
			'name',
			'quantity'
		);    
	  });  
	 });
	describe('O id não é encontrado', () => {
		const resultExecute = undefined;
  
		  before(() => {
		  sinon.stub(connection, 'execute')
		 .resolves(resultExecute);
	   });
  
		  after(() => {
		  connection.execute.restore();
	   });
	   it('Retorna a mensagem de erro "Product not found"', async () => {
		try {
   
		} catch (err) {
		  expect(err.message).to.be.equal('Product not found')
		}
	   }) 
	 })
  });
describe('Criação de novo produto no BD, func create -  createNameService ', () => {
	describe('Produto inserido', () => {

		const resultGetProductName = []
		
		  const resultCreateName = [{
			insertId: 5
		  }]
		
		  before(() => {
			sinon.stub(productsModel, 'getProductName')
			.resolves(resultGetProductName)
			sinon.stub(productsModel, 'createNameModel')
			.resolves(resultCreateName)
		});
		
		after(() => {
			productsModel.getProductName.restore();
			productsModel.createNameModel.restore();
		})
		it('Se é retornado um objeto', async () => {
			const result = await productsService.createNameService()

			expect(result).to.be.an('object')
		})
		it('Objeto  contém os atributos  name e quantity', async () => {
			const result = await productsService.createNameService();
			expect(result).to.be.includes.all.keys(
			 'name',
			 'quantity'
		 );    
	   });
	})
})
