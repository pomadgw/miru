class Dependency {
  constructor() {
    this.subscribers = {};
    this.deps = new Set();
  }

  static hasTarget() {
    return Dependency.target !== null;
  }

  createEmptySubscribes(key) {
    this.subscribers[key] = [];
  }

  depend(dep) {
    this.deps.add(Dependency.target);

    if (this.subscribers[Dependency.target] && !this.subscribers[Dependency.target].includes(dep)) {
      this.subscribers[Dependency.target].push(dep);
    }
  }

  validDeps(key) {
    if (!this.subscribers[Dependency.target]) {
      return this.deps;
    }
    return this.deps.filter(() => this.subscribers[key].includes(key));
  }

  clearUpDeps(key) {
    this.deps = this.validDeps(key);
  }

  notify(func) {
    this.deps.forEach(e => func(e));
  }
}

Dependency.target = null;

export default Dependency;
