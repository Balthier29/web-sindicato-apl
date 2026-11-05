// Convierte '2026-11-05' en '5 nov 2026' (formato chileno)
export function formatDate(valor) {
  if (!valor) return ''
  const fecha = new Date(valor.length === 10 ? valor + 'T00:00:00' : valor)
  return fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/\./g, '')
}
