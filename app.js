/**
 * 枭雄汉化 - Owlbear Rodeo 中文汉化插件
 * Chinese Localization Plugin for Owlbear Rodeo
 */

// ============ 词典数据 ============

const DICTIONARY = [
  // ---- 战斗 Combat ----
  { term: 'Action', translation: '动作', category: 'combat' },
  { term: 'Bonus Action', translation: '附赠动作', category: 'combat' },
  { term: 'Reaction', translation: '反应', category: 'combat' },
  { term: 'Free Action', translation: '自由动作', category: 'combat' },
  { term: 'Attack Roll', translation: '攻击检定', category: 'combat' },
  { term: 'Damage Roll', translation: '伤害掷骰', category: 'combat' },
  { term: 'Saving Throw', translation: '豁免检定', category: 'combat' },
  { term: 'Armor Class (AC)', translation: '护甲等级 (AC)', category: 'combat' },
  { term: 'Hit Points (HP)', translation: '生命值 (HP)', category: 'combat' },
  { term: 'Temporary HP', translation: '临时生命值', category: 'combat' },
  { term: 'Initiative', translation: '先攻', category: 'combat' },
  { term: 'Critical Hit', translation: '重击', category: 'combat' },
  { term: 'Critical Fail', translation: '大失败', category: 'combat' },
  { term: 'Melee Attack', translation: '近战攻击', category: 'combat' },
  { term: 'Ranged Attack', translation: '远程攻击', category: 'combat' },
  { term: 'Opportunity Attack', translation: '借机攻击', category: 'combat' },
  { term: 'Grapple', translation: '擒抱', category: 'combat' },
  { term: 'Shove', translation: '推撞', category: 'combat' },
  { term: 'Cover', translation: '掩蔽', category: 'combat' },
  { term: 'Half Cover', translation: '半掩蔽', category: 'combat' },
  { term: 'Three-Quarters Cover', translation: '四分之三掩蔽', category: 'combat' },
  { term: 'Total Cover', translation: '全掩蔽', category: 'combat' },
  { term: 'Concentration', translation: '专注', category: 'combat' },
  { term: 'Hit Dice', translation: '生命骰', category: 'combat' },
  { term: 'Death Saving Throw', translation: '死亡豁免', category: 'combat' },
  { term: 'Short Rest', translation: '短休', category: 'combat' },
  { term: 'Long Rest', translation: '长休', category: 'combat' },
  { term: 'Passive Perception', translation: '被动察觉', category: 'combat' },
  { term: 'Speed', translation: '速度', category: 'combat' },
  { term: 'Movement', translation: '移动', category: 'combat' },
  { term: 'Dash', translation: '疾走', category: 'combat' },
  { term: 'Disengage', translation: '撤离', category: 'combat' },
  { term: 'Dodge', translation: '闪避', category: 'combat' },
  { term: 'Help', translation: '协助', category: 'combat' },
  { term: 'Hide', translation: '躲藏', category: 'combat' },
  { term: 'Ready', translation: '准备', category: 'combat' },
  { term: 'Search', translation: '搜索', category: 'combat' },
  { term: 'Use an Object', translation: '使用物品', category: 'combat' },
  { term: 'Flanking', translation: '夹击', category: 'combat' },
  { term: 'Difficult Terrain', translation: '困难地形', category: 'combat' },

  // ---- 属性 Abilities ----
  { term: 'Strength', translation: '力量', category: 'skill' },
  { term: 'Dexterity', translation: '敏捷', category: 'skill' },
  { term: 'Constitution', translation: '体质', category: 'skill' },
  { term: 'Intelligence', translation: '智力', category: 'skill' },
  { term: 'Wisdom', translation: '感知', category: 'skill' },
  { term: 'Charisma', translation: '魅力', category: 'skill' },
  { term: 'Ability Score', translation: '属性值', category: 'skill' },
  { term: 'Ability Modifier', translation: '属性调整值', category: 'skill' },
  { term: 'Proficiency Bonus', translation: '熟练加值', category: 'skill' },
  { term: 'Skill Check', translation: '技能检定', category: 'skill' },
  { term: 'Ability Check', translation: '属性检定', category: 'skill' },
  { term: 'Contest', translation: '对抗', category: 'skill' },
  { term: 'Skill', translation: '技能', category: 'skill' },
  { term: 'Proficiency', translation: '熟练', category: 'skill' },
  { term: 'Expertise', translation: '精通', category: 'skill' },
  { term: 'Tool Proficiency', translation: '工具熟练', category: 'skill' },

  // ---- 技能 Skills ----
  { term: 'Acrobatics', translation: '特技', category: 'skill' },
  { term: 'Animal Handling', translation: '驯兽', category: 'skill' },
  { term: 'Arcana', translation: '奥术', category: 'skill' },
  { term: 'Athletics', translation: '运动', category: 'skill' },
  { term: 'Deception', translation: '欺瞒', category: 'skill' },
  { term: 'History', translation: '历史', category: 'skill' },
  { term: 'Insight', translation: '洞悉', category: 'skill' },
  { term: 'Intimidation', translation: '威吓', category: 'skill' },
  { term: 'Investigation', translation: '调查', category: 'skill' },
  { term: 'Medicine', translation: '医药', category: 'skill' },
  { term: 'Nature', translation: '自然', category: 'skill' },
  { term: 'Perception', translation: '察觉', category: 'skill' },
  { term: 'Performance', translation: '表演', category: 'skill' },
  { term: 'Persuasion', translation: '游说', category: 'skill' },
  { term: 'Religion', translation: '宗教', category: 'skill' },
  { term: 'Sleight of Hand', translation: '巧手', category: 'skill' },
  { term: 'Stealth', translation: '隐匿', category: 'skill' },
  { term: 'Survival', translation: '生存', category: 'skill' },

  // ---- 物品 Items ----
  { term: 'Weapon', translation: '武器', category: 'item' },
  { term: 'Simple Weapon', translation: '简易武器', category: 'item' },
  { term: 'Martial Weapon', translation: '军用武器', category: 'item' },
  { term: 'Improvised Weapon', translation: '临时武器', category: 'item' },
  { term: 'Light Weapon', translation: '轻型武器', category: 'item' },
  { term: 'Heavy Weapon', translation: '重型武器', category: 'item' },
  { term: 'Finesse Weapon', translation: '灵巧武器', category: 'item' },
  { term: 'Reach Weapon', translation: '长武武器', category: 'item' },
  { term: 'Versatile Weapon', translation: '多用武器', category: 'item' },
  { term: 'Thrown Weapon', translation: '投掷武器', category: 'item' },
  { term: 'Two-Handed Weapon', translation: '双手武器', category: 'item' },
  { term: 'Ammunition', translation: '弹药', category: 'item' },
  { term: 'Loading', translation: '装填', category: 'item' },
  { term: 'Armor', translation: '护甲', category: 'item' },
  { term: 'Light Armor', translation: '轻甲', category: 'item' },
  { term: 'Medium Armor', translation: '中甲', category: 'item' },
  { term: 'Heavy Armor', translation: '重甲', category: 'item' },
  { term: 'Shield', translation: '盾牌', category: 'item' },
  { term: 'Potion', translation: '药水', category: 'item' },
  { term: 'Potion of Healing', translation: '治疗药水', category: 'item' },
  { term: 'Scroll', translation: '卷轴', category: 'item' },
  { term: 'Ring', translation: '戒指', category: 'item' },
  { term: 'Amulet', translation: '护符', category: 'item' },
  { term: 'Staff', translation: '法杖', category: 'item' },
  { term: 'Wand', translation: '魔杖', category: 'item' },
  { term: 'Magic Item', translation: '魔法物品', category: 'item' },
  { term: 'Common Item', translation: '普通物品', category: 'item' },
  { term: 'Uncommon Item', translation: '非普通物品', category: 'item' },
  { term: 'Rare Item', translation: '稀有物品', category: 'item' },
  { term: 'Very Rare Item', translation: '非常稀有物品', category: 'item' },
  { term: 'Legendary Item', translation: '传说物品', category: 'item' },
  { term: 'Attunement', translation: '同调', category: 'item' },
  { term: 'Adventuring Gear', translation: '冒险装备', category: 'item' },
  { term: 'Tool', translation: '工具', category: 'item' },
  { term: 'Musical Instrument', translation: '乐器', category: 'item' },
  { term: 'Poison', translation: '毒素', category: 'item' },
  { term: 'Potion of Invisibility', translation: '隐形药水', category: 'item' },
  { term: 'Bag of Holding', translation: '次元袋', category: 'item' },
  { term: 'Cloak of Invisibility', translation: '隐形斗篷', category: 'item' },
  { term: 'Boots of Elvenkind', translation: '精灵靴', category: 'item' },
  { term: 'Plate Armor', translation: '板甲', category: 'item' },
  { term: 'Chain Mail', translation: '链甲', category: 'item' },
  { term: 'Leather Armor', translation: '皮甲', category: 'item' },
  { term: 'Studded Leather', translation: '镶钉皮甲', category: 'item' },
  { term: 'Greatsword', translation: '巨剑', category: 'item' },
  { term: 'Longbow', translation: '长弓', category: 'item' },
  { term: 'Shortbow', translation: '短弓', category: 'item' },
  { term: 'Crossbow', translation: '十字弩', category: 'item' },
  { term: 'Dagger', translation: '匕首', category: 'item' },
  { term: 'Quarterstaff', translation: '木棍', category: 'item' },
  { term: 'Battleaxe', translation: '战斧', category: 'item' },

  // ---- 法术 Spells ----
  { term: 'Cantrip', translation: '戏法', category: 'spell' },
  { term: 'Spell Slot', translation: '法术位', category: 'spell' },
  { term: 'Spell Level', translation: '法术环阶', category: 'spell' },
  { term: 'Ritual', translation: '仪式', category: 'spell' },
  { term: 'Spellcasting', translation: '施法', category: 'spell' },
  { term: 'Spell Attack', translation: '法术攻击', category: 'spell' },
  { term: 'Spell Save DC', translation: '法术豁免DC', category: 'spell' },
  { term: 'Verbal Component', translation: '语言成分', category: 'spell' },
  { term: 'Somatic Component', translation: '姿势成分', category: 'spell' },
  { term: 'Material Component', translation: '材料成分', category: 'spell' },
  { term: 'Divine Magic', translation: '神圣魔法', category: 'spell' },
  { term: 'Arcane Magic', translation: '奥术魔法', category: 'spell' },
  { term: 'Natural Magic', translation: '自然魔法', category: 'spell' },
  { term: 'Evocation', translation: '塑能系', category: 'spell' },
  { term: 'Abjuration', translation: '防护系', category: 'spell' },
  { term: 'Divination', translation: '预言系', category: 'spell' },
  { term: 'Enchantment', translation: '附魔系', category: 'spell' },
  { term: 'Illusion', translation: '幻术系', category: 'spell' },
  { term: 'Necromancy', translation: '死灵系', category: 'spell' },
  { term: 'Transmutation', translation: '变化系', category: 'spell' },
  { term: 'Conjuration', translation: '咒法系', category: 'spell' },
  { term: 'AOE (Area of Effect)', translation: '范围效果', category: 'spell' },
  { term: 'Cone', translation: '锥状', category: 'spell' },
  { term: 'Sphere', translation: '球状', category: 'spell' },
  { term: 'Cube', translation: '立方体', category: 'spell' },
  { term: 'Line', translation: '线状', category: 'spell' },
  { term: 'Cylinder', translation: '柱状', category: 'spell' },
  { term: 'Range', translation: '距离', category: 'spell' },
  { term: 'Duration', translation: '持续时间', category: 'spell' },
  { term: 'Component', translation: '成分', category: 'spell' },
  { term: 'Self', translation: '自身', category: 'spell' },
  { term: 'Touch', translation: '触碰', category: 'spell' },
  { term: 'Area', translation: '区域', category: 'spell' },
  { term: 'Dispel Magic', translation: '解除魔法', category: 'spell' },
  { term: 'Counterspell', translation: '反制法术', category: 'spell' },
  { term: 'Magic Missile', translation: '魔法飞弹', category: 'spell' },
  { term: 'Fireball', translation: '火球术', category: 'spell' },
  { term: 'Lightning Bolt', translation: '闪电束', category: 'spell' },
  { term: 'Cure Wounds', translation: '治愈伤势', category: 'spell' },
  { term: 'Bless', translation: '祝福术', category: 'spell' },
  { term: 'Shield', translation: '护盾术', category: 'spell' },

  // ---- 规则 Rules ----
  { term: 'Advantage', translation: '优势', category: 'rule' },
  { term: 'Disadvantage', translation: '劣势', category: 'rule' },
  { term: 'Inspiration', translation: '激励', category: 'rule' },
  { term: 'Experience Points (XP)', translation: '经验值 (XP)', category: 'rule' },
  { term: 'Level', translation: '等级', category: 'rule' },
  { term: 'Character Level', translation: '角色等级', category: 'rule' },
  { term: 'Challenge Rating (CR)', translation: '挑战等级 (CR)', category: 'rule' },
  { term: 'Player Character (PC)', translation: '玩家角色 (PC)', category: 'rule' },
  { term: 'Non-Player Character (NPC)', translation: '非玩家角色 (NPC)', category: 'rule' },
  { term: 'Dungeon Master (DM)', translation: '地下城主 (DM)', category: 'rule' },
  { term: 'Game Master (GM)', translation: '主持人 (GM)', category: 'rule' },
  { term: 'Alignment', translation: '阵营', category: 'rule' },
  { term: 'Lawful Good', translation: '守序善良', category: 'rule' },
  { term: 'Neutral Good', translation: '中立善良', category: 'rule' },
  { term: 'Chaotic Good', translation: '混乱善良', category: 'rule' },
  { term: 'Lawful Neutral', translation: '守序中立', category: 'rule' },
  { term: 'True Neutral', translation: '绝对中立', category: 'rule' },
  { term: 'Chaotic Neutral', translation: '混乱中立', category: 'rule' },
  { term: 'Lawful Evil', translation: '守序邪恶', category: 'rule' },
  { term: 'Neutral Evil', translation: '中立邪恶', category: 'rule' },
  { term: 'Chaotic Evil', translation: '混乱邪恶', category: 'rule' },
  { term: 'Background', translation: '背景', category: 'rule' },
  { term: 'Backstory', translation: '背景故事', category: 'rule' },
  { term: 'Feat', translation: '专长', category: 'rule' },
  { term: 'Multiattack', translation: '多重攻击', category: 'rule' },
  { term: 'Legendary Action', translation: '传奇动作', category: 'rule' },
  { term: 'Lair Action', translation: '巢穴动作', category: 'rule' },
  { term: 'Mythic Action', translation: '神话动作', category: 'rule' },
  { term: 'Lair', translation: '巢穴', category: 'rule' },
  { term: 'Condition', translation: '状态', category: 'rule' },
  { term: 'Blinded', translation: '致盲', category: 'rule' },
  { term: 'Charmed', translation: '魅惑', category: 'rule' },
  { term: 'Deafened', translation: '耳聋', category: 'rule' },
  { term: 'Exhaustion', translation: '力竭', category: 'rule' },
  { term: 'Frightened', translation: '恐惧', category: 'rule' },
  { term: 'Grappled', translation: '被擒抱', category: 'rule' },
  { term: 'Incapacitated', translation: '失能', category: 'rule' },
  { term: 'Invisible', translation: '隐形', category: 'rule' },
  { term: 'Paralyzed', translation: '麻痹', category: 'rule' },
  { term: 'Petrified', translation: '石化', category: 'rule' },
  { term: 'Poisoned', translation: '中毒', category: 'rule' },
  { term: 'Prone', translation: '俯卧', category: 'rule' },
  { term: 'Restrained', translation: '束缚', category: 'rule' },
  { term: 'Stunned', translation: '震慑', category: 'rule' },
  { term: 'Unconscious', translation: '昏迷', category: 'rule' },
  { term: 'Darkvision', translation: '黑暗视觉', category: 'rule' },
  { term: 'Blindsight', translation: '盲视', category: 'rule' },
  { term: 'Tremorsense', translation: '震颤感知', category: 'rule' },
  { term: 'Truesight', translation: '真实视觉', category: 'rule' },
  { term: 'Resistance', translation: '抗力', category: 'rule' },
  { term: 'Immunity', translation: '免疫', category: 'rule' },
  { term: 'Vulnerability', translation: '易伤', category: 'rule' },

  // ---- 职业 Classes ----
  { term: 'Barbarian', translation: '野蛮人', category: 'class' },
  { term: 'Bard', translation: '吟游诗人', category: 'class' },
  { term: 'Cleric', translation: '牧师', category: 'class' },
  { term: 'Druid', translation: '德鲁伊', category: 'class' },
  { term: 'Fighter', translation: '战士', category: 'class' },
  { term: 'Monk', translation: '武僧', category: 'class' },
  { term: 'Paladin', translation: '圣武士', category: 'class' },
  { term: 'Ranger', translation: '游侠', category: 'class' },
  { term: 'Rogue', translation: '游荡者', category: 'class' },
  { term: 'Sorcerer', translation: '术士', category: 'class' },
  { term: 'Warlock', translation: '邪术师', category: 'class' },
  { term: 'Wizard', translation: '法师', category: 'class' },
  { term: 'Artificer', translation: '工匠', category: 'class' },
  { term: 'Blood Hunter', translation: '血猎者', category: 'class' },
  { term: 'Subclass', translation: '子职', category: 'class' },
  { term: 'Archetype', translation: '范型', category: 'class' },
  { term: 'Cantrip Known', translation: '已知戏法', category: 'class' },
  { term: 'Spell Known', translation: '已知法术', category: 'class' },
  { term: 'Spell Prepared', translation: '准备法术', category: 'class' },
  { term: 'Spellbook', translation: '法术书', category: 'class' },

  // ---- 种族 Races ----
  { term: 'Human', translation: '人类', category: 'race' },
  { term: 'Elf', translation: '精灵', category: 'race' },
  { term: 'Dwarf', translation: '矮人', category: 'race' },
  { term: 'Halfling', translation: '半身人', category: 'race' },
  { term: 'Gnome', translation: '侏儒', category: 'race' },
  { term: 'Half-Elf', translation: '半精灵', category: 'race' },
  { term: 'Half-Orc', translation: '半兽人', category: 'race' },
  { term: 'Tiefling', translation: '提夫林', category: 'race' },
  { term: 'Dragonborn', translation: '龙裔', category: 'race' },
  { term: 'Orc', translation: '兽人', category: 'race' },
  { term: 'Goblin', translation: '地精', category: 'race' },
  { term: 'Hobgoblin', translation: '熊地精', category: 'race' },
  { term: 'Bugbear', translation: '大地精', category: 'race' },
  { term: 'Kobold', translation: '狗头人', category: 'race' },
  { term: 'Lizardfolk', translation: '蜥蜴人', category: 'race' },
  { term: 'Tabaxi', translation: '猫人', category: 'race' },
  { term: 'Aarakocra', translation: '鸟人', category: 'race' },
  { term: 'Tortle', translation: '龟人', category: 'race' },
  { term: 'Goliath', translation: '歌利亚', category: 'race' },
  { term: 'Aasimar', translation: '阿斯莫', category: 'race' },
  { term: 'Firbolg', translation: '弗尔伯格', category: 'race' },
  { term: 'Kenku', translation: '鸦人', category: 'race' },
  { term: 'Warforged', translation: '战俑', category: 'race' },
  { term: 'Centaur', translation: '半人马', category: 'race' },
  { term: 'Satyr', translation: '萨特', category: 'race' },
  { term: 'Changeling', translation: '换身灵', category: 'race' },
  { term: 'Shifter', translation: '移形灵', category: 'race' },
  { term: 'Kalashtar', translation: '卡拉什塔', category: 'race' },
  { term: 'Simic Hybrid', translation: '析米克混种', category: 'race' },
  { term: 'Vedalken', translation: '维多肯', category: 'race' },
  { term: 'Triton', translation: '特里同', category: 'race' },
  { term: 'Genasi', translation: '元素裔', category: 'race' },
  { term: 'Githyanki', translation: '吉斯洋基', category: 'race' },
  { term: 'Githzerai', translation: '吉斯泽莱', category: 'race' },
  { term: 'Minotaur', translation: '牛头人', category: 'race' },
  { term: 'Yuan-ti Pureblood', translation: '蛇人', category: 'race' },

  // ---- 怪物 Monster ----
  { term: 'Goblin', translation: '地精', category: 'combat' },
  { term: 'Owlbear', translation: '枭熊', category: 'combat' },
  { term: 'Dragon', translation: '龙', category: 'combat' },
  { term: 'Giant', translation: '巨人', category: 'combat' },
  { term: 'Troll', translation: '巨魔', category: 'combat' },
  { term: 'Griffon', translation: '狮鹫', category: 'combat' },
  { term: 'Basilisk', translation: '石化蜥蜴', category: 'combat' },
  { term: 'Chimera', translation: '奇美拉', category: 'combat' },
  { term: 'Beholder', translation: '眼魔', category: 'combat' },
  { term: 'Mind Flayer', translation: '夺心魔', category: 'combat' },
  { term: 'Lich', translation: '巫妖', category: 'combat' },
  { term: 'Vampire', translation: '吸血鬼', category: 'combat' },
  { term: 'Werewolf', translation: '狼人', category: 'combat' },
  { term: 'Zombie', translation: '丧尸', category: 'combat' },
  { term: 'Skeleton', translation: '骷髅', category: 'combat' },
  { term: 'Slime', translation: '史莱姆', category: 'combat' },
  { term: 'Golem', translation: '魔像', category: 'combat' },
  { term: 'Elemental', translation: '元素生物', category: 'combat' },
  { term: 'Demon', translation: '恶魔', category: 'combat' },
  { term: 'Devil', translation: '魔鬼', category: 'combat' },
  { term: 'Angel', translation: '天使', category: 'combat' },
  { term: 'Hydra', translation: '九头蛇', category: 'combat' },
  { term: 'Manticore', translation: '蝎尾狮', category: 'combat' },
  { term: 'Minotaur', translation: '牛头人', category: 'combat' },
  { term: 'Rat Swarm', translation: '鼠群', category: 'combat' },
  { term: 'Spider', translation: '蜘蛛', category: 'combat' },
  { term: 'Wolf', translation: '狼', category: 'combat' },

  // ---- 通用 General ----
  { term: 'Level Up', translation: '升级', category: 'rule' },
  { term: 'Encounter', translation: '遭遇', category: 'rule' },
  { term: 'Quest', translation: '任务', category: 'rule' },
  { term: 'Loot', translation: '战利品', category: 'rule' },
  { term: 'Treasure', translation: '宝藏', category: 'rule' },
  { term: 'Campaign', translation: '战役', category: 'rule' },
  { term: 'Session', translation: '团务', category: 'rule' },
  { term: 'One-shot', translation: '短团', category: 'rule' },
  { term: 'Homebrew', translation: '房规', category: 'rule' },
  { term: 'House Rule', translation: '房规', category: 'rule' },
  { term: 'Roll', translation: '掷骰', category: 'rule' },
  { term: 'Roll20', translation: '掷骰20', category: 'rule' },
  { term: 'Nat 20', translation: '天然20', category: 'rule' },
  { term: 'Nat 1', translation: '天然1', category: 'rule' },
  { term: 'Modifier', translation: '调整值', category: 'rule' },
  { term: 'DC (Difficulty Class)', translation: '难度等级 (DC)', category: 'rule' },
  { term: 'Token', translation: '棋子', category: 'rule' },
  { term: 'Map', translation: '地图', category: 'rule' },
  { term: 'Grid', translation: '网格', category: 'rule' },
  { term: 'Fog of War', translation: '战争迷雾', category: 'rule' },
  { term: 'Vision', translation: '视野', category: 'rule' },
  { term: 'Light Source', translation: '光源', category: 'rule' },
  { term: 'Aura', translation: '灵光', category: 'rule' },
  { term: 'Buff', translation: '增益', category: 'rule' },
  { term: 'Debuff', translation: '减益', category: 'rule' },
  { term: 'AOE', translation: '范围效果', category: 'rule' },
  { term: 'DoT (Damage over Time)', translation: '持续伤害', category: 'rule' },
  { term: 'HoT (Heal over Time)', translation: '持续治疗', category: 'rule' },
  { term: 'CC (Crowd Control)', translation: '群体控制', category: 'rule' },
  { term: 'Pet', translation: '宠物', category: 'rule' },
  { term: 'Summon', translation: '召唤', category: 'rule' },
  { term: 'Familiar', translation: '魔宠', category: 'rule' },
  { term: 'Steed', translation: '坐骑', category: 'rule' },
];

