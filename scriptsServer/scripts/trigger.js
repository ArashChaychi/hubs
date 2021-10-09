const trigger = (() => {
    let el;
    
    
    const addEventListeners = () => {
        document.addEventListener('sceneLoaded', () => {
            el = document.querySelector('.sampleTriggerglb').object3D;
            utils.domEvents.addEventListener(el, 'click', () => {
                door.interact();
            }, false)
        });
    };
    

    
    
    
    return {
        getElement: () => el,
        addEventListeners
    };
})();


trigger.addEventListeners();


