const React = require('react')

const Swiper = React.forwardRef(function Swiper(props, ref) {
  return React.createElement('div', { ref, 'data-testid': 'swiper' }, props.children)
})

const SwiperSlide = React.forwardRef(function SwiperSlide(props, ref) {
  return React.createElement('div', { ref, 'data-testid': 'swiper-slide' }, props.children)
})

module.exports = { Swiper, SwiperSlide }
