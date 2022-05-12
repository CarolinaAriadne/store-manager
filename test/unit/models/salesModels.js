const { expect } = require('chai');
const salesService = require('./../../../models/salesModel');
const connection = require('./../../../models/connection');
const { response } = require('express');
const sinon = require('sinon');
const { execute } = require('./../../../models/connection');

describe.only('Busca todas as vendas no BD, func getAllSalesModel', () => {
    describe('Retorna as vendas', () => {
        const executeResponse = [{
            saleId: 1,
            date: '2022-05-12T00:46:00.000Z',
            productId: 1,
            quantity: 5
        },
        ]

        before(() => {
            sinon.stub(connection, 'execute').resolves([executeResponse])
        })
        after(() => {
            connection.execute.restore()
        })
        it('É retornado um array', async () => {
            const result = await salesService.getAllSalesModel()

            expect(result).to.be.an('array')
        })
        it('Objetos do array contém os atributos saleId, date, productId e quantity', async () => {
            const [result] = await salesService.getAllSalesModel()
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
            sinon.stub(connection, 'execute').resolves([executeResponse])
        })
        after(() => {
            connection.execute.restore()
        })
        it('Espera um array vazio quando vendas não são encontradas', async () => {
            const result = await salesService.getAllSalesModel()

            expect(result).to.be.empty;
        })
    })
})