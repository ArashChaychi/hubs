AFRAME.registerComponent("safe-door", {
    
    init() {
        this.state = {
            open: false,
            isAnimating: false
        };
        
        const getState = () => this.state;
        
        const addEventListeners = () => {
            const { domEvents } = utils.getUtils();
            domEvents.addEventListener(this.el.object3D, 'click', async () => {
                const state = getState();
                const srcNodeSolved = this.data.srcNode.el.components['switch-box'].state.solved;
                if (state.open) return;
                if (state.isAnimating) return;
                if (!srcNodeSolved) return;
                this.state.isAnimating = true;
                const spec = {
                    rotation: {
                        y: -1.57
                    },
                    duration: 1000
                };
                utils.animate(this.el.object3D, spec)
                    .then(() => {
                        this.state.isAnimating = false;
                        this.state.open = true;
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

