import Ember from 'ember';

export default Ember.Component.extend({
actions: {
  displayBody(author, body) {
    $('#'+author).html(body);
  }
}
});
