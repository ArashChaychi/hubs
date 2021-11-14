const safe = (() => {
    const el = {
        safe: null,
        door: null,
        key: null
    };
    
    const state = {
        open: false,
        hasKey: false,
        doorAnimating: false,
        keyAnimating: false,
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
        addEventListeners();
    };
    
    const cacheElements = () => {
        el.safe = document.querySelector('.safeglb').object3D;
        el.door = document.querySelector('.safeDoorglb').object3D;
        el.key = document.querySelector('.keyglb').object3D;
    };
    
    const openSafe = async () => {
        const door = getElement().door;
        setState({doorAnimating: true});
        const spec = {
            rotation: {
                y: -1.57
            },
            duration: 1000
        };
        audioManager.playSafeDoorSound();
        await utils.animate(door, spec)
        setState({open: true, doorAnimating: false});
    };
    
    const getKey = async () => {
        const key = getElement().key;
        setState({keyAnimating: true});
        const moveForwardSpec = {
            position: {
                z: 1
            },
            duration: 1000
        };
        await utils.animate(key, moveForwardSpec)
        const spec = {
            rotation: {
                y: 6.28
            },
            duration: 1000
        };
        await utils.animate(key, spec)
        await new Promise(resolve => window.setTimeout(resolve, 200));
        key.visible = false;
        setState({hasKey: true, keyAnimating: false});
    };
    
    const addEventListeners = () => {
        const { domEvents } = utils.getUtils();
        const safeDoor = getElement().door;
        const key = getElement().key;
        domEvents.addEventListener(safeDoor, 'click', async () => {
            if (state.open) return;
            if (!switchBox.getState().solved) return;
            await openSafe();
        }, false);
        domEvents.addEventListener(key, 'click', async () => {
            if (!state.open) return;
            if (state.hasKey) return;
            if (state.keyAnimating) return;
            await getKey();
            audioManager.playKeySound();
        }, false);
    };
    
    return {
        getElement,
        init,
        getState,
        setState
    };
})();

safe.init()
    .then(() => console.log('safe successfully initialized'))
    .catch(console.log);


