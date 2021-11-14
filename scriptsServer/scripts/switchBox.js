const switchBox = (() => {
    const el = {
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
    
    const state = {
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
    
    const getState = () => state;
    
    const setState = newState => {
        Object.entries(newState)
            .forEach(([key, value]) => {
                if (state.hasOwnProperty(key)) state[key] = value;
            });
    };
    
    const getElement = () => el;
    
    const init = async () => {
        await utils.sceneReady;
        cacheElements();
        setSwitchColorsFromState();
        addEventListeners();
    };
    
    const cacheElements = () => {
        const main = document.querySelector('.newSwitchglb').object3D;
        Array(9)
            .fill(null)
            .forEach((_, index) => {
                const number = index + 1;
                el[`switch${number}`] = main.children[0].children[0].children.find(x => x.name === `Switch${number}`);
            });
    };
    
    const setSwitchColorsFromState = () => {
        Object.entries(el)
            .forEach(([name, element]) => {
                const color = state.switches[name] ? colors.WHITE : colors.BLACK;
                element.material.color.setColorName(color);
            });
    };
    
    const setSolvedColors = () => {
        Object.entries(el)
            .forEach(([name, element]) => {
                const color = state.switches[name] ? colors.GREEN : colors.RED;
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
        Object.entries(el)
            .forEach(([name, element]) => {
                domEvents.addEventListener(element, 'click', async () => {
                    const state = getState();
                    if (state.solved) return;
                    // state.switches[name] = !state.switches[name];
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
        // const safeDoor = getElement().door;
        // const key = getElement().key;
        // domEvents.addEventListener(safeDoor, 'click', async () => {
        //     if (state.open) return;
        //     await openSafe();
        // }, false);
        // domEvents.addEventListener(key, 'click', async () => {
        //     if (!state.open) return;
        //     if (state.hasKey) return;
        //     if (state.keyAnimating) return;
        //     await getKey();
        //     audioManager.playKeySound();
        // }, false);
    };
    
    return {
        getElement,
        init,
        getState,
        setState
    };
})();

switchBox.init()
    .then(() => console.log('switch box successfully initialized'))
    .catch(console.log);


