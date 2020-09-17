import { formatTime, isEmail } from "./base";
import {
  getUserInfo,
  getUserPlaylist,
  loginByEmail,
  loginByPhone,
  logout
} from "@/api";
import store from "@/store";

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

export async function initUserInfo(uid) {
  try {
    const { profile, level } = await getUserInfo({ uid });
    const { playlist } = await getUserPlaylist({ uid, limit: 1000 });
    const {
      nickname,
      signature,
      avatarUrl,
      backgroundUrl,
      followeds,
      follows,
      eventCount
    } = profile;
    store.commit("user/setUserId", uid);
    store.commit("user/setNickname", nickname);
    store.commit("user/setSignature", signature);
    store.commit("user/setAvatarUrl", avatarUrl);
    store.commit("user/setBackgroundUrl", backgroundUrl);
    store.commit("user/setLevel", level);
    store.commit("user/setFollows", follows);
    store.commit("user/setFolloweds", followeds);
    store.commit("user/setEventCount", eventCount);
    store.commit("user/setUserPlaylist", playlist);
  } catch (e) {
    console.log("获取用户信息失败");
  }
}

export async function userLogin(account, password) {
  const request = {
    async email() {
      // 邮箱登录
      try {
        const { cookie, profile, token } = await loginByEmail({
          email: account,
          password
        });
        await afterLogin(profile.userId, token, cookie);
      } catch (e) {
        console.log("登录失败");
      }
    },
    async phone() {
      // 手机号登录
      try {
        const { cookie, profile, token } = await loginByPhone({
          phone: account,
          password
        });
        await afterLogin(profile.userId, token, cookie);
      } catch (e) {
        console.log("登录失败");
      }
    }
  };
  request[isEmail(account) ? "email" : "phone"]();
}

async function afterLogin(userId, token, cookie) {
  document.cookie = cookie;
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
  await initUserInfo(userId);
}

export async function userLogout() {
  try {
    await logout();
    store.commit("user/setUserId", "");
    store.commit("user/setNickname", "");
    store.commit("user/setSignature", "");
    store.commit("user/setAvatarUrl", "");
    store.commit("user/setBackgroundUrl", "");
    store.commit("user/setLevel", "");
    store.commit("user/setFollows", "");
    store.commit("user/setFolloweds", "");
    store.commit("user/setEventCount", "");
    store.commit("user/setUserPlaylist", "");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  } catch (e) {
    console.log("退出登录失败");
  }
}
