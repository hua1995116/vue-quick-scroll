function handleZero(num) {
    if (parseInt(num, 10) < 10) {
      return `0${num}`;
    }
    return num;
  }
  
  export const hanldeTime = time => {
    const date = new Date(parseInt(time, 10));
    const year = date.getFullYear();
    const month = handleZero(date.getMonth() + 1);
    const day = handleZero(date.getDate());
    const hours = handleZero(date.getHours());
    const minutes = handleZero(date.getMinutes());
    const nowyear = new Date().getFullYear();
    if (year === nowyear) {
      return `${month}-${day} ${hours}:${minutes}`;
    }
    return `${year} ${month}-${day} ${hours}:${minutes}`;
  };
  
  export const throttle = (action, delay) => {
    let timeout = null;
    let lastRun = 0;
    return () => {
      if (timeout) {
        return;
      }
      const elapsed = Date.now() - lastRun;
      const context = this;
      const args = arguments;
      const runCallback = () => {
        lastRun = Date.now();
        timeout = false;
        action.apply(context, args);
      };
      if (elapsed >= delay) {
        runCallback();
      } else {
        timeout = setTimeout(runCallback, delay);
      }
    };
  };
  
  export const getQuery = () => {
    const url = window.location.search; // 获取url中"?"符后的字串
    const theRequest = {};
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1);
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  };
  