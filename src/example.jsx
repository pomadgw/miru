import Miru from ".";

document.addEventListener("DOMContentLoaded", () => {
  const app = new Miru({
    data: { halo: 20 },
    methods: {
      update(ev) {
        const target = event.target;
        console.log(this);
        this.halo = target.value;
      }
    },
    render() {
      return <div>
          ${this.halo}
          <input onInput={this.update} value={this.halo} />
        </div>;
    }
  });

  app.$mount("#app");
});
