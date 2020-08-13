export function getImgUrl(url, w, h) {
  if (!h) {
    h = w;
  }
  return `${url}?param=${w}y${h}`;
}

export function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
