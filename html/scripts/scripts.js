let hudVisible = true; 

window.addEventListener("message", function (event) {
    const toDegrees = (value) => (value / 100) * 360; 

    switch (event.data.action) {
        case "Voicey":
            if (!hudVisible) return;
            $('.fa-microphone-lines').css('color', event.data.arr.talking ? '#808080' : '#ffcc99');

            const volumeHeights = {
                Whisper: 25,
                Normal: 70,
                Shouting: 100
            };
            const voiceLevel = event.data.arr.volume || 'Normal';
            const voicePercent = volumeHeights[voiceLevel] || 0;
            document.querySelector('#voice').style.setProperty('--rotation', `${toDegrees(voicePercent)}deg`);
            break;

        case "updateVoiceActive":
            if (!hudVisible) return;
            const voiceIndicatorContainer = document.querySelector(".xsnufy_hud_item_5");
            if (voiceIndicatorContainer) {
                if (event.data.active) {
                    voiceIndicatorContainer.classList.add("active");
                } else {
                    voiceIndicatorContainer.classList.remove("active");
                }
            }
            break;

        case "updateStatus":
            if (!hudVisible) return;

            const health = event.data.arr.health || 0;
            const thirst = event.data.arr.thirst || 0;
            const hunger = event.data.arr.hunger || 0;
            const stamina = event.data.arr.stamina || 0;
            const armour = event.data.arr.armour || 0;


document.querySelector('#health').style.setProperty('--rotation', `${toDegrees(health)}deg`);
document.querySelector('#thirst').style.setProperty('--rotation', `${toDegrees(thirst)}deg`);
document.querySelector('#hunger').style.setProperty('--rotation', `${toDegrees(hunger)}deg`);
document.querySelector('#stamina').style.setProperty('--rotation', `${toDegrees(stamina)}deg`);

const staminaElement = document.querySelector(".xsnufy_hud_item_7");

if (staminaElement) {
    // Sprawdzamy, czy stamina ma jakąkolwiek wartość
    if (stamina < 100 && stamina > 0) {
        // Dodajemy klasę "visible" dla płynnej animacji pojawiania się
        staminaElement.classList.add("visible");

        // Zastosowanie animacji do zmiany clipPath
        const hexFillElement = staminaElement.querySelector(".hex-fill");
        if (hexFillElement) {
            hexFillElement.style.clipPath = `polygon(
                50% 0%, 
                ${(50 + stamina / 2)}% ${stamina}%, 
                ${(50 - stamina / 2)}% ${stamina}%,
                0% 50%, 
                50% 100%, 
                100% 50%
            )`;
        }
    } else {
        // Jeśli stamina wynosi 0, usuwamy klasę "visible" aby schować pasek
        staminaElement.classList.remove("visible");
    }
}



const armourElement = document.querySelector('#armour');
if (armour > 0) {
    if (armourElement) {
        armourElement.style.setProperty('--rotation', `${toDegrees(armour)}deg`);
        armourElement.parentElement.style.display = 'flex';
    }
} else {
    if (armourElement) {
        armourElement.parentElement.style.display = 'none';
    }
}

            break;

        case "updateLung":
            if (!hudVisible) return;
            const lungLevel = event.data.lung || 0;
            const lungElement = document.querySelector("#lung");
            const lungHudItem = document.querySelector(".xsnufy_hud_item_6");

            if (lungElement && lungHudItem) {
                if (lungLevel < 100) {
                    lungHudItem.style.display = "flex";
                    lungElement.style.setProperty("--rotation", `${toDegrees(lungLevel)}deg`);
                } else {
                    lungHudItem.style.display = "none";
                }
            }
            break;

        case "showhud":
            hudVisible = event.data.visible;
            const hudContainer = document.querySelector(".xsnufy_hud_all_container");
            if (hudVisible) {
                hudContainer.style.display = "flex";
            } else {
                hudContainer.style.display = "none";
            }
            break;

        case 'xsnufy_hud_in':
            if (hudVisible) $('.xsnufy_hud_all_container').fadeIn(300);
            break;

        case 'xsnufy_hud_out':
            if (hudVisible) $('.xsnufy_hud_all_container').fadeOut(300);
            break;
    }
});

window.addEventListener("load", function () {
    const lungHudItem = document.querySelector(".xsnufy_hud_item_6");
    if (lungHudItem) {
        lungHudItem.style.display = 'none';
    }


    const armourElement = document.querySelector('#armour');
    if (armourElement) {
        const armourValue = armourElement.dataset.value || 0;
        if (armourValue > 0) {
            armourElement.parentElement.style.display = 'flex';
        } else {
            armourElement.parentElement.style.display = 'none';
        }
    }
});




