import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  img: DS.attr('string'),
  author: DS.attr('string'),
  seed: DS.attr('string')
});
