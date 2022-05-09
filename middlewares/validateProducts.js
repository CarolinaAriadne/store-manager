const joi = require('joi');

const validateError400 = joi.object({
    name: joi.string()
    .required()
    .messages({
        'any.required': '"name" is required',   
    }),
    quantity: joi.number()
    .required()
    .messages({
        'any.required': '"quantity" is required',
    }),

});

const validateError422 = joi.object({
    name: joi.string()
    .required()
    .min(5)
    .message({
        'string.min': '"name" length must be at least 5 characters long',
    }),
    quantity: joi.number()
    .required()
    .min(1)
    .messages({
        'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

const validateDadosErro400 = (req, _res, next) => {
    const { error } = validateError400.validate(req.body);

    if (error) next({ status: 400, message: error.message });

    next();
};

const validateDadosErro422 = (req, _res, next) => {
    const { error } = validateError422.validate(req.body);

    if (error) next({ status: 422, message: error.message });

    next();
};

module.exports = {
    validateDadosErro400,
    validateDadosErro422, 
}; 

// push - teste
