<script setup>
import { reactive, watch } from 'vue'
import { useCrudList } from '@/composables/useCrudList'
import { statsAdmin } from '@/services/crud'

const { items, cargando, guardando, error, aviso, ejecutar } = useCrudList(statsAdmin)

// Copia editable de las cifras
const edicion = reactive({})
watch(items, (lista) => {
  lista.forEach((s) => (edicion[s.clave] = { valor: s.valor, etiqueta: s.etiqueta }))
}, { immediate: true })

const guardar = () =>
  ejecutar(async () => {
    for (const s of items.value) {
      const { valor, etiqueta } = edicion[s.clave]
      await statsAdmin.actualizar(s.clave, { valor: valor.trim(), etiqueta: etiqueta.trim() })
    }
  }, 'Cifras actualizadas. Ya se ven en la portada.')
</script>

<template>
  <div>
    <header class="dash__encabezado">
      <h1>Estadísticas</h1>
    </header>

    <p v-if="aviso" class="dash__aviso" role="status">{{ aviso }}</p>
    <p v-if="error" class="dash__error" role="alert">{{ error }}</p>

    <form class="dash__card" @submit.prevent="guardar">
      <p class="dash__nota">Son las tres cifras de la franja azul de la portada.</p>
      <p v-if="cargando">Cargando…</p>
      <template v-else>
        <div v-for="s in items" :key="s.clave" class="dash__fila">
          <div class="dash__campo">
            <label :for="`v-${s.clave}`">Cifra</label>
            <input :id="`v-${s.clave}`" v-model="edicion[s.clave].valor" maxlength="12" required />
          </div>
          <div class="dash__campo">
            <label :for="`l-${s.clave}`">Texto</label>
            <input :id="`l-${s.clave}`" v-model="edicion[s.clave].etiqueta" maxlength="40" required />
          </div>
        </div>
        <div class="dash__acciones">
          <button class="btn btn--primario" :disabled="guardando">{{ guardando ? 'Guardando…' : 'Guardar cifras' }}</button>
        </div>
      </template>
    </form>
  </div>
</template>
