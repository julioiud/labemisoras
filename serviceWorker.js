const iudStereo = "iud-stereo"// nombre del caché
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/img/BOLETIN.jpg"
]

/**
 * RESULTA QUE EL SERVICE WORKER TIENE UN CICLO DE VIDA
 * ENTONCES INSTALL ES UNO DE LOS CICLOS
 */

//self el serviceWorker en si mismo

// SE EJECUTA CUANDO EL SERVICE WORKER SE INSTALA
self.addEventListener("install", installEvent => {//
    /**
 * Cuando se activa el evento de instalación, 
 * ejecutamos la devolución de llamada que nos
 *  da acceso al objeto del evento.
El almacenamiento en caché de algo en el navegador 
puede tardar un tiempo en finalizar porque es asíncrono.
Entonces, para manejarlo, necesitamos usar waitUntil() 
que, como puede suponer, espera a que finalice la acción.
 */
  installEvent.waitUntil(
    /**
     * Una vez que la API de caché esté lista, podemos
     *  ejecutar el método open() y crear nuestro caché 
     * pasando su nombre como argumento a caches.open(staticDevCoffee).
     */
    caches.open(iudStereo).then(cache => {
    /**
     * Luego devuelve una promesa, que nos ayuda a almacenar
     *  nuestros activos en el caché con cache.addAll(assets).
     */
        console.log('open cache')
      cache.addAll(assets)
    })
  )
})

/**
 * Aquí, usamos el evento fetch para recuperar nuestros 
 * datos. La devolución de llamada nos da acceso a 
 * fetchEvent. Luego adjuntamos respondWith() para 
 * evitar la respuesta predeterminada del navegador. 
 * En su lugar, devuelve una promesa porque la acción 
 * de obtención puede tardar en finalizar.
 */
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
    /**
     * Y una vez lista la caché, aplicamos 
     * caches.match(fetchEvent.request). Verificará si 
     * algo en el caché coincide con fetchEvent.request. 
     * Por cierto, fetchEvent.request es solo nuestra 
     * variedad de recursos.
     */
      caches.match(fetchEvent.request).then(res => {
        /**
         * Luego, devuelve una promesa. Y finalmente, 
         * podemos devolver el resultado si existe o 
         * la búsqueda inicial si no.
         */
        console.log(res)
        return res || fetch(fetchEvent.request)
      })
    )
})
/**
 * Ahora, el service worker puede almacenar en caché
 *  y recuperar nuestros activos, lo que aumenta 
 * bastante el tiempo de carga de nuestras imágenes.
Y lo más importante, hace que nuestra aplicación 
esté disponible en modo sin conexión.
Pero un SERVICE WORKER por sí solo no 
puede hacer el trabajo. Necesitamos registrarlo en 
nuestro proyecto.
 */

/**
 * Aquí, comenzamos comprobando si serviceWorker 
 * es compatible con el navegador actual 
 * (ya que aún no es compatible con todos los navegadores).
 */



    /**
 * Luego, escuchamos el evento de carga de la página 
 * para registrar nuestro trabajador de servicio 
 * pasando el nombre de nuestro archivo serviceWorker.js 
 * a navigator.serviceWorker.register() 
 * como parámetro para registrar nuestro trabajador.

Con esta actualización, hemos transformado nuestra 
aplicación web habitual en una PWA.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
      navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}