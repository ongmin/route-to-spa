function Router (routes) {
  this.routes = routes

  window.addEventListener('popstate', function (event) {
    this.route()
  }.bind(this))

  document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      if (event.target.href.startsWith(window.location.origin)) {
        event.preventDefault()
        history.pushState(null, '', event.target.attributes.href.value)
        this.route()
      }
    }
  }.bind(this))

  this.route()
}

Router.prototype.route = function () {
  Array.from(document.querySelectorAll('section'))
    .forEach(function (section) {
      section.style.display = 'none'
    })

  var route = this.routes.find(function (route) {
    const pattern = route.route
    return pattern.test(window.location.pathname)
  })

  if (route) {
    document.title = route.title
    document.querySelector(route.element).style.display = 'block'
  }
}

module.exports = Router
