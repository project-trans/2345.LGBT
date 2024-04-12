import $ from 'cash-dom'
import swal from 'sweetalert'

$(window).on('hashchange', () => {
  const header = document.querySelector('body > header')
  const element = document.querySelector<HTMLElement>(location.hash)
  if (!header) return
  if (!element) return
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

$(document).on('click', '.markdown-body a[href]', (event: Event) => {
  const target = event.target as HTMLAnchorElement
  if (target.hostname !== 'open.weixin.qq.com') return
  event.preventDefault()
  event.stopPropagation()
  swal(target.textContent ?? '', {
    content: {
      element: 'img',
      attributes: {
        src: target.href,
        width: 430,
        height: 430,
        style: 'width: 100%; height: 100%;',
      },
    },
  })
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

const translateButton = $('.translations button')

translateButton.on('click', (event) => {
  translateButton.parent().toggleClass('active')
  event.stopPropagation()
})

$(document).on('click', (event) => {
  if (!$(event.target).is('.translations button')) {
    translateButton.parent().removeClass('active')
  }
})

$(document.body).on('scroll', (event) => {
  const key = `scrolltop-${location.pathname}`
  sessionStorage.setItem(key, JSON.stringify(event.target.scrollTop))
})
