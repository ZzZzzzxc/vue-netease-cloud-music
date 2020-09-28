import Vue from "vue";
import Component from "./notification.vue";
const NotificationConstructor = Vue.extend(Component);

let instance;
let instances = [];
let seed = 1;

const MARGING = 16; // 间隔

const Notification = options => {
  const id = "z_notification_" + seed++;
  const position = options.position || "top-right";
  options.onClose = function() {
    Notification.close(id);
  };
  instance = new NotificationConstructor({
    data: options
  });
  instance.id = id;
  instance.visible = true;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.dom = instance.$el;
  let verticalOffset = options.offset || 0;
  instances
    .filter(item => item.position === position)
    .forEach(item => {
      verticalOffset += item.$el.offsetHeight + MARGING;
    });
  verticalOffset += MARGING;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};

Notification.close = id => {
  let index = -1;
  const len = instances.length;
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance) return;

  instances.splice(index, 1);

  if (len <= 1) return;
  const position = instance.position;
  const removedHeight = instance.dom.offsetHeight;
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] =
        parseInt(instances[i].dom.style[instance.verticalProperty], 10) -
        removedHeight -
        MARGING +
        "px";
    }
  }
};

Notification.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Notification;
