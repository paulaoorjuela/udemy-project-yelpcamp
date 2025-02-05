const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) =>({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.scapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        scapeHTML:{
            validate(value, helpers) {
                const clean = sanitizeHTML( value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) return helpers.error('string.scapeHTML', { value });
                return clean;
            }
        }      
    }
})

const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().scapeHTML(),
        // image: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().scapeHTML(),
        location: Joi.string().required().scapeHTML()
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().scapeHTML()
    }).required()
})