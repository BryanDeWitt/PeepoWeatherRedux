export const setWallpaper = (time) => {
  const hours = time.split(':')[0]

  if (hours >= 6 && hours < 12) {
    return 'https://res.cloudinary.com/dprq4hntt/image/upload/c_scale,h_900,w_1600/jaygvv9ruxtftbzi10xm.jpg'
  } else if (hours >= 12 && hours < 18) {
    return 'https://res.cloudinary.com/dprq4hntt/image/upload/c_scale,h_900,w_1600/t2axah8ofgbcvyuwjacc.jpg'
  } else if ((hours >= 20 && hours <= 23) || (hours >= 0 && hours < 6)) {
    return 'https://res.cloudinary.com/dprq4hntt/image/upload/c_scale,h_900,w_1600/tcfxrrxq6poo9cms4zuh.jpg'
  } else if (hours >= 18 && hours < 20) {
    return 'https://res.cloudinary.com/dprq4hntt/image/upload/c_scale,h_900,w_1600/nsawgn7enebvvcdcnlpg.jpg'
  }
}
