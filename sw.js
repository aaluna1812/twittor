
// let url 
// let swLocation

// function setLocation(){
//     let url = window.location.href
//     let swLocation = "/twittor/";
// }
// console.log({swLocation})
// if ( url.includes("localhost") ) {
//     swLocation = "/FORMACIO/PWA/06-twittor/"
// }

// IMPORTS
importScripts( swLocation + 'js/sw-utils.js' )

const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
    //swLocation,
    // swLocation + 'index.html',
    // swLocation + 'css/style.css',
    // swLocation + 'img/favicon.ico',
    // swLocation + 'img/avatars/hulk.jpg',
    // swLocation + 'img/avatars/ironman.jpg',
    // swLocation + 'img/avatars/spiderman.jpg',
    // swLocation + 'img/avatars/thor.jpg',
    // swLocation + 'img/avatars/wolverine.jpg',
    // swLocation + 'js/app.js',
    // swLocation + 'js/sw-utils.js',

    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    // swLocation + 'cssanimate.css',
    // swLocation + 'jslibs/jquery.js',

    'css/animate.css',
    'js/libs/jquery.js',
];

self.addEventListener( 'install', e => {

    const cacheStatic = caches.open( STATIC_CACHE ).then( cache => cache.addAll( APP_SHELL ) )
    
    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then( cache => cache.addAll( APP_SHELL_INMUTABLE ) )

    e.waitUntil( Promise.all( [ cacheStatic, cacheInmutable ] ) );
} )

self.addEventListener( 'activate', e => {

    const activacion = caches.keys().then( keys => {
        keys.forEach( key => {
            if ( key !== STATIC_CACHE && key.includes( 'static' ) ) {
                return caches.delete( key )
            }
        } )
    } )

    e.waitUntil( activacion );

} )

self.addEventListener( 'fetch', e => {

    const respuesta = caches.match( e.request ).then( res =>{

                            if ( res ) {
                                return res
                            } else {
                                return fetch( e.request ).then( newRes => {
                                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes )
                                } )        
                            }

                        } )

    e.respondWith( respuesta )
} )