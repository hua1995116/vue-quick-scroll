import Vue from 'vue';
import { throttle } from '../utils/index.js';

const compareSrc = (src, newSrc) => {
  // 匹配图片是否是一致
  if (src.replace(/^http[s]*:/, '').match(newSrc.replace(/^http[s]*:/, ''))) {
    return true;
  }
  return false;
};

const options = {
  time: 500, // 动画时间&ms
  ratio: 620 / 312, // 设定图片的宽高比例
  width: '8.266667rem',
  height: '4.16rem',
};

const computed = (el, time, cb) => {
  const rect = el.getBoundingClientRect();
  if ((rect.top >= 0 && rect.top <= window.screen.height * 2)) {
    // 判断是否在可视区域里面
    if (el.src !== el.newSrc && !!el.newSrc) {
      const img = new window.Image();
      img.src = el.newSrc;
      img.onload = () => {
        if (img.width / img.height > options.ratio) {
          el.style.height = options.height;
        } else {
          el.style.width = options.width;
        }
        el.style.opacity = 0;
        setTimeout(() => {
          el.src = el.newSrc;
          el.style.opacity = '1';
        }, 250);
      };
      if (cb) {
        cb();
      }
    }
  }
};

Vue.directive('lazy', {
  inserted(el, binding) {
    const doc = window.document.querySelector('.message-scroll');
    if (!el) {
      return;
    }
    if (compareSrc(el.src, binding.value)) {
      return;
    }
    if (!el.src) {
      el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }
    el.style.transition = `opacity ${options.time}ms`;
    el.style.WebkitTransition = `opacity ${options.time}ms`;
    el.newSrc = binding.value;
    const computeBySpeed = () => {
      if (!el.newSrc || el.newSrc === el.src) {
        doc.removeEventListener('scroll', throttle(computeBySpeed));
        return;
      }
      computed(el, options.time);
    };
    function onError() {
      el.removeEventListener('error', onError);
      doc.removeEventListener('scroll', throttle(computeBySpeed));
    }
    el.onload = () => {
      el.removeEventListener('error', onError);
      computed(el, options.time);
      doc.addEventListener('scroll', throttle(computeBySpeed));
    };
    el.addEventListener('error', onError);
    setTimeout(() => {
      computed(el, options.time);
    });
  },
  update(el, binding) {
    if (compareSrc(el.src, binding.value)) {
      return;
    }
    el.style.opacity = 0;
    el.style.transition = `opacity ${options.time} ms`;
    el.style.WebkitTransition = `opacity ${options.time}ms`;
    el.newSrc = binding.value;
    setTimeout(() => {
      computed(el, options.time);
    }, 150);
  },
});
