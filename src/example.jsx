import Miru from '.'
import { isThisHour } from 'date-fns'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Miru({
    data: { halo: 20, r: 1 },
    computed: {
      area () {
        console.log('Replaced')
        return (this.r * this.r) * Math.PI
      }
    },
    methods: {
      update (ev) {
        const target = event.target
        // console.log(this);
        this.halo = target.value
      },
      updateRadius (ev) {
        const target = event.target
        // console.log(this);
        this.r = target.value
      }
    },
    render () {
      return (
        <div>
          <div>Value of "halo": {this.halo}</div>
          <input onInput={this.update} value={this.halo} />
          <div>
            <div>
              Area of the circle with r = {this.r} is {this.area}
            </div>
            <input onInput={this.updateRadius} value={this.r} />
          </div>
        </div>
      )
    }
  })

  app.$mount('#app')
})
