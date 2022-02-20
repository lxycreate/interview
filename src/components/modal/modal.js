import Vue from "vue"
import Popup from "./popup";
import Dialog from "./dialog"

let store, router;
function modal(cfg) {
    const config = Object.assign({}, cfg)
    const { content } = config

    delete config.content;
    const popCmpt = [config.popType, content.dialogConfig?.popType].includes('custom_popup') ? Popup : Dialog;
    let Component = Object.assign({}, popCmpt, { store, router });
    Object.assign(Component.components, {
        innerMain: content
    })
    Component = Vue.extend(Component)
    const { props, ...propsData } = config
    const instance = new Component({
        propsData: {
            innerProps: props,
            compName: "innerMain",
            ...propsData,
            ...(content.dialogConfig || {})
        }
    })
    document.body.appendChild(instance.$mount().$el)
    return instance;
}

modal.setProvider = function (data) {
    if (data.store) {
        store = data.store
    }
    if (data.router) {
        router = data.router
    }
}

export default modal;