import $ from 'jquery';
import './style.scss';

let secs = 0;
setInterval(() => {
    $('#main').html(`You've been on this page for ${secs += 1} seconds.`);
}, 1000);
