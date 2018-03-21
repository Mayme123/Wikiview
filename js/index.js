$(document).ready(function(){
  
  var currentView = 0;
  var searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
  var searchVal = "";
  var searchResults = [];
  
   $( 'body' ).bind('keypress', function(e){
   if ( e.keyCode == 13 ) {
     $( this ).find( '.search-button' ).click();
   }
 });
  
  $(".get-rand-wiki").on("click", function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  });
  
  $(".search-button").on("click", function(){
    if(currentView === 0){
      searchView();
      currentView = 1;
    } else if(currentView === 1){
      searchVal = $(".search-bar").val();
      console.log(searchVal);
      if(searchVal != ''){
        resultsView();
        currentView = 2;
      }
    }else if(currentView === 2){
      search();
    }
  });
  
 
  
  function searchView(){
    $(".black-half").animate({width : 'toggle'});
    $(".white-half").animate({width: '100%'});
    $(".view").fadeOut("fast");
    $(".search-button").animate({
      left: '30%',
      width: '100px'},"slow");
    $(".search-bar").animate({width: "400px",
                             padding: "7px 20px",
                             top : "42%"},"slow");
    $(".white-half").append("<a href='#'><img src='https://i.imgur.com/WhRnrZJ.png' alt='' class='back-button'></a>");
    $(".search-bar").focus();
  }
  
  function resultsView(searchValue){
    $(".search-button").animate({top : "30px"});
    $(".search-bar").animate({top : "42px"});
    $(".search-bar").focus();
    search();
  }
  
  $("body").on("click", ".back-button", function(){
    clearResults();
    $(".search-bar").animate({width : '0',
                             padding: '0'});
    $(".view").fadeIn("fast");
    $(".black-half").animate({width : 'toggle'});
    $(".white-half").animate({width : '50%'});
    $(".search-button").animate({width : '232px',
                                left : '37%',
                                top : '40%'});
    $(".back-button").remove();
    searchVal = '';
    $(".search-bar").val('');
    currentView = 0;
  });
  
  function search(){
    searchVal = $(".search-bar").val();
    ///*
    clearResults();
    $.getJSON((searchUrl+searchVal), function(json){
      for(var i = 0; i < json[1].length; ++i){
        searchResults.push({title: json[1][i], description: json[2][i], link: json[3][i]});
      }
      for(var i = 0; i < searchResults.length; ++i){
        $(".white-half").append("<a href="+ searchResults[i].link +" target='_blank'><div class='result-div' id=result"+ i +">" +
                         "<h4>"+ searchResults[i].title + "</h4>"+ 
                         "<p>"+searchResults[i].description + "</p>"+
                         "</div><a>");
      }
    });
    //*/
  }
  
  function clearResults(){
    if(searchResults.length > 0){
        for(var i = 0; i < searchResults.length; ++i){
          $("#result"+i).remove();
        }
        searchResults = [];
    }
  }
});