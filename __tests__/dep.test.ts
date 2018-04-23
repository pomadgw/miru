import Dependency from "../src/dep";

describe("Miru", () => {
  describe("Dependency", () => {
    test("empty subscribers", () => {
      const dep = new Dependency();

      dep.createEmptySubscribes('test');
      expect(dep.subscribers['test'].length).toBe(0);
    });

    test("add depend subscribers", () => {
      Dependency.target = 'target';
      const dep = new Dependency();
      dep.createEmptySubscribes('target');

      dep.depend("test");
      expect(dep.deps.includes('target')).toBeTruthy();
      expect(dep.subscribers["target"].includes("test")).toBeTruthy();

      dep.depend("test");
      expect(dep.subscribers["target"].filter(e => e === 'test').length).toBe(1);
    });

    test("not adding depend subscribers if target is not defined", () => {
      Dependency.target = null;
      const dep = new Dependency();

      dep.depend("test");
      expect(dep.deps.includes("target")).toBeFalsy();
      expect(dep.subscribers["target"]).toBeUndefined();
    });
  });
});
