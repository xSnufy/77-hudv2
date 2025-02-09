ESX = exports['es_extended']:getSharedObject()

local directions = { [0] = 'N', [1] = 'NW', [2] = 'W', [3] = 'SW', [4] = 'S', [5] = 'SE', [6] = 'E', [7] = 'NE', [8] = 'N' }
local show = true
local hudVisible = true
local speedMultiplier = 2.6
local speedUnit = "MPH"

local currentSpeed = 0
local targetSpeed = 0
local currentRPM = 0
local targetRPM = 0
local lungCapacity = 100
local lastLungCapacity = 100
local lastStatus = { health = 0, armour = 0, hunger = 0, thirst = 0, stamina = 0 }
local stamina = 100
local lastStamina = 100
local wasPauseMenuActive = false


local gears = { [1] = "G1", [2] = "G2", [3] = "G3", [4] = "G4", [5] = "G5", [6] = "G6" }
local currentGear = 1

local function interpolate(current, target, step)
    return math.abs(target - current) < step and target or current + ((target - current) * step)
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        local isPauseMenuActive = IsPauseMenuActive()

        if isPauseMenuActive and not wasPauseMenuActive then
            wasPauseMenuActive = true
            hudVisible = false
            SendNUIMessage({
                action = "showhud",
                visible = false
            })
        elseif not isPauseMenuActive and wasPauseMenuActive then
            wasPauseMenuActive = false
            hudVisible = true
            SendNUIMessage({
                action = "showhud",
                visible = true
            })
        end
    end
end)

local function updateStatus()
    local playerPed = PlayerPedId()
    if not playerPed or not hudVisible then return end

    local hunger, thirst
    TriggerEvent('esx_status:getStatus', 'hunger', function(status)
        hunger = status.getPercent()
    end)
    TriggerEvent('esx_status:getStatus', 'thirst', function(status)
        thirst = status.getPercent()
    end)

    local health = GetEntityHealth(playerPed) - 100
    local armor = GetPedArmour(playerPed)

    if IsPedSprinting(playerPed) then
        stamina = math.max(0, stamina - 1)
        if stamina ~= lastStamina then
            SendNUIMessage({
                action = "updateStaminaVisibility",
                visible = true
            })
        end
    else
        stamina = math.min(100, stamina + 1)
        if stamina == 100 and lastStamina ~= 100 then
            SendNUIMessage({
                action = "updateStaminaVisibility",
                visible = false
            })
        end
    end

    if health ~= lastStatus.health or armor ~= lastStatus.armour or hunger ~= lastStatus.hunger or thirst ~= lastStatus.thirst or stamina ~= lastStamina then
        lastStatus = { health = health, armour = armor, hunger = hunger, thirst = thirst, stamina = stamina }
        lastStamina = stamina

        SendNUIMessage({
            action = "updateStatus",
            arr = {
                health = health,
                armour = armor,
                hunger = hunger,
                thirst = thirst,
                stamina = stamina
            }
        })
    end
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        updateStatus()
    end
end)

local function updateVoiceStatus()
    if not hudVisible then return end
    local player = PlayerId()
    local talking = NetworkIsPlayerTalking(player)

    SendNUIMessage({
        action = "Voicey",
        arr = {
            talking = talking,
            volume = LocalPlayer.state.proximity.mode,
            state = talking
        }
    })

    SendNUIMessage({
        action = "updateVoiceActive",
        active = talking
    })
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(150)
        updateVoiceStatus()
    end
end)


local function updateGear(veh, rawSpeed, rpmPercent)
    local speedInMPH = rawSpeed * 2.23694
    if speedInMPH < 10 then
        currentGear = 1
    elseif speedInMPH < 20 then
        currentGear = 2
    elseif speedInMPH < 30 then
        currentGear = 3
    elseif speedInMPH < 40 then
        currentGear = 4
    elseif speedInMPH < 50 then
        currentGear = 5
    else
        currentGear = 6
    end
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)

        local playerPed = PlayerPedId()
        if IsPedInAnyVehicle(playerPed) and show then
            local veh = GetVehiclePedIsUsing(playerPed)
            local coords = GetEntityCoords(veh)
            local rawSpeed = GetEntitySpeed(veh) * speedMultiplier
            local rpmPercent = GetVehicleCurrentRpm(veh) * 100
            local fuelLevel = GetVehicleFuelLevel(veh)
            local street = GetStreetNameFromHashKey(GetStreetNameAtCoord(coords.x, coords.y, coords.z))
            local heading = directions[math.floor((GetEntityHeading(playerPed) + 22.5) / 45.0)]


            updateGear(veh, rawSpeed, rpmPercent)


            SendNUIMessage({
                process = 'xsnufy_on_carhud',
                unit = speedUnit,
                speedLevel = math.floor(rawSpeed),
                rpmLevel = rpmPercent,
                streetName = street,
                heading = heading,
                fuelLevel = math.floor(fuelLevel),
                currentGear = gears[currentGear]  
            })

            DisplayRadar(true)
        else
            SendNUIMessage({ process = 'xsnufy_off_carhud' })
            DisplayRadar(false)
        end

        Citizen.Wait(50)
    end
end)

function GetFuel(vehicle)
    if not DoesEntityExist(vehicle) then return 0 end
    return GetVehicleFuelLevel(vehicle)
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)

        local playerPed = PlayerPedId()
        if IsPedSwimmingUnderWater(playerPed) then
            lungCapacity = math.max(0, lungCapacity - 1)

            if lungCapacity ~= lastLungCapacity then
                lastLungCapacity = lungCapacity
                SendNUIMessage({
                    action = "updateLung",
                    lung = lungCapacity,
                    show = true
                })
            end
        else
            if lungCapacity < 100 then
                lungCapacity = math.min(100, lungCapacity + 1)

                if lungCapacity ~= lastLungCapacity then
                    lastLungCapacity = lungCapacity
                    SendNUIMessage({
                        action = "updateLung",
                        lung = lungCapacity,
                        show = true
                    })
                end
            end

            if lungCapacity == 100 and lastLungCapacity ~= 100 then
                SendNUIMessage({
                    action = "updateLung",
                    lung = lungCapacity,
                    show = false
                })
                lastLungCapacity = 100
            end
        end
    end
end)
