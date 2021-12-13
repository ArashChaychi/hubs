AFRAME.registerComponent("switch-box", {
    
    init() {
   
        this.subElements = {
            switch1: null,
            switch2: null,
            switch3: null,
            switch4: null,
            switch5: null,
            switch6: null,
            switch7: null,
            switch8: null,
            switch9: null,
        };
    
        const colors = {
            BLACK: 'black',
            WHITE: 'white',
            GREEN: 'green',
            RED: 'red',
        };
    
        this.state = {
            switches: {
                switch1: false,
                switch2: false,
                switch3: false,
                switch4: true,
                switch5: true,
                switch6: true,
                switch7: false,
                switch8: true,
                switch9: false,
            },
            solution: {
                switch1: true,
                switch2: false,
                switch3: false,
                switch4: false,
                switch5: true,
                switch6: true,
                switch7: false,
                switch8: true,
                switch9: true,
            },
            solved: false
        };
    
        const getState = () => this.state;
    
        const setState = newState => {
            Object.entries(newState)
                .forEach(([key, value]) => {
                    if (this.state.hasOwnProperty(key)) this.state[key] = value;
                });
        };
        
        const cacheElements = () => {
            const main = this.el.object3D.children[0];
            Array(9)
                .fill(null)
                .forEach((_, index) => {
                    const number = index + 1;
                    this.subElements[`switch${number}`] = main.children.find(x => x.name === `Switch${number}`);
                });
        };
    
        const setSwitchColorsFromState = () => {
            Object.entries(this.subElements)
                .forEach(([name, element]) => {
                    const color = this.state.switches[name] ? colors.WHITE : colors.BLACK;
                    element.material.color.setColorName(color);
                });
        };
    
        const setSolvedColors = () => {
            Object.entries(this.subElements)
                .forEach(([name, element]) => {
                    const color = this.state.switches[name] ? colors.GREEN : colors.RED;
                    element.material.color.setColorName(color);
                });
        };
    
        const checkIfSolved = () => {
            const state = getState();
            return Object.entries(state.switches)
                .every(([name, prop]) => prop === state.solution[name]);
        };
    
        const addEventListeners = () => {
            const { domEvents } = utils.getUtils();
            Object.entries(this.subElements)
                .forEach(([name, element]) => {
                    domEvents.addEventListener(element, 'click', async () => {
                        const state = getState();
                        if (state.solved) return;
                        const switches = {
                            ...state.switches,
                            [name]: !state.switches[name]
                        };
                        setState({switches});
                        setSwitchColorsFromState();
                        if (checkIfSolved()) {
                            setState({solved: true});
                            setSolvedColors();
                        }
                    }, false);
                });
        };
        
        utils.sceneReady.then(() => {
            cacheElements();
            setSwitchColorsFromState();
            addEventListeners();
        });
        
    },
    
    update(prevData) {

    }
});

