const audioManager = (() => {
    
    const audioFiles = {
        background: 'http://localhost:3000/audio/background.wav',
        door: 'http://localhost:3000/audio/door.wav',
        mainDoor: 'http://localhost:3000/audio/mainDoor.m4a',
        key: 'http://localhost:3000/audio/key.wav',
        locked: 'http://localhost:3000/audio/locked.wav',
    };
    
    const playBackgroundMusic = () => {
        const background = new Audio(audioFiles.background);
        background.volume = .1;
        background.loop = true;
        background
            .play()
            .then('playing background music');
    
        document.removeEventListener('click', playBackgroundMusic, false)
    };
    
    const playSafeDoorSound = () => {
        const sound = new Audio(audioFiles.door);
        sound.volume = .5;
        sound.play().then(() => console.log('safe door sound played'));
    };
    
    const playMainDoorSound = () => {
        const sound = new Audio(audioFiles.mainDoor);
        sound.volume = .5;
        sound.play().then(() => console.log('main door sound played'));
    };
    
    const playKeySound = () => {
        const sound = new Audio(audioFiles.key);
        sound.volume = .5;
        sound.play().then(() => console.log('key sound played'));
    };
    
    const playLockedSound = () => {
        const sound = new Audio(audioFiles.locked);
        sound.volume = .5;
        sound.play().then(() => console.log('locked sound played'));
    };
    
    
    utils.sceneReady.then(() => {
        document.addEventListener('click', playBackgroundMusic, false)
    });
    
    return {
        playSafeDoorSound,
        playMainDoorSound,
        playKeySound,
        playLockedSound
    };
})();