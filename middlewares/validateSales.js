const joi = require('joi');

const validateError400 = joi.object({
    productId: joi.string()
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