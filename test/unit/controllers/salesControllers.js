const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('./../../../services/salesService')
const salesControler = require('./../../../controllers/salesController')

describe('Testa retorno das vendas', () => {
    describe('Retorna todas as vendas',  () => {

        const request = {};
        const response = {}

        const result = [{
            saleId: 1,
            date: '2022-05-12 19:30:20',
            productId: 1,
            quantity: 10
        }]

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(salesService, 'getAllServiceSales').resolves(result)
        })

        after(() => {
            salesService.getAllServiceSales.restore()
        })

        it('É retornando o  status 200', async () => {
            await salesControler.getAllControllerSales(request, response)

            expect(response.status.calledWith(200)).to.be.equal(true)
        })
        it('É retornando um array', async () => {
            await salesControler.getAllControllerSales(request, response)

            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
        })

        
    })
})
describe('Testa se a busca pelo id retorna a venda', () => {
    
})