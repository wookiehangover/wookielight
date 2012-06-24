(function(){

  var window = this;
  var users = {
    currentColorValue: 0
  };
  var channels = {
    currentColorValue: 0
  };
  var totalColors = 16;

  var highlight = function( element, elClass, cache, addClass ) {
    var el = element.querySelector( elClass );
    var name;

    // no element found?
    if ( !el ) {
      return;
    }

    // get the contents of the element's elClass
    label = el.innerHTML;

    // check for bouncer/system name and flag it as notice
    if ( /[\*]{3}/.test( label ) ) {
      el.className += " notice";
      return;
    }

    // is the label already being tracked?
    if ( !cache[label] ) {
      cache[label] = cache.currentColorValue;
      // increment and mod currentColor
      cache.currentColorValue = ( cache.currentColorValue + 1 ) % totalColors;
    }

    // add the color class to that user
    el.className += " " + addClass + cache[label];
  };

  // when a new line is added
  var process = function(e){

    // handle console messages different than regular
    if ( /console/.test( window.document.body.className ) ) {
      highlight( e, '.place', channels, 'color' );
      return;
    }

    // add color class for users
    highlight( e, '.sender', users, 'color' );
  };

  // listen for new nodes added
  document.addEventListener('DOMNodeInserted', function(e){
    // only worry about new lines
    if ( /line/.test( event.target.className ) ) {
      process( event.target );
    }
  });

  window.console = {
    log: function() {
      var msgs = [].slice.call( arguments );
      var line = document.createElement('div');
      line.innerHTML = '<span class="log-message message"><span class="log-item">' + msgs.join('</span>  <span class="log-item">') + '</span></span>';
      document.body.appendChild( line );
    },
    dir: function( wat ) {
      window.console.log( JSON.stringify( wat ) );
    },
    error: function() {
      window.console.log.apply( arguments );
    }
  };

  window.onerror = function ( errorMessage) {
    window.console.error( 'OOPS!: ', errorMessage );
  };

}());
