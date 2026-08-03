/**
 * ============================================================================
 *  PORTFOLIO CONTENT
 * ============================================================================
 *  All human-readable TEXT lives in `content.json` — edit that file to change
 *  anything on the site (no code required). This module simply loads that JSON
 *  and attaches the React icon components that JSON cannot hold.
 * ============================================================================
 */

import content from './content.json'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'

// Map the string icon keys used in content.json to real icon components.
const SOCIAL_ICONS = {
    linkedin: FiLinkedin,
    github: FiGithub,
    medium: SiMedium,
}

const CHANNEL_ICONS = {
    mail: FiMail,
    phone: FiPhone,
}

export const personal = content.personal
export const navLinks = content.navLinks
export const about = content.about
export const skills = content.skills
export const experience = content.experience
export const projects = content.projects
export const education = content.education
export const achievements = content.achievements
export const process = content.process
export const pricing = content.pricing
export const blog = content.blog

export const socials = content.socials.map((s) => ({
    ...s,
    icon: SOCIAL_ICONS[s.icon],
}))

export const contact = {
    ...content.contact,
    channels: content.contact.channels.map((c) => ({
        ...c,
        icon: CHANNEL_ICONS[c.icon],
    })),
}
