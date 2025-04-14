"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequestBody = (schema) => {
    return function requestBodyValidator(req, res, next) {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send("Informe os campos corretamente");
        }
    };
};
exports.default = validateRequestBody;
