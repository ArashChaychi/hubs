AFRAME.registerComponent("my-test-element", {
    
    init() {
        console.log("my test element");
        console.log(this)
        console.log(this.el)
    },
    
    update(prevData) {

    }
});

