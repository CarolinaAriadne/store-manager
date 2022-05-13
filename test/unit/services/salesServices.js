const { expect } = require('chai');
const salesService = require('./../../../services/salesService')
const salesModel = require('./../../../models/salesModel');
const { response } = require('express');
const sinon = require('sinon');
const { execute } = require('./../../../models/connection');

describe('Busca todas as vendas no BD, func getAllServiceSales', () => {
    describe('Retorna as vendas', () => {
        const executeResponse = [{
            saleId: 1,
            date: '2022-05-12T00:46:00.000Z',
            productId: 1,
            quantity: 5
        },
        ]

        before(() => {
            sinon.stub(salesModel, 'getAllSalesModel').resolves(executeResponse)
        })
        after(() => {
            salesModel.getAllSalesModel.restore()
        })
        it('É retornado um array', async () => {
            const result = await salesService.getAllServiceSales()

            expect(result).to.be.an('array')
        })
        it('Objetos do array contém os atributos saleId, date, productId e quantity', async () => {
            const [result] = await salesService.getAllServiceSales()
            expect(result).to.be.includes.all.keys(
                'saleId',
                'date',
                'productId',
                'quantity'
            )    
        });

    })
    describe('Quando não são retornadas as vendas', () => {
        const executeResponse = []

        before(() => {
            sinon.stub(salesModel, 'getAllSalesModel').resolves(executeResponse)
        })
        after(() => {
            salesModel.getAllSalesModel.restore();
        })
        it('Retorna a mensagem "Sales not found"', async () => {
            try {

            } catch (err) {
              expect(err.message).to.be.equal('Sales not found')
            }
        })
    })
})
describe('Busca produto, pelo id', () => {
    describe('Quando o produto é encontrado', () => {

        const executeResponse = [{
            saleId: 1,
            date: '2022-05-12T00:46:00.000Z',
            productId: 1,
            quantity: 5
        },
        ]

        before(() => {
            sinon.stub(salesModel, 'getByIdSalesModel').resolves(executeResponse)
        })
        after(() => {
            salesModel.getByIdSalesModel.restore()
        })
        it('Retorna um array', async () => {
            const result = await salesService.getByIdServiceSales()

            expect(result).to.be.an('array')
        })
        it('O obj contém date, productId, quantity e saleId', async () => {
            const [response] = await salesService.getByIdServiceSales()

            expect(response).to.be.have.all.keys(
                'date',
                'productId',
                'quantity',
                'saleId'
            )
        })
    })
})