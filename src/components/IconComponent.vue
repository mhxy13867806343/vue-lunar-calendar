<template>
  <span 
    :class="[
      'icon',
      `icon-${name}`,
      {
        'is-clickable': clickable
      }
    ]"
    :style="{ fontSize: size, color: color }"
    @click="handleClick"
    :aria-label="ariaLabel"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <component :is="iconComponent" v-if="iconComponent" />
    <span v-else>{{ getIconText(name) }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: string
  color?: string
  clickable?: boolean
  ariaLabel?: string
}

interface Emits {
  click: []
}

const props = withDefaults(defineProps<Props>(), {
  size: '16px',
  color: 'currentColor',
  clickable: false
})

const emit = defineEmits<Emits>()

const iconComponent = computed(() => {
  // 这里可以扩展支持其他图标库
  return null
})

const getIconText = (name: string): string => {
  const iconMap: Record<string, string> = {
    // 导航图标
    'chevron-left': '‹',
    'chevron-right': '›',
    'chevron-up': '‹',
    'chevron-down': '›',
    'arrow-left': '←',
    'arrow-right': '→',
    
    // 功能图标
    'calendar': '📅',
    'today': '📍',
    'event': '📝',
    'reminder': '🔔',
    'holiday': '🎉',
    'custom': '⭐',
    'recurring': '🔄',
    'notification': '🔔',
    'settings': '⚙️',
    'theme': '🎨',
    'language': '🌐',
    
    // 状态图标
    'check': '✓',
    'close': '✕',
    'add': '+',
    'edit': '✏️',
    'delete': '🗑️',
    'search': '🔍',
    'filter': '🔽',
    'sort': '↕️',
    
    // 生肖图标
    'rat': '🐭',
    'ox': '🐮',
    'tiger': '🐯',
    'rabbit': '🐰',
    'dragon': '🐲',
    'snake': '🐍',
    'horse': '🐴',
    'goat': '🐐',
    'monkey': '🐵',
    'rooster': '🐔',
    'dog': '🐶',
    'pig': '🐷',
    
    // 天干地支
    'jia': '甲',
    'yi': '乙',
    'bing': '丙',
    'ding': '丁',
    'wu': '戊',
    'ji': '己',
    'geng': '庚',
    'xin': '辛',
    'ren': '壬',
    'gui': '癸',
    
    'zi': '子',
    'chou': '丑',
    'yin': '寅',
    'mao': '卯',
    'chen': '辰',
    'si': '巳',
    'wu-branch': '午',
    'wei': '未',
    'shen': '申',
    'you': '酉',
    'xu': '戌',
    'hai': '亥',
    
    // 节气
    'spring': '🌱',
    'summer': '☀️',
    'autumn': '🍂',
    'winter': '❄️',
    
    // 月相
    'new-moon': '🌑',
    'waxing-crescent': '🌒',
    'first-quarter': '🌓',
    'waxing-gibbous': '🌔',
    'full-moon': '🌕',
    'waning-gibbous': '🌖',
    'last-quarter': '🌗',
    'waning-crescent': '🌘'
  }
  
  return iconMap[name] || '?'
}

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.2s ease;
}

.is-clickable {
  cursor: pointer;
}

.is-clickable:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.is-clickable:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 2px;
}

.is-clickable:active {
  transform: scale(0.95);
}

/* 特定图标样式 */
.icon-chevron-left,
.icon-chevron-right {
  font-weight: bold;
  font-size: 1.2em;
}

.icon-today {
  color: var(--primary-color);
}

.icon-holiday {
  color: #4caf50;
}

.icon-event {
  color: #2196f3;
}

.icon-reminder {
  color: #ff9800;
}

.icon-custom {
  color: #9c27b0;
}
</style>