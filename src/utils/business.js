import { formatTime } from "./base";

export function getImgUrl(url, w, h) {
  if (!h) {
    h = w;
  }
  return `${url}?param=${w}y${h}`;
}

export function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function getArtistisText(artists) {
  return (artists || []).map(({ name }) => name).join("/");
}

export function formatSong(song) {
  const {
    id,
    name,
    img,
    artists,
    duration,
    albumId,
    albumName,
    mvId,
    ...rest
  } = song;

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: getSongUrl(id),
    artistsText: getArtistisText(artists),
    durationSecond: duration / 1000,
    durationText: formatTime(duration / 1000),
    albumId,
    mvId,
    ...rest
  };
}
