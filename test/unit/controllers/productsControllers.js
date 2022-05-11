const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productController = require('../../../controllers/productsController');

describe('A chamada do controller getAllControllerProducts', () => {
	describe('Quando não existem produtos no BD', () => {

		const request = {}
		const response = {}

		before(() => {
			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
			
			sinon.stub(productsService, 'getAllServiceProducts')
		})

		after(() => {
			productsService.getAllServiceProducts.restore();
		})
	

		it('Quando existe produto no BD, o status é chamado, passando código 200', async () => {
		await productController.getAllControllerProducts(request, response)

			expect(response.status.calledWith(200)).to.be.equal(true)
		});

		it('Se o método json é retornado contendo um array', async () => {
			await productController.getAllControllerProducts(request, response)

			expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
		});

	});
	describe('Quando existem produtos no BD', () => {
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

		const request = {}
		const response = {}

		before(() => {
			response.status = sinon.stub().returns(response)
			response.json = sinon.stub().returns(response)

			sinon.stub(productsService, 'getAllServiceProducts')
		})

		after(() => {
			productsService.getAllServiceProducts.restore();
		})
		it('Retorna o status 200', async () => {
		await productController.getAllControllerProducts(request, response)

			expect(response.status.calledWith(200)).to.be.equal(true)
		})
		it('Se o método json é retornado contendo um array de objetos, com as chaves id, name e quantity', async () => {
			
			 await productController.getAllControllerProducts(request, response)
			 const [product] = resultExecute
			//  console.log(product);
			expect(product).to.have.all.keys(
				'id',
				'name',
				'quantity'
		) 
			expect(response.json.calledWith(resultExecute)).to.be.equal(true);
		})

	});
});
