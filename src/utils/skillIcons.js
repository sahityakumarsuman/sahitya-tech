/**
 * ============================================================================
 *  SKILL ICONS — maps each skill name to a brand icon (+ optional brand color)
 * ============================================================================
 *  Add a new skill to `portfolio.js` and, if you want a matching logo, add an
 *  entry here keyed by the EXACT skill string. Missing entries fall back to a
 *  neutral icon that adapts to the light/dark theme.
 * ============================================================================
 */

import {
    SiKotlin,
    SiJavascript,
    SiTypescript,
    SiPython,
    SiSolidity,
    SiJetpackcompose,
    SiAndroid,
    SiNodedotjs,
    SiExpress,
    SiApachekafka,
    SiRedis,
    SiSocketdotio,
    SiMongodb,
    SiPostgresql,
    SiClickhouse,
    SiEthereum,
    SiSolana,
    SiNextdotjs,
    SiReact,
    SiVuedotjs,
    SiGooglecloud,
    SiDocker,
    SiKubernetes,
    SiFirebase,
    SiPrometheus,
    SiGrafana,
    SiSentry,
    SiNewrelic,
    SiK6,
    SiSqlite,
    SiC,
    SiGit,
    SiJira,
    SiHelm,
} from 'react-icons/si'
import { FaJava, FaAws, FaMicrosoft } from 'react-icons/fa'
import { FiBox, FiDatabase } from 'react-icons/fi'

// Neutral fallback used when a skill has no dedicated logo.
const FALLBACK = { icon: FiBox }

// Brand colors are only set where they read well on BOTH light and dark
// backgrounds. Black/white brand marks (Next.js, Express, Kafka, etc.) are
// left uncolored so they inherit the theme's text color.
const ICONS = {
    // Languages
    Kotlin: { icon: SiKotlin, color: '#7F52FF' },
    Java: { icon: FaJava, color: '#E76F00' },
    JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
    TypeScript: { icon: SiTypescript, color: '#3178C6' },
    Python: { icon: SiPython, color: '#3776AB' },
    C: { icon: SiC, color: '#A8B9CC' },
    SQL: { icon: FiDatabase },
    Solidity: { icon: SiSolidity },

    // Android
    'Jetpack Compose': { icon: SiJetpackcompose, color: '#4285F4' },
    'Android SDK': { icon: SiAndroid, color: '#3DDC84' },
    Coroutines: { icon: SiKotlin, color: '#7F52FF' },
    Room: { icon: SiSqlite, color: '#4F9EDB' },
    MVVM: FALLBACK,

    // Backend & Real-time
    'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
    Express: { icon: SiExpress },
    Kafka: { icon: SiApachekafka },
    Redis: { icon: SiRedis, color: '#FF4438' },
    WebSocket: { icon: SiSocketdotio },
    BullMQ: { icon: SiRedis, color: '#FF4438' },
    Memcached: FALLBACK,

    // Databases
    MongoDB: { icon: SiMongodb, color: '#47A248' },
    PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
    ClickHouse: { icon: SiClickhouse, color: '#FFCC01' },

    // Web3 & Blockchain
    Ethereum: { icon: SiEthereum, color: '#627EEA' },
    Solana: { icon: SiSolana, color: '#9945FF' },
    Tron: { icon: FiBox, color: '#EF0027' },
    'ERC-721': { icon: SiEthereum, color: '#627EEA' },
    'ERC-1155': { icon: SiEthereum, color: '#627EEA' },

    // Frontend
    'Next.js': { icon: SiNextdotjs },
    'React.js': { icon: SiReact, color: '#61DAFB' },
    'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },

    // Cloud & DevOps
    AWS: { icon: FaAws, color: '#FF9900' },
    GCP: { icon: SiGooglecloud, color: '#4285F4' },
    Azure: { icon: FaMicrosoft, color: '#0089D6' },
    Docker: { icon: SiDocker, color: '#2496ED' },
    Kubernetes: { icon: SiKubernetes, color: '#326CE5' },
    Firebase: { icon: SiFirebase, color: '#FFCA28' },
    Helm: { icon: SiHelm, color: '#0F1689' },

    // Observability
    Prometheus: { icon: SiPrometheus, color: '#E6522C' },
    Grafana: { icon: SiGrafana, color: '#F46800' },
    'New Relic': { icon: SiNewrelic, color: '#00AC69' },
    Sentry: { icon: SiSentry, color: '#A78BFA' },
    Coralogix: FALLBACK,
    K6: { icon: SiK6, color: '#7D64FF' },
    Git: { icon: SiGit, color: '#F05032' },
    Jira: { icon: SiJira, color: '#0052CC' },
}

export function getSkillIcon(name) {
    return ICONS[name] || FALLBACK
}
