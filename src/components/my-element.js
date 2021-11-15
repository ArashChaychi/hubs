AFRAME.registerComponent("my-element", {
    schema: {},
    
    init() {
        console.log("my element");
    },
    
    update(prevData) {

    },
    //
    // remove: function() {
    //     this.el.removeObject3D("my-element");
    // }
});
