$(window).on('hashchange', () => {
  const header = document.querySelector('body > header')
  const element = document.querySelector(location.hash)
  document.body.scrollTo({ top: element.offsetTop - header.clientHeight - 24, behavior: 'smooth' })
})

$(document).ready(() => {
  const key = `scrolltop-${location.pathname}`
  const scrollTop = sessionStorage.getItem(key)
  if (location.hash) {
    $(window).trigger('hashchange')
  } else if (scrollTop) {
    document.body.scrollBy({
      top: JSON.parse(scrollTop),
    })
  }
})

$(document).on('click', '.heading button.toggler', () => {
  $('.categories')
    .prop('hidden', false)
    .one('click', function () {
      if ($(this).closest('nav').length) return
      $(this).prop('hidden', true)
    })
})

$(document).on('click', '.markdown-body a[href]', (event) => {
  if (event.target.hostname !== 'open.weixin.qq.com') return
  event.preventDefault()
  event.stopPropagation()
  const qrcode = document.createElement('img')
  qrcode.src = event.target.href
  qrcode.width = 430
  qrcode.height = 430
  qrcode.style.width = '100%'
  qrcode.style.height = '100%'
  swal(event.target.textContent, { content: qrcode })
})

$(document).on('click', 'main.homepage .container.tags button', (event) => {
  const $btn = $(event.target)
  const $links = $('.links a')
  if ($btn.hasClass('active')) {
    $btn.removeClass('active')
    $links.prop('hidden', false)
  } else {
    $btn.addClass('active').siblings().removeClass('active')
    $links.each(function () {
      const tags = $(this).data('tags').split(/,/g)
      $(this).prop('hidden', !tags.includes($btn.data('tag')))
    })
  }
})

$(document).on('click', '.translations button', (event) => {
  $(event.target).parent().toggleClass('active')
})

$(document.body).on('scroll', (event) => {
  const key = `scrolltop-${location.pathname}`
  sessionStorage.setItem(key, JSON.stringify(event.target.scrollTop))
})
