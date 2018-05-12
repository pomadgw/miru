// Taken from https://www.monterail.com/blog/2017/computed-properties-javascript-dependency-tracking

const Dependency = {
  target: null,
  // Stores the dependencies of computed properties
  subs: {},
  // Create a two-way dependency relation between computed properties
  // and other computed or observable values
  depend(deps, dep) {
    // Add the current context (Dep.target) to local deps
    // as depending on the current property
    // if not yet added
    if (!deps.includes(this.target)) {
      deps.push(this.target);
    }
    // Add the current property as a dependency of the computed value
    // if not yet added
    if (!Dependency.subs[this.target].includes(dep)) {
      Dependency.subs[this.target].push(dep);
    }
  },
  getValidDeps(deps, key) {
    // Filter only valid dependencies by removing dead dependencies
    // that were not used during last computation
    return deps.filter(dep => this.subs[dep].includes(key));
  },
  notifyDeps(deps, notify) {
    // notify all existing deps
    deps.forEach(notify);
  },
};

export default Dependency;
