const timer = (cb, ms ) => (...args) => setTimeout(function doSomething() {
      cb(...args);
      setTimeout(doSomething, ms);
    }, ms)

export default timer;
