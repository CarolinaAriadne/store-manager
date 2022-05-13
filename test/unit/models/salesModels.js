const { expect } = require('chai');
const salesModel = require('./../../../models/salesModel');
const connection = require('./../../../models/connection');
const { response } = require('express');
const sinon = require('sinon');
const { execute } = require('./../../../models/connection');

describe('Busca todas as vendas no BD, func getAllSalesModel', () => {
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
            const result = await salesModel.getAllSalesModel()

            expect(result).to.be.an('array')
        })
        it('Objetos do array contém os atributos saleId, date, productId e quantity', async () => {
            const [result] = await salesModel.getAllSalesModel()
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
            const result = await salesModel.getAllSalesModel()

            expect(result).to.be.empty;
        })
    })
})
describe('Busca uma venda pelo id', () => {
describe('Quando o id é encontrado', async () => {
    const resultExecute = [
        {
            date: "2022-05-12 21:10:50",
            productId: 2,
            quantity: 3
          },
    ]

    before(() => {
        sinon.stub(connection, 'execute').resolves([resultExecute])
    })
    after(() => {
        connection.execute.restore()
   })
   it('É retornando um array', async () => {
       const result = await salesModel.getByIdSalesModel()

       expect(result).to.be.an('array')
   })
   it('O objeto contém as chaves date, productId, quantity', async () => {
       const [result] = await salesModel.getByIdSalesModel()
       expect(result).to.have.all.keys(
           'date',
           'productId',
           'quantity'
       )
   })

})

})


