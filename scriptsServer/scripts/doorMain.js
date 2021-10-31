const doorMain = (() => {
    let el;
    
    const state = {
        open: false,
        isAnimating: false
    };
    
    const getElement = () => el;
    
    const getState = () => state;
    
    const setState = newState => {
        Object.entries(newState)
            .forEach(([key, value]) => {
                if (state.hasOwnProperty(key)) state[key] = value;
            });
    };
    
    const init = async () => {
        await utils.sceneReady;
        el = document.querySelector(".doorMainglb").object3D;
        addEventListeners();
    };
    
    const openDoor = async () => {
        const el = getElement();
        setState({isAnimating: true});
        const spec = {
            rotation: {
                y: 1.57
            },
            duration: 1000
        };
        await utils.animate(el, spec)
        setState({open: true, isAnimating: false});
    };
    
    const addEventListeners = () => {
        const { domEvents } = utils.getUtils();
        const doorElement = getElement();
        domEvents.addEventListener(doorElement, 'click', async () => {
            if (state.open) return;
            if (state.isAnimating) return;
            if (!safe.getState().hasKey) return;
            await openDoor();
        }, false);

    };
    
    return {
        getElement,
        init,
    };
})();


doorMain.init()
    .then(() => console.log('door successfully initialized'))
    .catch(console.log);