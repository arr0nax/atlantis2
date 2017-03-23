import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateBackground(image) {
      $('body').css('background-image', 'url('+image+')')
    }
  }
});
