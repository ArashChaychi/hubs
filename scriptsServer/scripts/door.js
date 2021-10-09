const door = (() => {
    let el;
    
    const state = {
        open: false
    };
    
    
    const addEventListeners = () => {
        document.addEventListener('sceneLoaded', () => {
            el = document.querySelector('.sampleDoorglb').object3D;
        });
    };
    
    
    const interact = () => {
        const position = el.position;
        const newPosition = {
            ...position,
            y: state.open ? 2 : 6
        };
        el.position.set(newPosition.x, newPosition.y, newPosition.z);
        el.updateMatrix();
        state.open = !state.open;
    };
    
    
    
    
    
    return {
        getElement: () => el,
        addEventListeners,
        interact
    };
})();


door.addEventListeners();