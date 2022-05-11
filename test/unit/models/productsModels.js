const { expect } = require('chai');
const productsModel = require('./../../../models/productsModel');
const connection = require('./../../../models/connection');
const { response } = require('express');
const sinon = require('sinon');

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

        expect(response).to.be.not.empty;
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
});
