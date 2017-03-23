import Ember from 'ember';
export default Ember.Component.extend({
  actions: {
    generateArticle: function() {
      var ember2 = this;
      $.get('http://www.setgetgo.com/randomword/get.php', function(response) {
        var randomword = response;
        $.get('https://www.googleapis.com/customsearch/v1?q='+response+'+-profile&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE&cx=004331326847178532475:pdzqorhdao8', function(response){
          if(response.items[0]){
            $.get("https://www.googleapis.com/blogger/v3/blogs/byurl?url="+response.items[0].link+"&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response){
              if(response.id){

                var blogId = response.id;
                $.get("https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts?maxResults=500&key=AIzaSyBpH6fxVBVp05lfBOVcjO4QE70s_GdIKSE", function(response) {
                  if(response){

                    var random = Math.floor(Math.random()*response.items.length);
                    var blogdata = response;
                    $.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e4d50be66420e011afd6d560e5d7746e&tags="+randomword+"&per_page=1&format=json", function(response){
                      var flickr = response.slice(14, -1);
                      flickr = JSON.parse(flickr);
                      if(flickr.photos.photo[0]){
                        var flickrurl = 'https://farm'+flickr.photos.photo[0].farm+'.staticflickr.com/'+flickr.photos.photo[0].server+'/'+flickr.photos.photo[0].id+'_'+flickr.photos.photo[0].secret+'.jpg';
                        $('body').css('background-image', "url("+flickrurl+")");
                        var params =  {
                          title: blogdata.items[random].title,
                          body: blogdata.items[random].content,
                          author: blogdata.items[random].author.displayName,
                          img: flickrurl,
                          seed: randomword
                        };
                        console.log('found a photo');
                        ember2.sendAction('saveNewPost', params);


                      }
                      else {
                        $.get("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e4d50be66420e011afd6d560e5d7746e&per_page=1&format=json", function(response) {
                          var flickr = response.slice(14, -1);
                          flickr = JSON.parse(flickr);
                          var flickrurl = 'https://farm'+flickr.photos.photo[0].farm+'.staticflickr.com/'+flickr.photos.photo[0].server+'/'+flickr.photos.photo[0].id+'_'+flickr.photos.photo[0].secret+'.jpg';
                          $('body').css('background-image', "url("+flickrurl+")");
                          var params =  {
                            title: blogdata.items[random].title,
                            body: blogdata.items[random].content,
                            author: blogdata.items[random].author.displayName,
                            img: flickrurl,
                            seed: randomword
                          };
                          console.log('used a rando');
                          ember2.sendAction('saveNewPost', params);
                        });

                      }
                    });
                  } else {
                    console.log("someone deleted their blog");
                  }
                });
              } else {
                console.log("someone deleted their blog");
              }
            });
          } else {
            console.log("didn't find any blogs with"+randomword+"in them");
          }
        });
      });
    }
  }
});
