import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateBackground(image) {
      console.log('hello');
      $('body').css('background-image','url('+image+')');
    }

  }
});
