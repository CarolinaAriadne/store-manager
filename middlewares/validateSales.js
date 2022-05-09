const joi = require('joi');

const validateError400 = joi.object({
    productId: joi.number()
    .required()
    .messages({
        'any.required': '"productId" is required',   
    }),
    quantity: joi.number()
    .required()
    .messages({
        'any.required': '"quantity" is required',
    }),

});

const validateError422 = joi.object({
    quantity: joi.number()
    .required()
    .integer()
    .min(1)
    .messages({
        'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

const validateSales400 = (req, _res, next) => {
    // const { productId, quantity } = req.body;
    const dados = req.body;
    // console.log(dados);

    dados.forEach(({ productId, quantity }) => {
        const { error } = validateError400.validate({ productId, quantity });
        if (error) next({ status: 400, message: error.message });
    });
    
    // const { error } = validateError400.validate({ productId, quantity });
    
    // if (error) next({ status: 400, message: error.message });

    next();
};

const validateSales422 = (req, _res, next) => {
    const dados = req.body;

    dados.forEach(({ quantity }) => {
        const { error } = validateError422.validate({ quantity });

    if (error) next({ status: 422, message: error.message });
    });

    next();
};

module.exports = {
    validateSales400,
    validateSales422, 
}; 

// push