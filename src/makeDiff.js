import _ from 'lodash';

const makeDifferance = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'children', value: makeDifferance(obj1[key], obj2[key]) };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    return {
      key, type: 'changed', value1: obj1[key], value2: obj2[key],
    };
  });
};

export default makeDifferance;
