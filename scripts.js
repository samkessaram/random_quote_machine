getQuote();
  
  function getQuote(){
    var timestamp = Date.now();
    var url = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&' + timestamp;
    $.getJSON(url,function(json){

      var quote = json[0].content.slice(3,-5);
      var author = json[0].title;

      $('#quote').html(quote);
      $('#author').html(author);
      $('body').show();

      editTweetLink($("#quote").html(), $("#author").html()); // use jQuery to grab quote stripped of HTML encoding
      checkLength($("#quote").html(), $("#author").html());

      var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
  });

  pattern.canvas(document.getElementById('canvas'));
    }); 
  };

  function checkLength(quote,author){
    goodLength = quote.length + author.length + 2 <= 140; // add 2 to account for extra characters built into tweet.
    if ( !goodLength ){
      $("#tweet").attr('disabled',true);
    } else {
      $("#tweet").attr('disabled',false);
    }
  }

  $("#fetch").on("click",function(){
    getQuote();
  });
  
  var goodLength = true;
  
  function editTweetLink(quote, author){
    quote = encodeURIComponent(quote);
    author = encodeURIComponent(author);
    var url = 'https://twitter.com/intent/tweet?text=' + quote + " -" + author;
    $('#tweet').attr('href',url);
  }
  
  $('#tweet').click(function(event){
    if ( !goodLength ){
      event.preventDefault();
      alert("Shoot! This quote is too long to tweet.");
    }
});
