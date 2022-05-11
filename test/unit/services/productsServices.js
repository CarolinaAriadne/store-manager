const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

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
				.resolves([resultExecute])
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