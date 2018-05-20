import Miru from '../src';

describe('Event', () => {
  // test('can send simple one', () => {
  //   const vm = new Miru({
  //     data() {
  //       return {
  //         number: 0,
  //       };
  //     },
  //     methods: {
  //       update() {
  //         this.number += 1;
  //       }
  //     }
  //   });

  //   vm.$on('click', function click() {
  //     this.update();
  //   });

  //   vm.$emit('click');

  //   expect(vm.number).not.toBe(0);
  //   expect(vm.number).toBe(1);
  // })
  test('event from jsx works', () => {
    const vm = new Miru({
      data() {
        return {
          number: 0,
        };
      },
      methods: {
        update() {
          this.number += 1;
        }
      },
      render(h) {
        return (
          <div>
            <div id="value">{this.number}</div>
            <button id="update" on-click={this.update}>+</button>
          </div>);
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    document.getElementById('update').click();

    expect(vm.number).not.toBe(0);
    expect(vm.number).toBe(1);
  })

  test('send event from component and received in its parent', () => {
    let theValue;
    const vm = new Miru({
      components: {
        event: {
          methods: {
            send() {
              this.$emit('send', 'received');
            }
          },
          render(h) {
            return (
              <div>
                <button id="send" on-click={this.send}>Send</button>
              </div>
            );
          }
        }
      },
      methods: {
        receive(value) {
          theValue = value;
        }
      },
      render(h) {
        return (<div>
          <event on-send={this.receive} />
          </div>);
      }
    })

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    document.getElementById('send').click();
    expect(theValue).toBe('received');
  })
});
