const Joi = require('joi');

const listingSchema= Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow("",null).min(0)
    }).required()
})

module.exports={listingSchema};



// BACKEND VALIDATION USING JOI FOR REVIEW 
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().max(5).min(1),
        comment:Joi.string().required()
    }).required()
})