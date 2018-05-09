import 'setimmediate';

const callbacks = [];
let tickIsRunning = false;

function runCallbacks() {
  tickIsRunning = false;
  callbacks.slice(0).forEach((callback) => {
    callback();
  });

  callbacks.length = 0;
}

export default function nextTick(func, context = null) {
  callbacks.push(() => {
    func.call(context);
  });

  if (!tickIsRunning) {
    tickIsRunning = true;
    setImmediate(runCallbacks);
  }
}
