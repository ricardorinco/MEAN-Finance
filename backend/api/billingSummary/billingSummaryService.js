const _ = require('lodash');
const billingCycle = require('./../billingCycle/billingCycle');

function getSummary(req, res) {
    billingCycle.aggregate({
        $project: {
            credit: { $sum: '$credits.value' },
            debt: { $sum: '$debts.value' }
        }
    }, {
        $group: {
            _id: null,
            credit: { $sum: '$credit' },
            debt: { $sum: '$debt' }
        }
    }, {
        $project: {
            _id: 0,
            credit: 1,
            debt: 1
        }
    }, function (error, result) {
        if (error) {
            res.status(500).json({ errors: [error] });
        } else {
            res.json(_.defaults(result[0], { credit: 0, debt: 0 }));
        }
    });
}

module.exports = { getSummary };