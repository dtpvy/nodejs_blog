const Handlebars = require('handlebars');

module.exports = {
  sum: (a, b) => a + b,
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
      default: '<i class="fas fa-sort"></i>',
      asc: '<i class="fas fa-sort-amount-down-alt"></i>',
      desc: '<i class="fas fa-sort-amount-down"></i>',
    };
    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    };

    const type = types[sortType];
    const icon = icons[sortType];
    console.log(type, icon);
    const href = `?_sort&column=${field}&type=${type}`;
    var result = `<a href=${href}>${icon}</a>`;
    return new Handlebars.SafeString(result);
  },
};
