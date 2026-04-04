import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TemplateId, TemplateConfig } from '../config/templates'
import { templates, getTemplate } from '../config/templates'

interface TemplateState {
  currentTemplate: TemplateId
  templateConfig: TemplateConfig
  setTemplate: (id: TemplateId) => void
  getTemplateList: () => TemplateConfig[]
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      currentTemplate: 'landing',
      templateConfig: getTemplate('landing')!,
      
      setTemplate: (id: TemplateId) => {
        const config = getTemplate(id)
        if (config) {
          set({ 
            currentTemplate: id,
            templateConfig: config 
          })
        }
      },
      
      getTemplateList: () => templates
    }),
    {
      name: 'template-storage',
      partialize: (state) => ({ 
        currentTemplate: state.currentTemplate 
      })
    }
  )
)
