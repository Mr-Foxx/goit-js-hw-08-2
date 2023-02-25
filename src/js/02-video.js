// Імпотруємо файл
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const KEY = 'videoplayer-current-time';

// Функція отримує значення,
// зберігає запис в локальне сховище    (по інстукції з @vimeo/player)
const onPlay = function (data) {
  console.log(data);
  localStorage.setItem(KEY, JSON.stringify(data.seconds));
};

// Вішаю слухача подій  timeupdate з колбеком onPlay (по інстукції з @vimeo/player)
player.on('timeupdate', throttle(onPlay, 1000));
// отримую значення зі сховища
const timeItem = localStorage.getItem(KEY);
// Фактичний час зупинки
const realTime = timeItem === null ? 0 : JSON.parse(timeItem);

// функція з @vimeo/player для відновлення відтворення відео
player.setCurrentTime(realTime);