window.addEventListener("message", function (event) {
    const item = event.data;
    switch (item.process) {
        case 'xsnufy_on_carhud':
            if (hudVisible) {
                $('.xsnufy_carhud_container').css({ 'display': `flex` });
                window.addEventListener("message", function (event) {
                    const toDegrees = (value) => (value / 100) * 360; 
                
                    switch (event.data.action) {
                        case "Voicey":
                            if (!hudVisible) return;
                            $('.fa-microphone-lines').css('color', event.data.arr.talking ? '#808080' : '#ffcc99');
                
                            const volumeHeights = {
                                Whisper: 25,
                                Normal: 70,
                                Shouting: 100
                            };
                            const voiceLevel = event.data.arr.volume || 'Normal';
                            const voicePercent = volumeHeights[voiceLevel] || 0;
                            document.querySelector('#voice').style.setProperty('--rotation', `${toDegrees(voicePercent)}deg`);
                            break;
                
                        case "updateVoiceActive":
                            if (!hudVisible) return;
                            const voiceIndicatorContainer = document.querySelector(".xsnufy_hud_item_5");
                            if (voiceIndicatorContainer) {
                                if (event.data.active) {
                                    voiceIndicatorContainer.classList.add("active");
                                } else {
                                    voiceIndicatorContainer.classList.remove("active");
                                }
                            }
                            break;
                
                        case "updateStatus":
                            if (!hudVisible) return;
                
                            const health = event.data.arr.health || 0;
                            const thirst = event.data.arr.thirst || 0;
                            const hunger = event.data.arr.hunger || 0;
                            const stamina = event.data.arr.stamina || 0;
                            const armour = event.data.arr.armour || 0;
                
                            document.querySelector('#health').style.setProperty('--rotation', `${toDegrees(health)}deg`);
                            document.querySelector('#thirst').style.setProperty('--rotation', `${toDegrees(thirst)}deg`);
                            document.querySelector('#hunger').style.setProperty('--rotation', `${toDegrees(hunger)}deg`);
                            document.querySelector('#stamina').style.setProperty('--rotation', `${toDegrees(stamina)}deg`);
                
                            const staminaElement = document.querySelector(".xsnufy_hud_item_7");
                
                            if (staminaElement) {
                                if (stamina < 100 && stamina > 0) {
                                    staminaElement.classList.add("visible");
                
                                    const hexFillElement = staminaElement.querySelector(".hex-fill");
                                    if (hexFillElement) {
                                        hexFillElement.style.clipPath = `polygon(
                                            50% 0%, 
                                            ${(50 + stamina / 2)}% ${stamina}%, 
                                            ${(50 - stamina / 2)}% ${stamina}%,
                                            0% 50%, 
                                            50% 100%, 
                                            100% 50%
                                        )`;
                                    }
                                } else {
                                    staminaElement.classList.remove("visible");
                                }
                            }
                
                            const armourElement = document.querySelector('#armour');
                            if (armour > 0) {
                                if (armourElement) {
                                    armourElement.style.setProperty('--rotation', `${toDegrees(armour)}deg`);
                                    armourElement.parentElement.style.display = 'flex';
                                }
                            } else {
                                if (armourElement) {
                                    armourElement.parentElement.style.display = 'none';
                                }
                            }
                            break;
                
                        case "updateLung":
                            if (!hudVisible) return;
                            const lungLevel = event.data.lung || 0;
                            const lungElement = document.querySelector("#lung");
                            const lungHudItem = document.querySelector(".xsnufy_hud_item_6");
                
                            if (lungElement && lungHudItem) {
                                if (lungLevel < 100) {
                                    lungHudItem.style.display = "flex";
                                    lungElement.style.setProperty("--rotation", `${toDegrees(lungLevel)}deg`);
                                } else {
                                    lungHudItem.style.display = "none";
                                }
                            }
                            break;
                
                        case "showhud":
                            hudVisible = event.data.visible;
                            const hudContainer = document.querySelector(".xsnufy_hud_all_container");
                            if (hudVisible) {
                                hudContainer.style.display = "flex";
                            } else {
                                hudContainer.style.display = "none";
                            }
                            break;
                
                        case 'xsnufy_hud_in':
                            if (hudVisible) $('.xsnufy_hud_all_container').fadeIn(300);
                            break;
                
                        case 'xsnufy_hud_out':
                            if (hudVisible) $('.xsnufy_hud_all_container').fadeOut(300);
                            break;
                    }
                });
                
                window.addEventListener("message", function (event) {
                    const item = event.data;
                    switch (item.process) {
                        case 'xsnufy_on_carhud':
                            if (hudVisible) {
                                $('.xsnufy_carhud_container').css({ 'display': `flex` });
                
                                const speed = Math.round(item.speedLevel).toString().padStart(3, '0');
                                $("#speed").html('');
                
                                if (speed === '000') {
                                    const digits = speed.split('');
                                    digits.forEach(digit => {
                                        const digitElement = $(`<span>${digit}</span>`);
                                        digitElement.addClass('speed-zero'); 
                                        $("#speed").append(digitElement);
                                    });
                                } else {
                                    const digits = speed.split('');
                                    let zeroPassed = false;
                
                                    digits.forEach((digit, index) => {
                                        const digitElement = $(`<span>${digit}</span>`);
                                        
                                        if (digit === '0' && !zeroPassed) {
                                            digitElement.addClass('speed-zero'); 
                                        } else {
                                            digitElement.addClass('speed-full'); 
                                            zeroPassed = true; 
                                        }
                
                                        $("#speed").append(digitElement);
                                    });
                                }
                
                                $("#heading").html(item.heading);
                                $("#street").html(item.streetName);
                
                                const fuelLevel = item.fuelLevel || 0; 
                                const fuelElement = document.querySelector('#fuel'); 
                                const fuelText = document.querySelector('#fuel-text'); 
                
                                if (fuelElement) {
                                    fuelElement.style.background = `conic-gradient(
                                        #ffcc00 0deg,
                                        #ffcc00 ${fuelLevel}%, 
                                        rgba(0, 0, 0, 0.1) ${fuelLevel}%
                                    )`;
                
                                    if (fuelLevel > 0) {
                                        fuelElement.style.opacity = 1;
                                    } else {
                                        fuelElement.style.opacity = 0; 
                                    }
                                }
                
                                if (fuelText) {
                                    fuelText.textContent = `${Math.round(fuelLevel)}%`;
                                }
                
                                // Wyświetlanie biegu (np. G1, G2, G3...)
                                const gearElement = document.querySelector("#gear");  // Dodaj element w HTML, np. <div id="gear"></div>
                                if (gearElement) {
                                    gearElement.textContent = item.currentGear || 'G1';  // Wyswietl aktualny bieg
                                }
                
                            }
                            break;
                
                        case 'xsnufy_off_carhud':
                            $('.xsnufy_carhud_container').css({ 'display': `none` });
                            break;
                    }
                });
                
                const speed = Math.round(item.speedLevel).toString().padStart(3, '0');
                $("#speed").html('');

                if (speed === '000') {
                    const digits = speed.split('');
                    digits.forEach(digit => {
                        const digitElement = $(`<span>${digit}</span>`);
                        digitElement.addClass('speed-zero'); 
                        $("#speed").append(digitElement);
                    });
                } else {
                    const digits = speed.split('');
                    let zeroPassed = false;

                    digits.forEach((digit, index) => {
                        const digitElement = $(`<span>${digit}</span>`);
                        
                        if (digit === '0' && !zeroPassed) {
                            digitElement.addClass('speed-zero'); 
                        } else {
                            digitElement.addClass('speed-full'); 
                            zeroPassed = true; 
                        }

                        $("#speed").append(digitElement);
                    });
                }

                $("#heading").html(item.heading);
                $("#street").html(item.streetName);

const fuelLevel = item.fuelLevel || 0; 
const fuelElement = document.querySelector('#fuel'); 
const fuelText = document.querySelector('#fuel-text'); 

if (fuelElement) {
    fuelElement.style.background = `conic-gradient(
        #ffcc00 0deg,
        #ffcc00 ${fuelLevel}%, 
        rgba(0, 0, 0, 0.1) ${fuelLevel}%
    )`;

    if (fuelLevel > 0) {
        fuelElement.style.opacity = 1;
    } else {
        fuelElement.style.opacity = 0; 
    }
}

if (fuelText) {
    fuelText.textContent = `${Math.round(fuelLevel)}%`;
}

            }
            break;

        case 'xsnufy_off_carhud':
            $('.xsnufy_carhud_container').css({ 'display': `none` });
            break;
    }
});


