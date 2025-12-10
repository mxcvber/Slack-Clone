import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Control } from 'react-hook-form'

interface FormInputProps {
  control: Control<any>
  name: string
  placeholder: string
  disabled: boolean
  type?: string
}

const FormInput: React.FC<FormInputProps> = ({ control, name, placeholder, disabled, type = 'text' }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input disabled={disabled} placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
