function validate(validators) {
    return (req, res, next) => {
        try {
            if (validators.body) {
                req.body = validators.body(req.body);
            }

            if (validators.params) {
                req.params = validators.params(req.params);
            }

            if (validators.query) {
                const normalizedQuery = validators.query(req.query);
                for (const key of Object.keys(req.query)) {
                    delete req.query[key];
                }
                Object.assign(req.query, normalizedQuery);
            }

            next();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = validate;