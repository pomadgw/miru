import Miru from '.';

document.addEventListener("DOMContentLoaded", () => {
  const app = new Miru({
    data: {
      halo: 20
    },
    render() {
      return <div>${this.halo}</div>;
    }
  });

  app.$mount("#app");
});
