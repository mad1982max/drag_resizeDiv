import 'bootstrap';
import './style.scss';
import '../src/img/expand.svg'


let hoverFlag = false;
let isMiniVisible = true;

const map = document.querySelector( '.minimap' );

const pinBtn = document.getElementById( 'pin' );
pinBtn.addEventListener( 'click', () => console.log( 'click on pin' ) );
pinBtn.addEventListener( 'mousemove', () => {
  console.log( 'mousemove' );
} );
pinBtn.addEventListener( 'mouseenter', () => {
  hoverFlag = true;
  console.log( 'mouseenter', hoverFlag );
} );
pinBtn.addEventListener( 'mouseleave', () => {
  hoverFlag = false;
  console.log( 'mouseleave', hoverFlag )
} );


const closeMiniMapBtn = document.getElementById( 'closeMiniMapBtn' );
closeMiniMapBtn.addEventListener( 'click', visibilityMinimap );


const minimapBtn = document.getElementById( 'minimapBtn' );
minimapBtn.addEventListener( 'click', visibilityMinimap );


function visibilityMinimap() {
  console.log( 'click' );
  map.classList.toggle( 'close' )
}

function makeResizableDiv( div ) {
  const element = document.querySelector( div );
  const resizer = document.querySelector( '.resizeMapBtn' )
  const minimum_size = 200;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  let portion = 2;

  resizer.addEventListener( 'mousedown', function ( e ) {
    console.log( 'mousedown resiser' );

    e.preventDefault()
    e.stopPropagation()

    original_height = element.getBoundingClientRect().height;
    original_width = element.getBoundingClientRect().width;
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener( 'mousemove', resize )
    window.addEventListener( 'mouseup', stopResize )
  } )

  function resize( e ) {
    const height = original_height + ( e.pageY - original_mouse_y )
    const width = original_width - ( e.pageX - original_mouse_x )
    if ( height > minimum_size ) {
      element.style.height = height + 'px'
    }
    if ( width > minimum_size ) {
      element.style.width = width + 'px'
      //element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    }
  }

  function stopResize() {
    window.removeEventListener( 'mousemove', resize )
  }
}


makeResizableDiv( '.minimap' )
dragElement( '.minimap' );

function dragElement( div ) {
  let xOld, yOld, xDif, yDif;
  const element = document.querySelector( div );
  console.log( 'el', element );

  element.addEventListener( 'mousedown', dragMouseDown, false );

  function dragMouseDown( e ) {
    console.log( 'onmousedown drag' );
    e.preventDefault();
    xOld = e.clientX;
    yOld = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag( e ) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      xDif = xOld - e.clientX;
      yDif = yOld - e.clientY;
      xOld = e.clientX;
      yOld = e.clientY;
      // set the element's new position:
      element.style.top = ( element.offsetTop - yDif ) + "px";
      element.style.left = ( element.offsetLeft - xDif ) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }



  }


}