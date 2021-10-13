const utils = (() => {
    
    let root,
        camera,
        renderer,
        domEvents;
    
    
    const sceneReady = new Promise(resolve => {
        document.addEventListener("sceneLoaded", () => {
            root = document.querySelector("#environment-root").object3D;
            camera = root.el.sceneEl.camera;
            renderer = root.el.sceneEl.renderer;
            domEvents = new THREEx.DomEvents(camera, renderer.domElement);
            resolve();
        });
    });
    
    const getUtils = () => {
        return {
            root,
            camera,
            renderer,
            domEvents
        };
    };
    
    const nextFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));
    
    const animate = async (element, spec) => {
        const startTime = window.performance.now();
        
        const { position, rotation, scale } = element;
        
        const initialState = {
            position: {
                x: position.x,
                y: position.y,
                z: position.z
            },
            rotation: {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z
            },
            scale: {
                x: scale.x,
                y: scale.y,
                z: scale.z
            }
            
        };
        
        const finalState = {};
        
        const duration = spec.duration || 1000;
        
        ["position", "rotation", "scale"]
            .forEach(prop => {
                if (!spec[prop]) return;
                finalState[prop] = {};
                if (prop === 'scale') {
                    return Object.entries(spec[prop])
                        .forEach(([name, value]) => {
                            finalState[prop][name] = initialState[prop][name] * value;
                        });
                }
                Object.entries(spec[prop])
                    .forEach(([name, value]) => {
                        finalState[prop][name] = initialState[prop][name] + value;
                    });
            });
        
        return await animateNextFrame(initialState, finalState, startTime, element, duration);
    };
    
    const animateNextFrame = async (initialState, finalState, startTime, element, duration) => {
        await nextFrame();
        
        const time = window.performance.now();
        const deltaTime = time - startTime;
        
        let progress = deltaTime / duration;
        
        if (progress > 1) progress = 1;
        
        const currentState = getCurrentState(initialState, finalState, progress);
        
        Object.entries(currentState)
            .forEach(([name, value]) => {
                Object.entries(value)
                    .forEach(([propName, propValue]) => {
                        element[name][propName] = propValue;
                    });
            });
        
        element.updateMatrix();
        
        if (progress !== 1) return await animateNextFrame(initialState, finalState, startTime, element, duration);
    };
    
    const getCurrentState = (initialState, finalState, progress) => {
        return Object.fromEntries(
            Object.entries(initialState)
                .map(([name, value]) => {
                    const newProps = Object.fromEntries(
                        Object.entries(value)
                            .map(([propName, propValue]) => {
                                if (!finalState[name]) return [propName, propValue];
                                if (finalState[name][propName] === undefined) return [propName, propValue];
                                return [
                                    propName,
                                    calculateCurrentValue(propValue, finalState[name][propName], progress)
                                ];
                            })
                    );
                    return [name, newProps];
                })
        );
    };
    
    const calculateCurrentValue = (initialValue, finalValue, progress) => {
        const delta = (finalValue - initialValue) * easeInOutQuad(progress);
        return initialValue + delta;
    };
    
    const easeInOutQuad = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    
    return {
        getUtils,
        sceneReady,
        animate
    };
})();