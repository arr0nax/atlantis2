import Ember from 'ember';

export default Ember.Controller.extend({


  actions: {
    generateArticle: function() {
      $.getJSON('http://www.setgetgo.com/randomword/get.php', function(response) {
        console.log(response);
      //   $.get('https://www.googleapis.com/customsearch/v1?q='+response+'+-profile&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE&cx=004331326847178532475:pdzqorhdao8', function(response){
      //     console.log('googler response: ' + response.items[0].link);
      //     googler.blogger.getBlogId(response.items[0].link);
      //     $.get("https://www.googleapis.com/blogger/v3/blogs/byurl?url="+response.items[0].link+"&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response){
      //       blogId = response.id;
      //       console.log('getblogid response: '+ blogId);
      //       $.get("https://www.googleapis.com/blogger/v3/blogs/"+this.blogId+"/posts?maxResults=500&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response) {
      //         console.log(response);
      //         var random = Math.floor(Math.random()*response.items.length);
      //         var newPost = this.store.createRecord('article', {
      //           title: response.items[random].title,
      //           body: response.items[random].content,
      //           author: "working",
      //           img: 'great!'
      //         });
      //         newPost.save();
      //       })
      //     })
      //   })
    });
    }
  }
});
