const path = require('path');

const { Repair } = require('../models/repairs');

const { catchAsync } = require('../utils/catchAsync');

const renderIndex = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({ where: { status: 'active' } });

  const indexPath = path.join(__dirname, '..', 'views', 'index.pug');

  res.status(200).render(indexPath, {
    title: 'Max have more repair',
    repairs,
  });
});

module.exports = { renderIndex };