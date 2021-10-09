const utils = (() => {
    
    const root = document.querySelector('#environment-root').object3D;
    
    const camera = root.el.sceneEl.camera;
    const renderer = root.el.sceneEl.renderer;
    
    
    const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
    
    return {
        camera,
        renderer,
        domEvents
    };
})();