// ============ 应用逻辑 ============

let currentCategory = 'all';
let searchQuery = '';

function getFilteredEntries() {
  return DICTIONARY.filter(entry => {
    // Category filter
    if (currentCategory !== 'all' && entry.category !== currentCategory) return false;
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.translation.includes(searchQuery) ||
        (entry.original && entry.original.toLowerCase().includes(q))
      );
    }
    return true;
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);
  return `${before}<mark>${match}</mark>${after}`;
}

function renderEntries() {
  const container = document.getElementById('dictList');
  const filtered = getFilteredEntries();
  const statsEl = document.getElementById('entryCount');

  statsEl.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <p>没有匹配的词条</p>
      </div>
    `;
    return;
  }

  const showOriginal = document.getElementById('showOriginal').checked;
  const scrollTop = container.scrollTop;
  const savedHeight = container.scrollHeight;

  container.innerHTML = filtered.map(entry => {
    const termHtml = highlightMatch(entry.term, searchQuery);
    const transHtml = highlightMatch(entry.translation, searchQuery);

    return `
      <div class="dict-entry" data-term="${entry.term.toLowerCase()}">
        <div class="term">${termHtml}</div>
        <div class="translation">${transHtml}</div>
        ${entry.original && showOriginal ? `<div class="original">原文：${entry.original}</div>` : ''}
        <span class="category ${entry.category}">${getCategoryLabel(entry.category)}</span>
      </div>
    `;
  }).join('');

  // Preserve scroll position
  container.scrollTop = scrollTop;
}

function getCategoryLabel(cat) {
  const labels = {
    combat: '战斗',
    skill: '技能',
    item: '物品',
    spell: '法术',
    rule: '规则',
    class: '职业',
    race: '种族'
  };
  return labels[cat] || cat;
}

// ============ UI 事件绑定 ============

function initUI() {
  // Search
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    renderEntries();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    renderEntries();
    searchInput.focus();
  });

  // Category tags
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      currentCategory = tag.dataset.cat;
      renderEntries();
    });
  });

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel${capitalize(tab.dataset.tab)}`).classList.add('active');
    });
  });

  // Settings
  document.getElementById('showOriginal').addEventListener('change', renderEntries);

  // Stats
  document.getElementById('totalEntries').textContent = DICTIONARY.length;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============ Toast 提示 ============

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============ OBR 初始化 ============

function initOBR() {
  if (typeof OBR === 'undefined') {
    console.warn('[枭雄汉化] OBR SDK 未加载，以独立模式运行');
    document.querySelector('.header').style.borderBottom = '1px solid #e8b84b';
    return;
  }

  OBR.onReady(() => {
    console.log('[枭雄汉化] 插件已就绪');

    // Set popover size
    if (OBR.popover) {
      OBR.popover.setHeight(650);
      OBR.popover.setWidth(420);
    }

    // Optional: listen for item selection to provide translations
    if (OBR.player && OBR.player.onChange) {
      OBR.player.onChange(() => {
        // Could update UI based on player state
      });
    }

    showToast('枭雄汉化插件已加载');
  });
}

// ============ 启动 ============

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initOBR();
  renderEntries();
});
