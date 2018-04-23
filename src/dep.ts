/// <reference path="index.d.ts" />

// class Watcher {

// }

export default class Dependency implements Miru.Dependency {
  static target = null;

  subscribers;
  deps;

  constructor() {
    this.subscribers = {};
    this.deps = [];
  }

  static hasTarget() {
    return Dependency.target !== null;
  }

  createEmptySubscribes(key) {
    this.subscribers[key] = [];
  }

  depend(dep) {
    if (!this.deps.includes(Dependency.target)) {
      this.deps.push(Dependency.target);
    }

    if (
      this.subscribers[Dependency.target] &&
      !this.subscribers[Dependency.target].includes(dep)
    ) {
      this.subscribers[Dependency.target].push(dep);
    }
  }

  validDeps(key) {
    if (!this.subscribers[Dependency.target]) {
      return this.deps;
    }
    return this.deps.filter(dep => {
      return this.subscribers[key].includes(key);
    });
  }

  clearUpDeps(key) {
    this.deps = this.validDeps(key);
  }

  notify(value, func) {
    this.deps.forEach(e => func(e));
  }
}
