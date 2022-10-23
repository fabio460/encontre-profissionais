export const colorsLayout = '#1976d2'
export const backgoundAppBar = 'white'
export const colorTextAbbBar = 'white'
export const colorBackGround = 'rgba(0, 0, 0, 0.05)'

//api 
export const apiBase = 'https://api-site-relacionamentos.vercel.app/'
export const getUsuarios =apiBase + 'getusuarios'


export function initialsAvatar(name) {
    let aux = name.split('')
    return aux[0].toUpperCase()
}

export function ramdomColors() {
    let color = ['#1976d2','#9c27b0','#d32f2f','#ed6c02','#2e7d32','#91ff35','#ffea00']
    return color[Math.ceil(Math.random()*color.length-1)]
}