const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productController = require('../../../controllers/productsController');

describe('A chamada do controller getAllControllerProducts', () => {
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
			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
			
			sinon.stub(productsService, 'getAllServiceProducts').resolves(resultExecute)
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

		it('Se  é retornado contendo um array de objetos, com as chaves id, name e quantity', async () => {
			
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
describe('Verifica produto procurado pelo id, func getByIdControllerProducts ', () => {
  describe('Quando o id é encontrado', () => {

    const request = {}
    const response = {}

    const responseExecute = {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }

    before(() => {

      request.params = { id: 1}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getByIdServiceProduct').resolves(responseExecute);
    })

    after(() => {
      productsService.getByIdServiceProduct.restore();
    })

    it('Se é retornado um objeto', async () => {
      await productController.getByIdControllerProducts(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    }) 
    it('Se é retornado o status 200', async () => {
      await productController.getByIdControllerProducts(request, response)
      
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

  })
  describe('Quando o id não é encontrado', () => {
    const request = {}
    const response = {}
    const err = { status: 404, message: 'Product not found'}

    before(() => {

      request.params = { id: 45}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getByIdServiceProduct').throws(err)
    })

    after(() => {
      productsService.getByIdServiceProduct.restore();
    })
    it('Retorna a mensagem de erro "Product not found"', async () => {
     try {

     } catch (err) {
       expect(err.message).to.be.equal('Product not found')
     }
    })


  })
})
describe('Inserção de novo produto, func createName', () => {
  describe('Produto é criado', () => {
    
    const request = {};
    const response = {};

    const newProduct = {
      name: 'Capa do homem formiga',
      quantity: 3

    }

    before(() => {

      request.body = {name: 'Capa do homem formiga', quantity: 3}

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'createNameService').resolves(newProduct);
    })
    it('Se o método json é retornando contendo um objeto', async () => {
      await productController.createName(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)

    })
    it('Status 201 é devolvido se o produto é inserido', async () => {
      await productController.createName(request, response)

      expect(response.status.calledWith(201)).to.be.equal(true);
    })

  })
})
