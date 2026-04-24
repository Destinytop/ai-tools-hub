export interface LuauTemplate {
  id: string
  name: string
  category: string
  description: string
  template: string
  variables: string[]
  example: string
}

export const luauCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'gameplay', name: 'Gameplay Mechanics' },
  { id: 'ui', name: 'UI & Interface' },
  { id: 'tools', name: 'Tools & Weapons' },
  { id: 'npc', name: 'NPCs & AI' },
  { id: 'data', name: 'Data & Saving' },
  { id: 'effects', name: 'Visual Effects' },
]

export const luauTemplates: LuauTemplate[] = [
  // Gameplay Mechanics
  {
    id: 'click-detector',
    name: 'Click Detector System',
    category: 'gameplay',
    description: 'Create interactive objects that respond to player clicks',
    template: `-- Click Detector System for {object_name}
local {object_name} = script.Parent
local clickDetector = Instance.new("ClickDetector")
clickDetector.Parent = {object_name}

clickDetector.MouseClick:Connect(function(player)
    print(player.Name .. " clicked " .. {object_name}.Name)
    
    -- Add your custom logic here
    {custom_logic}
end)`,
    variables: ['object_name', 'custom_logic'],
    example: `local Door = script.Parent
local clickDetector = Instance.new("ClickDetector")
clickDetector.Parent = Door

clickDetector.MouseClick:Connect(function(player)
    print(player.Name .. " opened the door!")
    Door.Transparency = 0.5
    Door.CanCollide = false
end)`
  },
  {
    id: 'leaderstats',
    name: 'Leaderstats (Score System)',
    category: 'gameplay',
    description: 'Create a leaderboard to track player scores, cash, or other stats',
    template: `-- Leaderstats System
local function setupPlayer(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local {stat_name} = Instance.new("{stat_type}")
    {stat_name}.Name = "{stat_display_name}"
    {stat_name}.Value = {initial_value}
    {stat_name}.Parent = leaderstats
end

game.Players.PlayerAdded:Connect(setupPlayer)`,
    variables: ['stat_name', 'stat_type', 'stat_display_name', 'initial_value'],
    example: `local function setupPlayer(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local Cash = Instance.new("IntValue")
    Cash.Name = "Cash"
    Cash.Value = 100
    Cash.Parent = leaderstats
end

game.Players.PlayerAdded:Connect(setupPlayer)`
  },
  {
    id: 'teleport',
    name: 'Teleport System',
    category: 'gameplay',
    description: 'Teleport players between locations or to other games',
    template: `-- Teleport System
local TeleportService = game:GetService("TeleportService")
local {teleport_type} = script.Parent

local function teleportPlayer(player)
    local character = player.Character
    if character then
        local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
        if humanoidRootPart then
            humanoidRootPart.CFrame = {destination}
            print("Teleported " .. player.Name)
        end
    end
end

{trigger_event}:Connect(function({params})
    teleportPlayer({player_param})
end)`,
    variables: ['teleport_type', 'destination', 'trigger_event', 'params', 'player_param'],
    example: `local teleportPad = script.Parent

local function teleportPlayer(player)
    local character = player.Character
    if character then
        local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
        if humanoidRootPart then
            humanoidRootPart.CFrame = CFrame.new(100, 50, 100)
            print("Teleported " .. player.Name)
        end
    end
end

teleportPad.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if player then
        teleportPlayer(player)
    end
end)`
  },
  {
    id: 'obby-checkpoint',
    name: 'Obby Checkpoint System',
    category: 'gameplay',
    description: 'Save player progress in obstacle courses',
    template: `-- Checkpoint System
local Checkpoints = workspace:WaitForChild("Checkpoints")
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local checkpointData = Instance.new("ObjectValue")
    checkpointData.Name = "CurrentCheckpoint"
    checkpointData.Parent = player
    
    player.CharacterAdded:Connect(function(character)
        wait()
        local checkpoint = checkpointData.Value
        if checkpoint then
            local humanoidRootPart = character:WaitForChild("HumanoidRootPart")
            humanoidRootPart.CFrame = checkpoint.CFrame + Vector3.new(0, 3, 0)
        end
    end)
end

local function onCheckpointTouched(checkpoint)
    checkpoint.Touched:Connect(function(hit)
        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if player then
            player.CurrentCheckpoint.Value = checkpoint
            checkpoint.Color = Color3.fromRGB({color_r}, {color_g}, {color_b})
        end
    end)
end

Players.PlayerAdded:Connect(onPlayerAdded)

for _, checkpoint in pairs(Checkpoints:GetChildren()) do
    onCheckpointTouched(checkpoint)
end`,
    variables: ['color_r', 'color_g', 'color_b'],
    example: `checkpoint.Color = Color3.fromRGB(0, 255, 0) -- Green when activated`
  },

  // UI & Interface
  {
    id: 'gui-button',
    name: 'GUI Button Handler',
    category: 'ui',
    description: 'Create interactive GUI buttons with click handlers',
    template: `-- GUI Button Handler
local button = script.Parent
local {action_name}Event = Instance.new("BindableEvent")

button.MouseButton1Click:Connect(function()
    print("Button clicked!")
    {action_name}Event:Fire()
    
    -- Visual feedback
    button.BackgroundColor3 = Color3.fromRGB({click_color_r}, {click_color_g}, {click_color_b})
    wait(0.1)
    button.BackgroundColor3 = Color3.fromRGB({normal_color_r}, {normal_color_g}, {normal_color_b})
end)

-- Connect your custom function
{action_name}Event.Event:Connect(function()
    {custom_action}
end)`,
    variables: ['action_name', 'click_color_r', 'click_color_g', 'click_color_b', 'normal_color_r', 'normal_color_g', 'normal_color_b', 'custom_action'],
    example: `button.MouseButton1Click:Connect(function()
    print("Shop button clicked!")
    -- Open shop GUI
    game.StarterGui.ShopGui.Enabled = true
end)`
  },
  {
    id: 'screen-gui',
    name: 'Screen GUI Creator',
    category: 'ui',
    description: 'Create a ScreenGui with common UI elements',
    template: `-- Screen GUI Setup
local Players = game:GetService("Players")

local function createGUI(player)
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "{gui_name}"
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    local frame = Instance.new("Frame")
    frame.Name = "MainFrame"
    frame.Size = UDim2.new({frame_size_x}, {frame_size_y}, {frame_size_width}, {frame_size_height})
    frame.Position = UDim2.new({frame_pos_x}, {frame_pos_y}, {frame_pos_width}, {frame_pos_height})
    frame.BackgroundColor3 = Color3.fromRGB({bg_r}, {bg_g}, {bg_b})
    frame.Parent = screenGui
    
    local title = Instance.new("TextLabel")
    title.Name = "Title"
    title.Size = UDim2.new(1, 0, 0, 50)
    title.Text = "{title_text}"
    title.TextSize = {title_size}
    title.TextColor3 = Color3.fromRGB({title_r}, {title_g}, {title_b})
    title.BackgroundTransparency = 1
    title.Parent = frame
    
    return screenGui
end

Players.PlayerAdded:Connect(createGUI)`,
    variables: ['gui_name', 'frame_size_x', 'frame_size_y', 'frame_size_width', 'frame_size_height', 'frame_pos_x', 'frame_pos_y', 'frame_pos_width', 'frame_pos_height', 'bg_r', 'bg_g', 'bg_b', 'title_text', 'title_size', 'title_r', 'title_g', 'title_b'],
    example: `frame.Size = UDim2.new(0, 300, 0, 200) -- 300x200 pixels
frame.Position = UDim2.new(0.5, -150, 0.5, -100) -- Center of screen`
  },

  // Tools & Weapons
  {
    id: 'tool-template',
    name: 'Tool Template',
    category: 'tools',
    description: 'Basic tool structure with equip and activate events',
    template: `-- Tool Script: {tool_name}
local tool = script.Parent
local {effect_name} = tool:FindFirstChild("{effect_name}")

tool.Equipped:Connect(function(mouse)
    print("{tool_name} equipped")
    {equip_code}
end)

tool.Unequipped:Connect(function()
    print("{tool_name} unequipped")
    {unequip_code}
end)

tool.Activated:Connect(function()
    print("{tool_name} activated!")
    
    local character = tool.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    
    if humanoid then
        {activation_code}
    end
end)`,
    variables: ['tool_name', 'effect_name', 'equip_code', 'unequip_code', 'activation_code'],
    example: `tool.Activated:Connect(function()
    local character = tool.Parent
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    
    if humanoidRootPart then
        local explosion = Instance.new("Explosion")
        explosion.Position = humanoidRootPart.Position + humanoidRootPart.CFrame.LookVector * 10
        explosion.Parent = workspace
    end
end)`
  },
  {
    id: 'sword-tool',
    name: 'Sword Combat Tool',
    category: 'tools',
    description: 'Create a melee weapon with damage dealing',
    template: `-- Sword Tool Script
local tool = script.Parent
local handle = tool:WaitForChild("Handle")
local swingAnimation = tool:WaitForChild("{animation_name}")

local canDamage = false
local damage = {damage_amount}

local function onTouch(hit)
    if not canDamage then return end
    
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    local player = game.Players:GetPlayerFromCharacter(tool.Parent)
    local hitPlayer = game.Players:GetPlayerFromCharacter(hit.Parent)
    
    if humanoid and hit.Parent ~= tool.Parent then
        if {friendly_fire} or hitPlayer ~= player then
            humanoid:TakeDamage(damage)
            canDamage = false
        end
    end
end

tool.Activated:Connect(function()
    local character = tool.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    
    if humanoid then
        local animator = humanoid:FindFirstChildOfClass("Animator")
        if animator then
            local track = animator:LoadAnimation(swingAnimation)
            track:Play()
        end
        
        canDamage = true
        handle.Touched:Connect(onTouch)
        
        wait(0.5)
        canDamage = false
    end
end)`,
    variables: ['animation_name', 'damage_amount', 'friendly_fire'],
    example: `local damage = 25
local canDamage = false

handle.Touched:Connect(function(hit)
    if not canDamage then return end
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid:TakeDamage(25)
        canDamage = false
    end
end)`
  },

  // NPCs & AI
  {
    id: 'simple-npc',
    name: 'Simple NPC Walker',
    category: 'npc',
    description: 'Basic NPC that walks between waypoints',
    template: `-- Simple NPC Walker
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
local waypoints = workspace:WaitForChild("{waypoint_folder}"):GetChildren()

local currentWaypoint = 1
local waitTime = {wait_time}

local function moveToNextWaypoint()
    if #waypoints == 0 then return end
    
    local target = waypoints[currentWaypoint]
    humanoid:MoveTo(target.Position)
    
    humanoid.MoveToFinished:Wait()
    wait(waitTime)
    
    currentWaypoint = currentWaypoint % #waypoints + 1
    moveToNextWaypoint()
end

moveToNextWaypoint()`,
    variables: ['waypoint_folder', 'wait_time'],
    example: `local waypoints = workspace.Waypoints:GetChildren()
for i = 1, #waypoints do
    humanoid:MoveTo(waypoints[i].Position)
    humanoid.MoveToFinished:Wait()
    wait(2)
end`
  },
  {
    id: 'dialogue-npc',
    name: 'Dialogue NPC',
    category: 'npc',
    description: 'NPC that shows dialogue when player clicks on it',
    template: `-- Dialogue NPC
local npc = script.Parent
local clickDetector = npc:FindFirstChildOfClass("ClickDetector") or Instance.new("ClickDetector")
clickDetector.Parent = npc

local dialogues = {
    "{dialogue_1}",
    "{dialogue_2}",
    "{dialogue_3}",
}

local currentDialogue = 1

local function showDialogue(player, text)
    -- You can customize this to use a GUI
    print(npc.Name .. " to " .. player.Name .. ": " .. text)
    
    -- Example: Create a BillboardGui
    local billboard = Instance.new("BillboardGui")
    billboard.Size = UDim2.new(0, 200, 0, 50)
    billboard.StudsOffset = Vector3.new(0, 3, 0)
    billboard.Parent = npc
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.Text = text
    label.TextWrapped = true
    label.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    label.TextColor3 = Color3.fromRGB(255, 255, 255)
    label.Parent = billboard
    
    game:GetService("Debris"):AddItem(billboard, {display_time})
end

clickDetector.MouseClick:Connect(function(player)
    showDialogue(player, dialogues[currentDialogue])
    currentDialogue = currentDialogue % #dialogues + 1
end)`,
    variables: ['dialogue_1', 'dialogue_2', 'dialogue_3', 'display_time'],
    example: `local dialogues = {
    "Hello there!",
    "Welcome to my shop!",
    "Would you like to buy something?",
}`
  },

  // Data & Saving
  {
    id: 'datastore',
    name: 'DataStore Save System',
    category: 'data',
    description: 'Save and load player data using Roblox DataStores',
    template: `-- DataStore Save System
local DataStoreService = game:GetService("DataStoreService")
local {datastore_name} = DataStoreService:GetDataStore("{datastore_name}")
local Players = game:GetService("Players")

local function saveData(player)
    local success, err = pcall(function()
        {datastore_name}:SetAsync(player.UserId, {
            {stat_name} = player.leaderstats.{stat_name}.Value,
            -- Add more stats here
        })
    end)
    
    if success then
        print("Saved data for " .. player.Name)
    else
        warn("Failed to save data: " .. tostring(err))
    end
end

local function loadData(player)
    local success, data = pcall(function()
        return {datastore_name}:GetAsync(player.UserId)
    end)
    
    if success and data then
        player.leaderstats.{stat_name}.Value = data.{stat_name} or {default_value}
        print("Loaded data for " .. player.Name)
    else
        print("No data found for " .. player.Name)
    end
end

Players.PlayerAdded:Connect(function(player)
    -- Wait for leaderstats to be created
    repeat wait() until player:FindFirstChild("leaderstats")
    loadData(player)
end)

Players.PlayerRemoving:Connect(saveData)

game:BindToClose(function()
    for _, player in pairs(Players:GetPlayers()) do
        saveData(player)
    end
end)`,
    variables: ['datastore_name', 'stat_name', 'default_value'],
    example: `local PlayerData = DataStoreService:GetDataStore("PlayerData")

local function saveData(player)
    PlayerData:SetAsync(player.UserId, {
        Cash = player.leaderstats.Cash.Value,
        Level = player.leaderstats.Level.Value,
    })
end`
  },

  // Visual Effects
  {
    id: 'particle-effect',
    name: 'Particle Effect System',
    category: 'effects',
    description: 'Create particle effects for various game events',
    template: `-- Particle Effect System
local {emitter_location} = script.Parent

local function createParticleEffect()
    local particleEmitter = Instance.new("ParticleEmitter")
    particleEmitter.Texture = "{texture_id}"
    particleEmitter.Rate = {emission_rate}
    particleEmitter.Lifetime = NumberRange.new({lifetime_min}, {lifetime_max})
    particleEmitter.Speed = NumberRange.new({speed_min}, {speed_max})
    particleEmitter.SpreadAngle = Vector2.new({spread_x}, {spread_y})
    particleEmitter.Color = ColorSequence.new(Color3.fromRGB({color_r}, {color_g}, {color_b}))
    particleEmitter.Size = NumberSequence.new({size_min}, {size_max})
    particleEmitter.Transparency = NumberSequence.new({transparency_min}, {transparency_max})
    particleEmitter.Parent = {emitter_location}
    
    return particleEmitter
end

-- Usage
local effect = createParticleEffect()

-- Stop after duration
wait({duration})
effect.Enabled = false

-- Clean up
wait({lifetime_max})
effect:Destroy()`,
    variables: ['emitter_location', 'texture_id', 'emission_rate', 'lifetime_min', 'lifetime_max', 'speed_min', 'speed_max', 'spread_x', 'spread_y', 'color_r', 'color_g', 'color_b', 'size_min', 'size_max', 'transparency_min', 'transparency_max', 'duration'],
    example: `particleEmitter.Texture = "rbxassetid://258128463"
particleEmitter.Rate = 50
particleEmitter.Lifetime = NumberRange.new(1, 2)
particleEmitter.Color = ColorSequence.new(Color3.fromRGB(255, 100, 0)) -- Orange fire`
  },
  {
    id: 'tween-animation',
    name: 'Tween Animation',
    category: 'effects',
    description: 'Smooth animations using TweenService',
    template: `-- Tween Animation
local TweenService = game:GetService("TweenService")
local {target_object} = script.Parent

local tweenInfo = TweenInfo.new(
    {duration}, -- Duration
    Enum.EasingStyle.{easing_style}, -- Easing style
    Enum.EasingDirection.{easing_direction}, -- Easing direction
    {repeat_count}, -- Repeat count (-1 for infinite)
    {reverses}, -- Reverses
    {delay_time} -- Delay time
)

local goal = {
    {property} = {target_value}
}

local tween = TweenService:Create({target_object}, tweenInfo, goal)

-- Play the tween
tween:Play()

-- Optional: Listen for completion
tween.Completed:Connect(function(playbackState)
    print("Tween completed!")
    {completion_code}
end)`,
    variables: ['target_object', 'duration', 'easing_style', 'easing_direction', 'repeat_count', 'reverses', 'delay_time', 'property', 'target_value', 'completion_code'],
    example: `local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local goal = {Position = Vector3.new(0, 10, 0), Transparency = 0.5}
local tween = TweenService:Create(part, tweenInfo, goal)
tween:Play()`
  }
]

export function generateLuauCode(
  template: LuauTemplate,
  values: Record<string, string>
): string {
  let code = template.template
  
  for (const [key, value] of Object.entries(values)) {
    const placeholder = `{${key}}`
    code = code.replace(new RegExp(placeholder, 'g'), value)
  }
  
  return code
}

export const luauTips = [
  {
    id: '1',
    title: 'Use Local Variables',
    content: 'Always use "local" for variables to improve performance and avoid global namespace pollution.'
  },
  {
    id: '2',
    title: 'Wait for Children',
    content: 'Use :WaitForChild() when accessing parts that might not be loaded yet.'
  },
  {
    id: '3',
    title: 'Debounce Actions',
    content: 'Add debounce (cooldown) to actions to prevent spam and bugs.'
  },
  {
    id: '4',
    title: 'Use pcall for DataStores',
    content: 'Wrap DataStore calls in pcall() to handle errors gracefully.'
  },
  {
    id: '5',
    title: 'Clean Up Connections',
    content: 'Disconnect event connections when they are no longer needed to prevent memory leaks.'
  }
]
