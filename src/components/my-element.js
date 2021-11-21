AFRAME.registerComponent("my-element", {
    init() {
        console.log("my element");
        this.state = {
            count: 1
        };
        const root = document.querySelector("#environment-root").object3D;
        const camera = root.el.sceneEl.camera;
        const renderer = root.el.sceneEl.renderer;
        const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
        domEvents.addEventListener(this.el.object3D, 'click', async () => {
            this.state.count++;
            console.log(this.state)
        }, false);
    },
    
    update(prevData) {

    }
});
