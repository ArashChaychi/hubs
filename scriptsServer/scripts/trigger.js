const trigger = (() => {
    let el;
    
    const getElement = () => el;
    
    const init = async () => {
        await utils.sceneReady;
        addEventListeners();
    };
    
    const addEventListeners = () => {
        const { domEvents } = utils.getUtils();
        el = document.querySelector('.sampleTriggerglb').object3D;
        domEvents.addEventListener(el, 'click', async () => {
            await door.interact();
        }, false);
    };
    
    return {
        getElement,
        init
    };
})();

trigger.init()
    .then(() => console.log('trigger successfully initialized'))
    .catch(console.log);


