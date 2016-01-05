// This is the ES5 method of adding a method to your 'class'
Router.prototype.route = function () {
  Array.from(document.querySelectorAll('section'))
    .forEach(function (section) {
      section.style.display = 'none'
    })

  Object.keys(this.routes).forEach(function (key) {
    // console.log(this.routes[key])
    if (key === window.location.pathname) {
      var handler = this.routes[key]
      document.title = handler.titledocument.querySelector(handler.element)
        .style.display = 'block'
    }
  })
}

// always add .bind(this) on callback functions
function Router (routes) {
  this.routes = routes // In router method later this allows you to use this.routes to use the data

  window.addEventListener('popstate', function (event) {
    console.log(event)
    this.route()
  }).bind(this)

  document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      if (event.target.href.startsWith(window.location.origin)) {
        event.preventDefault()
        console.log(event)
        history.pushState(null, '', event.target.attributes.href.value)
        this.route()
      }
    }
  }.bind(this)) // this this is not the this in this.route

  this.route() // immediately invoke route
}

module.exports = Router
