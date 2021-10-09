const door = (() => {
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
        el = document.querySelector(".sampleDoorglb").object3D;
    };
    
    const interact = async () => {
        const { open, isAnimating } = getState();
        const el = getElement();
        if (!el) return;
        if (isAnimating) return;
        if (open) return await closeDoor();
        return await openDoor();
    };
    
    const closeDoor = async () => {
        const el = getElement();
        setState({isAnimating: true});
        const spec = {
            rotation: {
                y: 0
            },
            duration: 1000
        };
        await utils.animate(el, spec);
        setState({open: false, isAnimating: false});
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
    
    return {
        getElement,
        init,
        interact
    };
})();


door.init()
    .then(() => console.log('door successfully initialized'))
    .catch(console.log);