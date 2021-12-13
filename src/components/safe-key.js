AFRAME.registerComponent("safe-key", {
    
    init() {
        this.state = {
            hasKey: false,
            isAnimating: false
        };
    
        const getState = () => this.state;
    
        const addEventListeners = () => {
            const { domEvents } = utils.getUtils();
            domEvents.addEventListener(this.el.object3D, 'click', async () => {
                const state = getState();
                const srcNodeSolved = this.data.srcNode.el.components['safe-door'].state.open;
                if (state.hasKey) return;
                if (state.isAnimating) return;
                if (!srcNodeSolved) return;
                this.state.isAnimating = true;
                const moveForwardSpec = {
                    position: {
                        z: 1
                    },
                    duration: 1000
                };
                utils.animate(this.el.object3D, moveForwardSpec)
                    .then(async () => {
                        const spec = {
                            rotation: {
                                y: 6.28
                            },
                            duration: 1000
                        };
                        await utils.animate(this.el.object3D, spec)
                        await new Promise(resolve => window.setTimeout(resolve, 200));
                        this.el.object3D.visible = false;
                        this.state.isAnimating = false;
                        this.state.hasKey = true;
                    });
            }, false);
        };
    
    
    
        utils.sceneReady.then(() => {
            addEventListeners();
        });
    },
    
    update(prevData) {

    }
});

