export const setWallpaper = (time) => {
  const hours = time.split(':')[0]

  const images = {
    morning: 'https://res.cloudinary.com/dprq4hntt/image/upload/ar_16:9,c_scale,w_1200/peepoWeather/znepn5wvoz6ict46ymim.jpg',
    day: 'https://res.cloudinary.com/dprq4hntt/image/upload/ar_16:9,c_scale,w_1200/peepoWeather/n7tcsr9lzuggkzq9lxdy.jpg',
    afternoon: 'https://res.cloudinary.com/dprq4hntt/image/upload/ar_16:9,c_scale,w_1200/peepoWeather/losyspoapnmgzvtqzzgt.jpg',
    nigth: 'https://res.cloudinary.com/dprq4hntt/image/upload/ar_16:9,c_scale,w_1200/peepoWeather/grpl56nihzwykg1f3yaf.jpg'

  }

  if (hours >= 6 && hours < 12) {
    return images.morning
  } else if (hours >= 12 && hours < 18) {
    return images.day
  } else if ((hours >= 20 && hours <= 23) || (hours >= 0 && hours < 6)) {
    return images.nigth
  } else if (hours >= 18 && hours < 20) {
    return images.afternoon
  }
}
