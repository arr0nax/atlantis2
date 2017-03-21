import Ember from 'ember';
export default Ember.Controller.extend({
  actions: {
    generateArticle: function() {
      console.log('response');
      var ember2 = this;
      $.get('http://www.setgetgo.com/randomword/get.php', function(response) {
        console.log(response);
        var randomword = response;
        $.get('https://www.googleapis.com/customsearch/v1?q='+response+'+-profile&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE&cx=004331326847178532475:pdzqorhdao8', function(response){
          if(response.items[0].link){
            console.log('googler response: ' + response.items[0].link);
            $.get("https://www.googleapis.com/blogger/v3/blogs/byurl?url="+response.items[0].link+"&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response){
              console.log(response);
              var blogId = response.id;
              console.log('getblogid response: '+ blogId);
              $.get("https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts?maxResults=500&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response) {
                console.log(response);
                var random = Math.floor(Math.random()*response.items.length);
                var newPost = ember2.store.createRecord('article', {
                  title: response.items[random].title,
                  body: response.items[random].content,
                  author: response.items[random].author.displayName,
                  img: response.items[random].author.image.url,
                  seed: randomword
                });
                newPost.save();
                console.log(newPost);
                console.log(randomword);
                $.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e4d50be66420e011afd6d560e5d7746e&tags="+randomword+"&per_page=1&format=json", function(response){
                  console.log(response);
                  var flickr = response.slice(14, -1);
                  flickr = JSON.parse(flickr);
                  console.log(flickr.photos);
                  console.log(flickr.photos.photo[0]);
                  var flickrurl = 'https://farm'+flickr.photos.photo[0].farm+'.staticflickr.com/'+flickr.photos.photo[0].server+'/'+flickr.photos.photo[0].id+'_'+flickr.photos.photo[0].secret+'.jpg';
                  $('body').css('background-image', "url("+flickrurl+")");
                  // $('.jumbotron').css('background-color','red');
                });
              });
            });
          }
        });
      });
    }
  }
});
